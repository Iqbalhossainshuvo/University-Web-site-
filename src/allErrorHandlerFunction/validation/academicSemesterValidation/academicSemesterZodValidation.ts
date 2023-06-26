import { z } from 'zod';

const months: [string, ...string[]] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const academicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum(['Autumn', 'Summer', 'Fall'], {
      required_error: 'Please enter title',
    }),
    year: z.string({ required_error: 'Year is required' }),
    code: z.enum(['01', '02', '03']),
    startMonth: z.enum(months, { required_error: 'start month is required' }),
    endMonth: z.enum(months, { required_error: 'end month is required' }),
  }),
});

const updateSemesterZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum(['Autumn', 'Summer', 'Fall'], {
          required_error: 'Please enter title',
        })
        .optional(),
      year: z.string({ required_error: 'Year is required' }).optional(),
      code: z.enum(['01', '02', '03']).optional(),
      startMonth: z
        .enum(months, { required_error: 'start month is required' })
        .optional(),
      endMonth: z
        .enum(months, { required_error: 'end month is required' })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && data.body.code),
    {
      message:
        'Either both are required, title and code need to be matched together',
    }
  );

export const createAcademicSemesterZodSchema = {
  academicSemesterZodSchema,
  updateSemesterZodSchema,
};

// this is long way
// const updateSemesterZodSchema = z
//   .object({
//     body: z.object({
//       title: z.enum(['Autumn', 'Summer', 'Fall'], {
//         required_error: 'Please enter title',
//       }),
//       year: z.string({ required_error: 'Year is required' }),
//       code: z.enum(['01', '02', '03']),
//       startMonth: z.enum(
//         [
//           'January',
//           'February',
//           'March',
//           'April',
//           'May',
//           'June',
//           'July',
//           'August',
//           'September',
//           'October',
//           'November',
//           'December',
//         ],
//         { required_error: 'start month is required' }
//       ),
//       endMonth: z.enum(
//         [
//           'January',
//           'February',
//           'March',
//           'April',
//           'May',
//           'June',
//           'July',
//           'August',
//           'September',
//           'October',
//           'November',
//           'December',
//         ],
//         { required_error: 'end month is required' }
//       ),
//     }),
//   })
//   .refine(
//     data =>
//       (data.body.title && data.body.code) ||
//       (!data.body.title && data.body.code),
//     {
//       message:
//         'Either both are required, title and code need to be matched together',
//     }
//   );
