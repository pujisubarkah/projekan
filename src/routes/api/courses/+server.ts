import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/db';
import { courses, courseCategories, users } from '$lib/schema';
import { eq, and, like, desc, sql } from 'drizzle-orm';

export const GET: RequestHandler = async ({ url }) => {
  try {
    const searchParams = url.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const category = searchParams.get('category');
    const level = searchParams.get('level');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured') === 'true';
    const free = searchParams.get('free') === 'true';

    const offset = (page - 1) * limit;

    // Build where conditions
    const whereConditions = [eq(courses.status, 'published')];

    if (category) {
      whereConditions.push(eq(courses.categoryId, parseInt(category)));
    }

    if (level && ['beginner', 'intermediate', 'advanced'].includes(level)) {
      whereConditions.push(eq(courses.level, level as 'beginner' | 'intermediate' | 'advanced'));
    }

    if (search) {
      whereConditions.push(
        sql`(${courses.title} ILIKE ${`%${search}%`} OR ${courses.description} ILIKE ${`%${search}%`})`
      );
    }

    if (featured) {
      whereConditions.push(eq(courses.isFeatured, true));
    }

    if (free) {
      whereConditions.push(eq(courses.isFree, true));
    }

    // Get courses with instructor and category info
    const coursesData = await db
      .select({
        id: courses.id,
        title: courses.title,
        slug: courses.slug,
        description: courses.description,
        shortDescription: courses.shortDescription,
        thumbnailUrl: courses.thumbnailUrl,
        price: courses.price,
        originalPrice: courses.originalPrice,
        level: courses.level,
        duration: courses.duration,
        language: courses.language,
        isFree: courses.isFree,
        isFeatured: courses.isFeatured,
        enrollmentCount: courses.enrollmentCount,
        rating: courses.rating,
        reviewCount: courses.reviewCount,
        createdAt: courses.createdAt,
        publishedAt: courses.publishedAt,
        instructor: {
          id: users.id,
          name: users.name,
          avatarUrl: users.avatarUrl,
        },
        category: {
          id: courseCategories.id,
          name: courseCategories.name,
          slug: courseCategories.slug,
        },
      })
      .from(courses)
      .leftJoin(users, eq(courses.instructorId, users.id))
      .leftJoin(courseCategories, eq(courses.categoryId, courseCategories.id))
      .where(and(...whereConditions))
      .orderBy(desc(courses.createdAt))
      .limit(limit)
      .offset(offset);

    // Get total count for pagination
    const totalResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(courses)
      .where(and(...whereConditions));

    const total = totalResult[0].count;
    const totalPages = Math.ceil(total / limit);

    return json({
      success: true,
      data: coursesData,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return json(
      {
        success: false,
        error: 'Failed to fetch courses',
      },
      { status: 500 }
    );
  }
};