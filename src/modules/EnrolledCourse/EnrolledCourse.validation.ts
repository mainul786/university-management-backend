import { z } from 'zod';

const createEnrolledCourseValidationSchema = z.object({
  body: z.object({
    OfferedCourse: z.string(),
  }),
});

export const EnrolledCourseValidations = {
  createEnrolledCourseValidationSchema,
};
