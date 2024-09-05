import { z } from 'zod';

const createUserSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, "First Name can't be more than 20 characters"),
  middleName: z.string().optional(),
  lastName: z.string(),
});

const createGuardianSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

const createLocalGuardianSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string(),
    student: z.object({
      name: createUserSchema,
      gender: z.enum(['Male', 'Female']),
      dateOfBirth: z.string(),
      email: z.string().email('Invalid email address'),
      contactNo: z.string(),
      emargencyContactNo: z.string(),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      presentAddress: z.string(),
      parmenatAddress: z.string(),
      guardian: createGuardianSchema,
      localGrudian: createLocalGuardianSchema,
      profileImg: z.string(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
};
