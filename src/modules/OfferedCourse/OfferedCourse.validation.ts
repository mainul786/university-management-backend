import { z } from 'zod';
import { Days } from './OfferedCourse.constant';
const createOfferedCourseValidationSchema = z.object({
  body: z.object({
    semesterRegistration: z.string(),
    academicSemester: z.string(),
    academicFaculty: z.string(),
    academicDepartment: z.string(),
    course: z.string(),
    faculty: z.string(),
    mixCapacity: z.number(),
    section: z.number(),
    days: z.enum([...(Days as [string, ...string[]])]),
    startTime: z.string(),
    endTime: z.string(),
  }),
});

export const OfferedCourseValidation = {
  createOfferedCourseValidationSchema,
};
