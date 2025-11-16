import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/db';
import { users, roles } from '$lib/schema';
import { eq, isNull } from 'drizzle-orm';

export const GET: RequestHandler = async () => {
  try {
    // Get all users with their roles
    const usersData = await db
      .select({
        id: users.id,
        email: users.email,
        name: users.name,
        roleId: users.roleId,
        bio: users.bio,
        avatarUrl: users.avatarUrl,
        location: users.location,
        rating: users.rating,
        isVerified: users.isVerified,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
        deletedAt: users.deletedAt,
        role: {
          id: roles.id,
          name: roles.name,
          label: roles.label,
        },
      })
      .from(users)
      .leftJoin(roles, eq(users.roleId, roles.id))
      .where(isNull(users.deletedAt)) // Only get non-deleted users
      .orderBy(users.createdAt);

    // Convert rating from string to number for each user
    const usersWithConvertedRating = usersData.map(user => ({
      ...user,
      rating: user.rating ? parseFloat(user.rating) : 0.0,
    }));

    return json({
      success: true,
      data: usersWithConvertedRating,
    });

  } catch (error) {
    console.error('Error fetching users:', error);
    return json(
      {
        success: false,
        error: 'Failed to fetch users',
      },
      { status: 500 }
    );
  }
};