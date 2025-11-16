import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
// import { db } from '$lib/db';
// import * as schema from '$lib/schema';
// const { course, courseModule, courseLesson, courseReview, courseCategory } = schema;
// import { user } from '$lib/userSchema';
// import { eq, and, desc } from 'drizzle-orm';

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

    // For now, return mock data since LMS schema is not implemented in SQLite
    // TODO: Implement course fetching when LMS schema is added
    return json({
      success: true,
      data: {
        id: 1,
        title: 'Course Not Available',
        slug,
        description: 'This course is temporarily unavailable. LMS features are under development.',
        shortDescription: 'Course temporarily disabled',
        thumbnailUrl: null,
        price: 0,
        originalPrice: null,
        level: 'beginner',
        status: 'draft',
        duration: 0,
        language: 'id',
        prerequisites: null,
        learningObjectives: [],
        tags: [],
        isFree: true,
        isFeatured: false,
        enrollmentCount: 0,
        rating: 0,
        reviewCount: 0,
        createdAt: new Date().toISOString(),
        publishedAt: null,
        instructor: {
          id: 1,
          name: 'System',
          bio: 'Course system under development',
          avatarUrl: null,
          rating: 0,
        },
        category: {
          id: 1,
          name: 'Development',
          slug: 'development',
        },
        modules: [],
        reviews: [],
      },
    });

    // Original code commented out until LMS schema is implemented
    /*
    // Get course with instructor and category
    const courseData = await db
      .select({
        id: course.id,
        title: course.title,
        slug: course.slug,
        description: course.description,
        shortDescription: course.shortDescription,
        thumbnailUrl: course.thumbnailUrl,
        price: course.price,
        originalPrice: course.originalPrice,
        level: course.level,
        status: course.status,
        duration: course.duration,
        language: course.language,
        prerequisites: course.prerequisites,
        learningObjectives: course.learningObjectives,
        tags: course.tags,
        isFree: course.isFree,
        isFeatured: course.isFeatured,
        enrollmentCount: course.enrollmentCount,
        rating: course.rating,
        reviewCount: course.reviewCount,
        createdAt: course.createdAt,
        publishedAt: course.publishedAt,
        instructor: {
          id: user.id,
          name: user.name,
          bio: user.bio,
          avatarUrl: user.avatarUrl,
          rating: user.rating,
        },
        category: {
          id: courseCategory.id,
          name: courseCategory.name,
          slug: courseCategory.slug,
        },
      })
      .from(course)
      .leftJoin(user, eq(course.instructorId, user.id))
      .leftJoin(courseCategory, eq(course.categoryId, courseCategory.id))
      .where(and(eq(course.slug, slug), eq(course.status, 'published')))
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
        id: courseModule.id,
        title: courseModule.title,
        description: courseModule.description,
        order: courseModule.order,
        duration: courseModule.duration,
        lessons: {
          id: courseLesson.id,
          title: courseLesson.title,
          description: courseLesson.description,
          type: courseLesson.type,
          duration: courseLesson.duration,
          order: courseLesson.order,
          isPreview: courseLesson.isPreview,
        },
      })
      .from(courseModule)
      .leftJoin(courseLesson, eq(courseModule.id, courseLesson.moduleId))
      .where(eq(courseModule.courseId, course.id))
      .orderBy(courseModule.order, courseLesson.order);

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
        id: courseReview.id,
        rating: courseReview.rating,
        review: courseReview.review,
        isVerified: courseReview.isVerified,
        createdAt: courseReview.createdAt,
        student: {
          id: user.id,
          name: user.name,
          avatarUrl: user.avatarUrl,
        },
      })
      .from(courseReview)
      .leftJoin(user, eq(courseReview.studentId, user.id))
      .where(eq(courseReview.courseId, course.id))
      .orderBy(desc(courseReview.createdAt))
      .limit(10);

    return json({
      success: true,
      data: {
        ...course,
        modules,
        reviews: reviewsData,
      },
    });
    */
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