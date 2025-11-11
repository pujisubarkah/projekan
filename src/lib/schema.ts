import { pgTable, serial, varchar, text, bigint, decimal, timestamp, pgEnum, integer, boolean, jsonb, index, uniqueIndex } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const userRoleEnum = pgEnum('user_role', ['admin', 'client', 'freelancer']);
export const projectStatusEnum = pgEnum('project_status', ['open', 'in_progress', 'completed', 'closed']);
export const bidStatusEnum = pgEnum('bid_status', ['pending', 'accepted', 'rejected', 'withdrawn']);
export const paymentStatusEnum = pgEnum('payment_status', ['initiated', 'paid', 'failed', 'refunded', 'cancelled']);
export const courseLevelEnum = pgEnum('course_level', ['beginner', 'intermediate', 'advanced']);
export const courseStatusEnum = pgEnum('course_status', ['draft', 'published', 'archived']);
export const enrollmentStatusEnum = pgEnum('enrollment_status', ['active', 'completed', 'cancelled', 'expired']);
export const lessonTypeEnum = pgEnum('lesson_type', ['video', 'text', 'quiz', 'assignment', 'live_session']);

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

// LMS Tables
export const courseCategories = pgTable('course_categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 120 }).notNull().unique(),
  slug: varchar('slug', { length: 150 }).notNull().unique(),
  description: text('description'),
  icon: varchar('icon', { length: 100 }),
  color: varchar('color', { length: 20 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const courses = pgTable('courses', {
  id: serial('id').primaryKey(),
  instructorId: integer('instructor_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  categoryId: integer('category_id').references(() => courseCategories.id, { onDelete: 'set null' }),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  description: text('description').notNull(),
  shortDescription: varchar('short_description', { length: 300 }),
  thumbnailUrl: varchar('thumbnail_url', { length: 512 }),
  price: bigint('price', { mode: 'number' }).notNull().default(0),
  originalPrice: bigint('original_price', { mode: 'number' }),
  level: courseLevelEnum('level').default('beginner'),
  status: courseStatusEnum('status').default('draft'),
  duration: integer('duration').default(0), // in minutes
  language: varchar('language', { length: 50 }).default('id'),
  prerequisites: text('prerequisites'),
  learningObjectives: jsonb('learning_objectives'),
  tags: jsonb('tags'),
  isFree: boolean('is_free').default(false),
  isFeatured: boolean('is_featured').default(false),
  enrollmentCount: integer('enrollment_count').default(0),
  rating: decimal('rating', { precision: 3, scale: 2 }).default('0.00'),
  reviewCount: integer('review_count').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  publishedAt: timestamp('published_at'),
}, (table) => ({
  instructorIdx: index('idx_courses_instructor').on(table.instructorId),
  categoryIdx: index('idx_courses_category').on(table.categoryId),
  statusIdx: index('idx_courses_status').on(table.status),
  titleDescriptionIdx: index('ft_courses_title_description').on(table.title, table.description),
}));

export const courseModules = pgTable('course_modules', {
  id: serial('id').primaryKey(),
  courseId: integer('course_id').notNull().references(() => courses.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  order: integer('order').notNull(),
  duration: integer('duration').default(0), // in minutes
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  courseOrderIdx: uniqueIndex('course_modules_course_order_idx').on(table.courseId, table.order),
}));

export const courseLessons = pgTable('course_lessons', {
  id: serial('id').primaryKey(),
  moduleId: integer('module_id').notNull().references(() => courseModules.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  type: lessonTypeEnum('type').default('video'),
  content: text('content'), // for text lessons
  videoUrl: varchar('video_url', { length: 512 }),
  duration: integer('duration').default(0), // in seconds
  order: integer('order').notNull(),
  isPreview: boolean('is_preview').default(false),
  attachments: jsonb('attachments'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  moduleOrderIdx: uniqueIndex('course_lessons_module_order_idx').on(table.moduleId, table.order),
}));

export const courseEnrollments = pgTable('course_enrollments', {
  id: serial('id').primaryKey(),
  courseId: integer('course_id').notNull().references(() => courses.id, { onDelete: 'cascade' }),
  studentId: integer('student_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  status: enrollmentStatusEnum('status').default('active'),
  progress: decimal('progress', { precision: 5, scale: 2 }).default('0.00'), // 0-100
  enrolledAt: timestamp('enrolled_at').defaultNow(),
  completedAt: timestamp('completed_at'),
  lastAccessedAt: timestamp('last_accessed_at'),
  certificateUrl: varchar('certificate_url', { length: 512 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  courseStudentIdx: uniqueIndex('course_enrollments_course_student_idx').on(table.courseId, table.studentId),
  studentIdx: index('idx_course_enrollments_student').on(table.studentId),
}));

export const lessonProgress = pgTable('lesson_progress', {
  id: serial('id').primaryKey(),
  enrollmentId: integer('enrollment_id').notNull().references(() => courseEnrollments.id, { onDelete: 'cascade' }),
  lessonId: integer('lesson_id').notNull().references(() => courseLessons.id, { onDelete: 'cascade' }),
  isCompleted: boolean('is_completed').default(false),
  timeSpent: integer('time_spent').default(0), // in seconds
  lastPosition: integer('last_position').default(0), // for video progress
  completedAt: timestamp('completed_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  enrollmentLessonIdx: uniqueIndex('lesson_progress_enrollment_lesson_idx').on(table.enrollmentId, table.lessonId),
}));

export const courseReviews = pgTable('course_reviews', {
  id: serial('id').primaryKey(),
  courseId: integer('course_id').notNull().references(() => courses.id, { onDelete: 'cascade' }),
  studentId: integer('student_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  rating: integer('rating').notNull(),
  review: text('review'),
  isVerified: boolean('is_verified').default(false), // completed course
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  courseStudentReviewIdx: uniqueIndex('course_reviews_course_student_idx').on(table.courseId, table.studentId),
}));

export const courseQuizzes = pgTable('course_quizzes', {
  id: serial('id').primaryKey(),
  lessonId: integer('lesson_id').notNull().references(() => courseLessons.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  passingScore: integer('passing_score').default(70), // percentage
  timeLimit: integer('time_limit'), // in minutes, null = unlimited
  attemptsAllowed: integer('attempts_allowed').default(1),
  isRequired: boolean('is_required').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const quizQuestions = pgTable('quiz_questions', {
  id: serial('id').primaryKey(),
  quizId: integer('quiz_id').notNull().references(() => courseQuizzes.id, { onDelete: 'cascade' }),
  question: text('question').notNull(),
  type: varchar('type', { length: 50 }).default('multiple_choice'), // multiple_choice, true_false, short_answer
  options: jsonb('options'), // for multiple choice
  correctAnswer: jsonb('correct_answer'),
  explanation: text('explanation'),
  points: integer('points').default(1),
  order: integer('order').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const quizAttempts = pgTable('quiz_attempts', {
  id: serial('id').primaryKey(),
  enrollmentId: integer('enrollment_id').notNull().references(() => courseEnrollments.id, { onDelete: 'cascade' }),
  quizId: integer('quiz_id').notNull().references(() => courseQuizzes.id, { onDelete: 'cascade' }),
  score: integer('score').default(0),
  maxScore: integer('max_score').default(0),
  percentage: decimal('percentage', { precision: 5, scale: 2 }),
  passed: boolean('passed').default(false),
  startedAt: timestamp('started_at').defaultNow(),
  completedAt: timestamp('completed_at'),
  timeSpent: integer('time_spent'), // in seconds
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  enrollmentQuizIdx: index('quiz_attempts_enrollment_quiz_idx').on(table.enrollmentId, table.quizId),
}));

export const certificates = pgTable('certificates', {
  id: serial('id').primaryKey(),
  enrollmentId: integer('enrollment_id').notNull().references(() => courseEnrollments.id, { onDelete: 'cascade' }),
  certificateNumber: varchar('certificate_number', { length: 100 }).notNull().unique(),
  issuedAt: timestamp('issued_at').defaultNow(),
  expiresAt: timestamp('expires_at'),
  downloadUrl: varchar('download_url', { length: 512 }),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

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

// LMS Relations
export const coursesRelations = relations(courses, ({ one, many }) => ({
  instructor: one(users, {
    fields: [courses.instructorId],
    references: [users.id],
  }),
  category: one(courseCategories, {
    fields: [courses.categoryId],
    references: [courseCategories.id],
  }),
  modules: many(courseModules),
  enrollments: many(courseEnrollments),
  reviews: many(courseReviews),
}));

export const courseModulesRelations = relations(courseModules, ({ one, many }) => ({
  course: one(courses, {
    fields: [courseModules.courseId],
    references: [courses.id],
  }),
  lessons: many(courseLessons),
}));

export const courseLessonsRelations = relations(courseLessons, ({ one, many }) => ({
  module: one(courseModules, {
    fields: [courseLessons.moduleId],
    references: [courseModules.id],
  }),
  progress: many(lessonProgress),
  quiz: one(courseQuizzes),
}));

export const courseEnrollmentsRelations = relations(courseEnrollments, ({ one, many }) => ({
  course: one(courses, {
    fields: [courseEnrollments.courseId],
    references: [courses.id],
  }),
  student: one(users, {
    fields: [courseEnrollments.studentId],
    references: [users.id],
  }),
  lessonProgress: many(lessonProgress),
  quizAttempts: many(quizAttempts),
  certificate: one(certificates),
}));

export const lessonProgressRelations = relations(lessonProgress, ({ one }) => ({
  enrollment: one(courseEnrollments, {
    fields: [lessonProgress.enrollmentId],
    references: [courseEnrollments.id],
  }),
  lesson: one(courseLessons, {
    fields: [lessonProgress.lessonId],
    references: [courseLessons.id],
  }),
}));

export const courseReviewsRelations = relations(courseReviews, ({ one }) => ({
  course: one(courses, {
    fields: [courseReviews.courseId],
    references: [courses.id],
  }),
  student: one(users, {
    fields: [courseReviews.studentId],
    references: [users.id],
  }),
}));

export const courseQuizzesRelations = relations(courseQuizzes, ({ one, many }) => ({
  lesson: one(courseLessons, {
    fields: [courseQuizzes.lessonId],
    references: [courseLessons.id],
  }),
  questions: many(quizQuestions),
  attempts: many(quizAttempts),
}));

export const quizQuestionsRelations = relations(quizQuestions, ({ one }) => ({
  quiz: one(courseQuizzes, {
    fields: [quizQuestions.quizId],
    references: [courseQuizzes.id],
  }),
}));

export const quizAttemptsRelations = relations(quizAttempts, ({ one }) => ({
  enrollment: one(courseEnrollments, {
    fields: [quizAttempts.enrollmentId],
    references: [courseEnrollments.id],
  }),
  quiz: one(courseQuizzes, {
    fields: [quizAttempts.quizId],
    references: [courseQuizzes.id],
  }),
}));

export const certificatesRelations = relations(certificates, ({ one }) => ({
  enrollment: one(courseEnrollments, {
    fields: [certificates.enrollmentId],
    references: [courseEnrollments.id],
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

// LMS Type exports
export type CourseCategory = typeof courseCategories.$inferSelect;
export type NewCourseCategory = typeof courseCategories.$inferInsert;
export type Course = typeof courses.$inferSelect;
export type NewCourse = typeof courses.$inferInsert;
export type CourseModule = typeof courseModules.$inferSelect;
export type NewCourseModule = typeof courseModules.$inferInsert;
export type CourseLesson = typeof courseLessons.$inferSelect;
export type NewCourseLesson = typeof courseLessons.$inferInsert;
export type CourseEnrollment = typeof courseEnrollments.$inferSelect;
export type NewCourseEnrollment = typeof courseEnrollments.$inferInsert;
export type LessonProgress = typeof lessonProgress.$inferSelect;
export type NewLessonProgress = typeof lessonProgress.$inferInsert;
export type CourseReview = typeof courseReviews.$inferSelect;
export type NewCourseReview = typeof courseReviews.$inferInsert;
export type CourseQuiz = typeof courseQuizzes.$inferSelect;
export type NewCourseQuiz = typeof courseQuizzes.$inferInsert;
export type QuizQuestion = typeof quizQuestions.$inferSelect;
export type NewQuizQuestion = typeof quizQuestions.$inferInsert;
export type QuizAttempt = typeof quizAttempts.$inferSelect;
export type NewQuizAttempt = typeof quizAttempts.$inferInsert;
export type Certificate = typeof certificates.$inferSelect;
export type NewCertificate = typeof certificates.$inferInsert;