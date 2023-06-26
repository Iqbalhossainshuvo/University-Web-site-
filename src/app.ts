import express, { Application } from 'express';
import cors from 'cors';

import { UserRouter } from './app/module/User/user.route';
import globalErrorHandler from './allErrorHandlerFunction/globalErrorHandler/globalErrorHandler';
import { AcademicSemesterRoute } from './app/module/academicSemester/academicSemester.route';
import { FacultyRoute } from './app/module/academicFaculty/academicFaculty.Route';
import { departmentRouter } from './app/module/academicDepartment/academicDepartment.Route';
const app: Application = express();
app.use(cors());

// parse

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
app.use('/api/v1/user', UserRouter);
app.use('/api/v1/crete-academic', AcademicSemesterRoute);
app.use('/api/v1/update-semester', AcademicSemesterRoute);
app.use('/api/v1/get-academic', AcademicSemesterRoute);
app.use('/api/v1/delete', AcademicSemesterRoute);
app.use('/api/v1/page', AcademicSemesterRoute);
app.use('/api/v1/faculty', FacultyRoute);
app.use('/api/v1/faculty-update', FacultyRoute);
app.use('/api/v1/getFaculty', FacultyRoute);
app.use('/api/v1/facultyId', FacultyRoute);
app.use('/api/v1/delete-Faculty', FacultyRoute);
app.use('/api/v1/department', departmentRouter);
app.use('/api/v1/getall', departmentRouter);
app.use('/api/v1/update-department', departmentRouter);
app.use('/api/v1/get-single-department', departmentRouter);
app.use('/api/v1/delete-department', departmentRouter);

app.use(globalErrorHandler);
export default app;

// testing error
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   throw new ApiError(400, 'custom error')
//   //   next('ore baa')
// })

// global error middleware | global error handler
// app.use((err, req: Request, res: Response, next: NextFunction) => {
//   // console.log(err)
//   if (err instanceof Error) {
//     res.status(400).json({ error: err })
//   } else {
//     res.status(200).json({ error: 'something went wrong' })
//   }
// })
