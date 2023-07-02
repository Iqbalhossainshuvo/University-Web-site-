import { z } from 'zod';

const loginZodValidation = z.object({
  body: z.object({
    id: z.string({
      required_error: 'role is required',
    }),
    password: z.string({
        required_error: 'role is required',
    })
  }),
});

// await loginZodValidation.parseAsync(req)
// req-validation
// body- objects
// data- objects

export const loginValidation = {
  loginZodValidation,
};
