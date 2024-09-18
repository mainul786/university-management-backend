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
      admissionSemester: z.string(),
      academicDepartment: z.string(),
      profileImg: z.string(),
    }),
  }),
});

const updateUserSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, "First Name can't be more than 20 characters")
    .optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

const updateGuardianSchema = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional(),
});

const updateLocalGuardianSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
});

const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserSchema.optional(),
      gender: z.enum(['Male', 'Female']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email('Invalid email address').optional(),
      contactNo: z.string().optional(),
      emargencyContactNo: z.string().optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().optional(),
      parmenatAddress: z.string().optional(),
      guardian: updateGuardianSchema.optional(),
      localGrudian: updateLocalGuardianSchema.optional(),
      admissionSemester: z.string().optional(),
      academicDepartment: z.string().optional(),
      profileImg: z.string().optional(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
