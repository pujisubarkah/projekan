import { pgTable, serial, text, integer, timestamp, boolean, decimal } from 'drizzle-orm/pg-core';

// Users table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  name: text('name').notNull(),
  role: text('role').notNull().default('client'), // 'client' or 'freelancer'
  avatar: text('avatar'),
  bio: text('bio'),
  skills: text('skills'), // JSON string of skills array
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Projects table
export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  budget: decimal('budget', { precision: 10, scale: 2 }).notNull(),
  category: text('category').notNull(),
  status: text('status').notNull().default('open'), // 'open', 'in_progress', 'completed', 'cancelled'
  clientId: integer('client_id').references(() => users.id),
  freelancerId: integer('freelancer_id').references(() => users.id),
  deadline: timestamp('deadline'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Bids table
export const bids = pgTable('bids', {
  id: serial('id').primaryKey(),
  projectId: integer('project_id').references(() => projects.id),
  freelancerId: integer('freelancer_id').references(() => users.id),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  proposal: text('proposal').notNull(),
  status: text('status').notNull().default('pending'), // 'pending', 'accepted', 'rejected'
  createdAt: timestamp('created_at').defaultNow(),
});

// Payments table
export const payments = pgTable('payments', {
  id: serial('id').primaryKey(),
  projectId: integer('project_id').references(() => projects.id),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  status: text('status').notNull().default('pending'), // 'pending', 'completed', 'failed'
  qrisReference: text('qris_reference'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Reviews table
export const reviews = pgTable('reviews', {
  id: serial('id').primaryKey(),
  projectId: integer('project_id').references(() => projects.id),
  reviewerId: integer('reviewer_id').references(() => users.id),
  revieweeId: integer('reviewee_id').references(() => users.id),
  rating: integer('rating').notNull(), // 1-5 stars
  comment: text('comment'),
  createdAt: timestamp('created_at').defaultNow(),
});