import { z } from 'zod';

const userSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, "First Name can't be more than 20 characters"),
  middleName: z.string().optional(),
  lastName: z.string(),
});

const guardianSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

const localGuardianSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

const studentValidationSchema = z.object({
  id: z.string(),
  name: userSchema,
  gender: z.enum(['Male', 'Female']),
  dateOfBirth: z.string(),
  email: z.string().email('Invalid email address'),
  contactNo: z.string(),
  emargencyContactNo: z.string(),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  presentAddress: z.string(),
  parmenatAddress: z.string(),
  guardian: guardianSchema,
  localGrudian: localGuardianSchema,
  profileImg: z.string(),
  isActive: z.enum(['active', 'blocked']),
  isDeleted: z.boolean(),
});

export default studentValidationSchema;
