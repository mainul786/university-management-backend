import { z } from 'zod';

const createAcademicDepartment = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Acdemic Depatment must be string ',
      required_error: 'name is requried',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'Academic faculty id is string',
    }),
  }),
});

const updateAcademicDepartment = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Acdemic Depatment must be string ',
        required_error: 'name is requried',
      })
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error: 'Academic faculty id is string',
      })
      .optional(),
  }),
});

export const AcademicDepartmentValidations = {
  createAcademicDepartment,
  updateAcademicDepartment,
};
