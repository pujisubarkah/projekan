// Global Type Definitions for Marketplace App

export interface User {
  id: number;
  email: string;
  name: string;
  role: 'client' | 'freelancer';
  avatar?: string;
  bio?: string;
  skills?: string; // JSON string of skills array
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  budget: number;
  category: string;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  clientId?: number;
  client?: User;
  freelancerId?: number;
  freelancer?: User;
  deadline?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Bid {
  id: number;
  projectId: number;
  project?: Project;
  freelancerId: number;
  freelancer?: User;
  amount: number;
  proposal: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt?: Date;
}

export interface Payment {
  id: number;
  projectId: number;
  project?: Project;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  qrisReference?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Review {
  id: number;
  projectId: number;
  project?: Project;
  reviewerId: number;
  reviewer?: User;
  revieweeId: number;
  reviewee?: User;
  rating: number; // 1-5 stars
  comment?: string;
  createdAt?: Date;
}

// LMS Types
export interface CourseCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
  courseCount?: number;
}

export interface Course {
  id: number;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  thumbnailUrl?: string;
  instructorId: number;
  instructor?: User;
  categoryId?: number;
  category?: CourseCategory;
  price: number;
  originalPrice?: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  status: 'draft' | 'published' | 'archived';
  duration: number; // in minutes
  language: string;
  prerequisites?: string;
  learningObjectives?: string[];
  tags?: string[];
  isFree: boolean;
  isFeatured: boolean;
  enrollmentCount: number;
  rating: number;
  reviewCount: number;
  modules?: CourseModule[];
  createdAt?: Date;
  updatedAt?: Date;
  publishedAt?: Date;
}

export interface CourseModule {
  id: number;
  courseId: number;
  title: string;
  description?: string;
  order: number;
  duration: number;
  lessons?: CourseLesson[];
  createdAt?: Date;
}

export interface CourseLesson {
  id: number;
  moduleId: number;
  title: string;
  description?: string;
  type: 'video' | 'text' | 'quiz' | 'assignment' | 'live_session';
  content?: string;
  videoUrl?: string;
  duration: number;
  order: number;
  isPreview: boolean;
  attachments?: any[];
  quiz?: CourseQuiz;
  progress?: LessonProgress;
  createdAt?: Date;
}

export interface CourseEnrollment {
  id: number;
  courseId: number;
  course?: Course;
  studentId: number;
  student?: User;
  status: 'active' | 'completed' | 'cancelled' | 'expired';
  progress: number; // 0-100
  enrolledAt?: Date;
  completedAt?: Date;
  lastAccessedAt?: Date;
  certificateUrl?: string;
  lessonProgress?: LessonProgress[];
  createdAt?: Date;
}

export interface LessonProgress {
  id: number;
  enrollmentId: number;
  lessonId: number;
  isCompleted: boolean;
  timeSpent: number;
  lastPosition: number;
  completedAt?: Date;
  createdAt?: Date;
}

export interface CourseReview {
  id: number;
  courseId: number;
  studentId: number;
  student?: User;
  rating: number;
  review?: string;
  isVerified: boolean;
  createdAt?: Date;
}

export interface CourseQuiz {
  id: number;
  lessonId: number;
  title: string;
  description?: string;
  passingScore: number;
  timeLimit?: number;
  attemptsAllowed: number;
  isRequired: boolean;
  questions?: QuizQuestion[];
  createdAt?: Date;
}

export interface QuizQuestion {
  id: number;
  quizId: number;
  question: string;
  type: string;
  options?: any[];
  correctAnswer?: any;
  explanation?: string;
  points: number;
  order: number;
  createdAt?: Date;
}

export interface QuizAttempt {
  id: number;
  enrollmentId: number;
  quizId: number;
  score: number;
  maxScore: number;
  percentage: number;
  passed: boolean;
  startedAt?: Date;
  completedAt?: Date;
  timeSpent?: number;
  createdAt?: Date;
}

export interface Certificate {
  id: number;
  enrollmentId: number;
  certificateNumber: string;
  issuedAt?: Date;
  expiresAt?: Date;
  downloadUrl?: string;
  isActive: boolean;
  createdAt?: Date;
}

// Forum types
export interface ForumCategory {
  id: number;
  name: string;
  description: string;
  icon: string;
  threads: number;
  lastPost: string;
}

export interface ForumThread {
  id: number;
  title: string;
  categoryId: number;
  author: string;
  replies: number;
  views: number;
  lastReply: string;
  isSticky: boolean;
  isLocked: boolean;
  content?: string;
  createdAt?: string;
}

export interface ForumReply {
  id: number;
  threadId: number;
  author: string;
  content: string;
  createdAt: string;
  likes?: number;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  email: string;
  password: string;
  name: string;
  role: 'client' | 'freelancer';
}

export interface ProjectForm {
  title: string;
  description: string;
  budget: number;
  category: string;
  deadline?: string;
}

export interface BidForm {
  amount: number;
  proposal: string;
}

// Category options
export const PROJECT_CATEGORIES = [
  'Web Development',
  'Mobile Development',
  'UI/UX Design',
  'Graphic Design',
  'Writing',
  'Translation',
  'Data Entry',
  'Marketing',
  'Consulting',
  'Other',
] as const;

export type ProjectCategory = typeof PROJECT_CATEGORIES[number];

// Status options
export const PROJECT_STATUSES = ['open', 'in_progress', 'completed', 'cancelled'] as const;
export const BID_STATUSES = ['pending', 'accepted', 'rejected'] as const;
export const PAYMENT_STATUSES = ['pending', 'completed', 'failed'] as const;

// LMS Constants
export const COURSE_LEVELS = ['beginner', 'intermediate', 'advanced'] as const;
export const COURSE_STATUSES = ['draft', 'published', 'archived'] as const;
export const ENROLLMENT_STATUSES = ['active', 'completed', 'cancelled', 'expired'] as const;
export const LESSON_TYPES = ['video', 'text', 'quiz', 'assignment', 'live_session'] as const;
export const QUIZ_QUESTION_TYPES = ['multiple_choice', 'true_false', 'short_answer'] as const;

export const COURSE_CATEGORIES = [
  'Web Development',
  'Mobile Development',
  'UI/UX Design',
  'Graphic Design',
  'Digital Marketing',
  'Data Science',
  'Programming',
  'Business',
  'Photography',
  'Writing',
  'Translation',
  'Other',
] as const;

export type CourseLevel = typeof COURSE_LEVELS[number];
export type CourseStatus = typeof COURSE_STATUSES[number];
export type EnrollmentStatus = typeof ENROLLMENT_STATUSES[number];
export type LessonType = typeof LESSON_TYPES[number];
export type QuizQuestionType = typeof QUIZ_QUESTION_TYPES[number];
export type CourseCategoryType = typeof COURSE_CATEGORIES[number];

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;