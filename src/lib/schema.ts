import { pgTable, serial, varchar, text, bigint, decimal, timestamp, pgEnum, integer, boolean, jsonb, index, uniqueIndex } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const userRoleEnum = pgEnum('user_role', ['admin', 'client', 'freelancer']);
export const projectStatusEnum = pgEnum('project_status', ['open', 'in_progress', 'completed', 'closed']);
export const bidStatusEnum = pgEnum('bid_status', ['pending', 'accepted', 'rejected', 'withdrawn']);
export const paymentStatusEnum = pgEnum('payment_status', ['initiated', 'paid', 'failed', 'refunded', 'cancelled']);

// Tables
export const roles = pgTable('roles', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull().unique(),
  label: varchar('label', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }),
  name: varchar('name', { length: 150 }).notNull(),
  roleId: integer('role_id').notNull().default(2).references(() => roles.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
  bio: text('bio'),
  avatarUrl: varchar('avatar_url', { length: 512 }),
  location: varchar('location', { length: 150 }),
  rating: decimal('rating', { precision: 3, scale: 2 }).default('0.00'),
  isVerified: boolean('is_verified').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  deletedAt: timestamp('deleted_at'),
}, (table) => ({
  emailIdx: index('idx_users_email').on(table.email),
  nameIdx: index('idx_users_name').on(table.name),
}));

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 120 }).notNull().unique(),
  slug: varchar('slug', { length: 150 }).notNull().unique(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const skills = pgTable('skills', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 120 }).notNull().unique(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  clientId: integer('client_id').notNull().references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  description: text('description').notNull(),
  budget: bigint('budget', { mode: 'number' }).notNull(),
  categoryId: integer('category_id').references(() => categories.id, { onDelete: 'set null', onUpdate: 'cascade' }),
  status: projectStatusEnum('status').default('open'),
  deadline: timestamp('deadline', { mode: 'date' }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  deletedAt: timestamp('deleted_at'),
}, (table) => ({
  clientIdx: index('idx_projects_client').on(table.clientId),
  statusIdx: index('idx_projects_status').on(table.status),
  titleDescriptionIdx: index('ft_projects_title_description').on(table.title, table.description),
}));

export const projectSkills = pgTable('project_skills', {
  projectId: integer('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  skillId: integer('skill_id').notNull().references(() => skills.id, { onDelete: 'cascade' }),
}, (table) => ({
  pk: uniqueIndex('project_skills_pkey').on(table.projectId, table.skillId),
}));

export const userSkills = pgTable('user_skills', {
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  skillId: integer('skill_id').notNull().references(() => skills.id, { onDelete: 'cascade' }),
  level: varchar('level', { length: 50 }),
}, (table) => ({
  pk: uniqueIndex('user_skills_pkey').on(table.userId, table.skillId),
}));

export const bids = pgTable('bids', {
  id: serial('id').primaryKey(),
  projectId: integer('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  freelancerId: integer('freelancer_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  amount: bigint('amount', { mode: 'number' }).notNull(),
  proposal: text('proposal').notNull(),
  status: bidStatusEnum('status').default('pending'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  projectIdx: index('idx_bids_project').on(table.projectId),
  freelancerIdx: index('idx_bids_freelancer').on(table.freelancerId),
  proposalIdx: index('ft_bids_proposal').on(table.proposal),
}));

export const reviews = pgTable('reviews', {
  id: serial('id').primaryKey(),
  projectId: integer('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  reviewerId: integer('reviewer_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  revieweeId: integer('reviewee_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  rating: integer('rating').notNull(),
  comment: text('comment'),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  revieweeIdx: index('idx_reviews_reviewee').on(table.revieweeId),
}));

export const forumCategories = pgTable('forum_categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 150 }).notNull(),
  slug: varchar('slug', { length: 180 }).notNull().unique(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const forumThreads = pgTable('forum_threads', {
  id: serial('id').primaryKey(),
  categoryId: integer('category_id').references(() => forumCategories.id, { onDelete: 'set null' }),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  views: integer('views').default(0),
  isPinned: boolean('is_pinned').default(false),
  isLocked: boolean('is_locked').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  titleContentIdx: index('ft_forum_threads_title_content').on(table.title, table.content),
}));

export const forumReplies = pgTable('forum_replies', {
  id: serial('id').primaryKey(),
  threadId: integer('thread_id').notNull().references(() => forumThreads.id, { onDelete: 'cascade' }),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  content: text('content').notNull(),
  parentReplyId: integer('parent_reply_id').references(() => forumReplies.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const attachments = pgTable('attachments', {
  id: serial('id').primaryKey(),
  ownerType: varchar('owner_type', { length: 50 }).notNull(),
  ownerId: integer('owner_id').notNull(),
  filename: varchar('filename', { length: 255 }).notNull(),
  url: varchar('url', { length: 1024 }).notNull(),
  size: bigint('size', { mode: 'number' }).default(0),
  contentType: varchar('content_type', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  ownerIdx: index('idx_attachments_owner').on(table.ownerType, table.ownerId),
}));

export const payments = pgTable('payments', {
  id: serial('id').primaryKey(),
  projectId: integer('project_id').references(() => projects.id, { onDelete: 'set null' }),
  payerId: integer('payer_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  payeeId: integer('payee_id').references(() => users.id, { onDelete: 'set null' }),
  amount: bigint('amount', { mode: 'number' }).notNull(),
  currency: varchar('currency', { length: 10 }).default('IDR'),
  provider: varchar('provider', { length: 100 }),
  providerReference: varchar('provider_reference', { length: 255 }),
  status: paymentStatusEnum('status').default('initiated'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  statusIdx: index('idx_payments_status').on(table.status),
}));

export const notifications = pgTable('notifications', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: varchar('type', { length: 100 }).notNull(),
  data: jsonb('data'),
  isRead: boolean('is_read').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

export const sessions = pgTable('sessions', {
  id: varchar('id', { length: 128 }).primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  data: jsonb('data'),
  expiresAt: timestamp('expires_at'),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const tags = pgTable('tags', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 120 }).notNull().unique(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const projectTags = pgTable('project_tags', {
  projectId: integer('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  tagId: integer('tag_id').notNull().references(() => tags.id, { onDelete: 'cascade' }),
}, (table) => ({
  pk: uniqueIndex('project_tags_pkey').on(table.projectId, table.tagId),
}));

// Relations
export const usersRelations = relations(users, ({ one, many }) => ({
  role: one(roles, {
    fields: [users.roleId],
    references: [roles.id],
  }),
  projects: many(projects),
  bids: many(bids),
  reviewsGiven: many(reviews, { relationName: 'reviewer' }),
  reviewsReceived: many(reviews, { relationName: 'reviewee' }),
  forumThreads: many(forumThreads),
  forumReplies: many(forumReplies),
  notifications: many(notifications),
  sessions: many(sessions),
  userSkills: many(userSkills),
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
  client: one(users, {
    fields: [projects.clientId],
    references: [users.id],
  }),
  category: one(categories, {
    fields: [projects.categoryId],
    references: [categories.id],
  }),
  bids: many(bids),
  reviews: many(reviews),
  projectSkills: many(projectSkills),
  projectTags: many(projectTags),
}));

export const bidsRelations = relations(bids, ({ one }) => ({
  project: one(projects, {
    fields: [bids.projectId],
    references: [projects.id],
  }),
  freelancer: one(users, {
    fields: [bids.freelancerId],
    references: [users.id],
  }),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  project: one(projects, {
    fields: [reviews.projectId],
    references: [projects.id],
  }),
  reviewer: one(users, {
    fields: [reviews.reviewerId],
    references: [users.id],
    relationName: 'reviewer',
  }),
  reviewee: one(users, {
    fields: [reviews.revieweeId],
    references: [users.id],
    relationName: 'reviewee',
  }),
}));

export const forumThreadsRelations = relations(forumThreads, ({ one, many }) => ({
  category: one(forumCategories, {
    fields: [forumThreads.categoryId],
    references: [forumCategories.id],
  }),
  user: one(users, {
    fields: [forumThreads.userId],
    references: [users.id],
  }),
  replies: many(forumReplies),
}));

export const forumRepliesRelations = relations(forumReplies, ({ one, many }) => ({
  thread: one(forumThreads, {
    fields: [forumReplies.threadId],
    references: [forumReplies.id],
  }),
  user: one(users, {
    fields: [forumReplies.userId],
    references: [users.id],
  }),
  parentReply: one(forumReplies, {
    fields: [forumReplies.parentReplyId],
    references: [forumReplies.id],
    relationName: 'parentReply',
  }),
  childReplies: many(forumReplies, { relationName: 'parentReply' }),
}));

export const paymentsRelations = relations(payments, ({ one }) => ({
  project: one(projects, {
    fields: [payments.projectId],
    references: [projects.id],
  }),
  payer: one(users, {
    fields: [payments.payerId],
    references: [users.id],
  }),
  payee: one(users, {
    fields: [payments.payeeId],
    references: [users.id],
  }),
}));

// Type exports
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type Bid = typeof bids.$inferSelect;
export type NewBid = typeof bids.$inferInsert;
export type Review = typeof reviews.$inferSelect;
export type NewReview = typeof reviews.$inferInsert;
export type ForumThread = typeof forumThreads.$inferSelect;
export type NewForumThread = typeof forumThreads.$inferInsert;
export type ForumReply = typeof forumReplies.$inferSelect;
export type NewForumReply = typeof forumReplies.$inferInsert;
export type Payment = typeof payments.$inferSelect;
export type NewPayment = typeof payments.$inferInsert;
export type Notification = typeof notifications.$inferSelect;
export type NewNotification = typeof notifications.$inferInsert;