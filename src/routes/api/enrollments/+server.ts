import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/db';
import { courseEnrollments, courses, payments } from '$lib/schema';
import { eq, and } from 'drizzle-orm';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { courseId, userId } = await request.json();

    if (!courseId || !userId) {
      return json(
        {
          success: false,
          error: 'Course ID and User ID are required',
        },
        { status: 400 }
      );
    }

    // Check if course exists and is published
    const courseData = await db
      .select()
      .from(courses)
      .where(and(eq(courses.id, courseId), eq(courses.status, 'published')))
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

    // Check if user is already enrolled
    const existingEnrollment = await db
      .select()
      .from(courseEnrollments)
      .where(and(
        eq(courseEnrollments.courseId, courseId),
        eq(courseEnrollments.studentId, userId),
        eq(courseEnrollments.status, 'active')
      ))
      .limit(1);

    if (existingEnrollment.length > 0) {
      return json(
        {
          success: false,
          error: 'Already enrolled in this course',
        },
        { status: 400 }
      );
    }

    // If course is not free, check for payment
    if (!course.isFree) {
      // Check if there's a successful payment for this course
      const paymentData = await db
        .select()
        .from(payments)
        .where(and(
          eq(payments.projectId, courseId), // Using projectId as courseId for now
          eq(payments.payerId, userId),
          eq(payments.status, 'paid')
        ))
        .limit(1);

      if (paymentData.length === 0) {
        return json(
          {
            success: false,
            error: 'Payment required for this course',
          },
          { status: 402 } // Payment Required
        );
      }
    }

    // Create enrollment
    const enrollmentData = await db
      .insert(courseEnrollments)
      .values({
        courseId,
        studentId: userId,
        status: 'active',
        progress: '0.00',
      })
      .returning();

    // Update course enrollment count
    await db
      .update(courses)
      .set({
        enrollmentCount: course.enrollmentCount + 1,
      })
      .where(eq(courses.id, courseId));

    return json({
      success: true,
      data: enrollmentData[0],
      message: 'Successfully enrolled in course',
    });
  } catch (error) {
    console.error('Error enrolling in course:', error);
    return json(
      {
        success: false,
        error: 'Failed to enroll in course',
      },
      { status: 500 }
    );
  }
};