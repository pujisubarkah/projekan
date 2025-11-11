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

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;