import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/db';
import { users, roles } from '$lib/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { email, password } = await request.json();

    console.log('Login attempt for email:', email);

    // Validate input
    if (!email || !password) {
      return json(
        { success: false, error: 'Email dan password harus diisi' },
        { status: 400 }
      );
    }

    // Database lookup
    try {
    const userResult = await db
      .select({
        id: users.id,
        email: users.email,
        passwordHash: users.passwordHash,
        name: users.name,
        roleId: users.roleId,
        bio: users.bio,
        avatarUrl: users.avatarUrl,
        location: users.location,
        rating: users.rating,
        isVerified: users.isVerified,
        role: {
          id: roles.id,
          name: roles.name,
          label: roles.label,
        },
      })
      .from(users)
      .leftJoin(roles, eq(users.roleId, roles.id))
      .where(eq(users.email, email))
      .limit(1);

    console.log('Database query result:', userResult.length > 0 ? 'User found' : 'User not found');

    if (userResult.length === 0) {
      console.log('No user found with email:', email);
      return json(
        { success: false, error: 'Email atau password salah' },
        { status: 401 }
      );
    }

    const user = userResult[0];
    console.log('User found:', { id: user.id, email: user.email, hasPasswordHash: !!user.passwordHash });

    // Convert rating from string to number (decimal type from PostgreSQL)
    const userWithConvertedRating = {
      ...user,
      rating: user.rating ? parseFloat(user.rating) : 0.0,
    };

    // Check if user has a password hash (might be OAuth user)
    if (!userWithConvertedRating.passwordHash) {
      console.log('User has no password hash (OAuth user):', user.email);
      return json(
        { success: false, error: 'Akun ini menggunakan login OAuth' },
        { status: 401 }
      );
    }

    // Verify password
    console.log('Verifying password for user:', user.email);
    const isValidPassword = await bcrypt.compare(password, userWithConvertedRating.passwordHash);
    console.log('Password verification result:', isValidPassword);

    if (!isValidPassword) {
      console.log('Invalid password for user:', user.email);
      return json(
        { success: false, error: 'Email atau password salah' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
    const token = jwt.sign(
      {
        userId: userWithConvertedRating.id,
        email: userWithConvertedRating.email,
        role: userWithConvertedRating.role?.name || 'client',
      },
      jwtSecret,
      { expiresIn: '7d' }
    );

    // Return user data and token (exclude password hash)
    const { passwordHash, ...userWithoutPassword } = userWithConvertedRating;

    return json({
      success: true,
      token,
      user: userWithoutPassword,
    });

    } catch (dbError) {
      console.error('Database error:', dbError);
      return json(
        { success: false, error: 'Service temporarily unavailable' },
        { status: 503 }
      );
    }

  } catch (error) {
    console.error('Login error:', error);
    return json(
      { success: false, error: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
};