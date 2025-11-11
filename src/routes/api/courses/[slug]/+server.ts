import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/db';
import { courses, courseCategories, users, courseModules, courseLessons, courseReviews } from '$lib/schema';
import { eq, and, desc } from 'drizzle-orm';

export const GET: RequestHandler = async ({ params }) => {
  try {
    const { slug } = params;

    if (!slug) {
      return json(
        {
          success: false,
          error: 'Course slug is required',
        },
        { status: 400 }
      );
    }

    // Get course with instructor and category
    const courseData = await db
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
        status: courses.status,
        duration: courses.duration,
        language: courses.language,
        prerequisites: courses.prerequisites,
        learningObjectives: courses.learningObjectives,
        tags: courses.tags,
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
          bio: users.bio,
          avatarUrl: users.avatarUrl,
          rating: users.rating,
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
      .where(and(eq(courses.slug, slug), eq(courses.status, 'published')))
      .limit(1);

    if (courseData.length === 0) {
      return json(
        {
          success: false,
          error: 'Course not found',
        },
        { status: 404 }
      );
    }

    const course = courseData[0];

    // Get course modules with lessons
    const modulesData = await db
      .select({
        id: courseModules.id,
        title: courseModules.title,
        description: courseModules.description,
        order: courseModules.order,
        duration: courseModules.duration,
        lessons: {
          id: courseLessons.id,
          title: courseLessons.title,
          description: courseLessons.description,
          type: courseLessons.type,
          duration: courseLessons.duration,
          order: courseLessons.order,
          isPreview: courseLessons.isPreview,
        },
      })
      .from(courseModules)
      .leftJoin(courseLessons, eq(courseModules.id, courseLessons.moduleId))
      .where(eq(courseModules.courseId, course.id))
      .orderBy(courseModules.order, courseLessons.order);

    // Group lessons by module
    const modules = modulesData.reduce((acc: any[], item) => {
      const moduleIndex = acc.findIndex(m => m.id === item.id);
      if (moduleIndex === -1) {
        acc.push({
          id: item.id,
          title: item.title,
          description: item.description,
          order: item.order,
          duration: item.duration,
          lessons: item.lessons ? [item.lessons] : [],
        });
      } else if (item.lessons) {
        acc[moduleIndex].lessons.push(item.lessons);
      }
      return acc;
    }, []);

    // Get course reviews
    const reviewsData = await db
      .select({
        id: courseReviews.id,
        rating: courseReviews.rating,
        review: courseReviews.review,
        isVerified: courseReviews.isVerified,
        createdAt: courseReviews.createdAt,
        student: {
          id: users.id,
          name: users.name,
          avatarUrl: users.avatarUrl,
        },
      })
      .from(courseReviews)
      .leftJoin(users, eq(courseReviews.studentId, users.id))
      .where(eq(courseReviews.courseId, course.id))
      .orderBy(desc(courseReviews.createdAt))
      .limit(10);

    return json({
      success: true,
      data: {
        ...course,
        modules,
        reviews: reviewsData,
      },
    });
  } catch (error) {
    console.error('Error fetching course:', error);
    return json(
      {
        success: false,
        error: 'Failed to fetch course',
      },
      { status: 500 }
    );
  }
};