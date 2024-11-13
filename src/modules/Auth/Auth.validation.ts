import { z } from 'zod';
const authUserValidation = z.object({
  body: z.object({
    id: z.string({ required_error: 'id is required' }),
    password: z.string({ required_error: 'password is required' }),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'old password needed for change password',
    }),
    newPassword: z.string({ required_error: 'password is requred' }),
  }),
});

export const loginUserValidation = {
  authUserValidation,
  changePasswordValidationSchema,
};
