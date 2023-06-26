import express from 'express';
import { departmentController } from './academicDepartment.Controller';
import validateRequest from '../../../allErrorHandlerFunction/validation/validateReqest';
import { DepartmentZodSchema } from '../../../allErrorHandlerFunction/validation/department/academicDeaprtmentZodValidation';

const router = express.Router();
router.post(
  '/create',
  validateRequest(DepartmentZodSchema.createDepartmentsZodSchema),
  departmentController.createDepartments
);
router.get('/department', departmentController.getAllDepartments);

router.patch(
  '/:id',
  validateRequest(DepartmentZodSchema.updateDepartmentsZodSchema),
  departmentController.updateDepartment
);

router.get('/:id', departmentController.getSingleDepartment);
router.delete('/:id', departmentController.deleteDepartment);
export const departmentRouter = router;
