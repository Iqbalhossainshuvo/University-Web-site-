import { z } from 'zod';

const createDepartmentsZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
  }),
});

const updateDepartmentsZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
  }),
});

export const DepartmentZodSchema = {
  createDepartmentsZodSchema,
  updateDepartmentsZodSchema,
};
