import { db } from './db';
import { users } from './schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface User {
  id: number;
  email: string;
  name: string;
  role: 'client' | 'freelancer';
  avatar?: string;
  bio?: string;
  skills?: string;
}

export interface AuthUser extends User {
  token: string;
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12);
}

// Verify password
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

// Generate JWT token
export function generateToken(user: User): string {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

// Verify JWT token
export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

// Create user
export async function createUser(email: string, password: string, name: string, role: 'client' | 'freelancer' = 'client') {
  const hashedPassword = await hashPassword(password);

  const result = await db.insert(users).values({
    email,
    password: hashedPassword,
    name,
    role,
  }).returning();

  return result[0];
}

// Authenticate user
export async function authenticateUser(email: string, password: string): Promise<AuthUser | null> {
  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);

  if (result.length === 0) {
    return null;
  }

  const user = result[0];
  const isValidPassword = await verifyPassword(password, user.password);

  if (!isValidPassword) {
    return null;
  }

  const userData: User = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role as 'client' | 'freelancer',
    avatar: user.avatar || undefined,
    bio: user.bio || undefined,
    skills: user.skills || undefined,
  };

  return {
    ...userData,
    token: generateToken(userData),
  };
}

// Get user by ID
export async function getUserById(id: number): Promise<User | null> {
  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);

  if (result.length === 0) {
    return null;
  }

  const user = result[0];
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role as 'client' | 'freelancer',
    avatar: user.avatar || undefined,
    bio: user.bio || undefined,
    skills: user.skills || undefined,
  };
}