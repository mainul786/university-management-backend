import { z } from 'zod';

const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be a string',
    })
    .min(1)
    .max(20, { message: 'password more than 20 charecter.' }),
});

export const userValidation = {
  userValidationSchema,
};
