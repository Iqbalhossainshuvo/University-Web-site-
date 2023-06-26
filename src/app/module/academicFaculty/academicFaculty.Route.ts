import express from 'express';
import { FacultyController } from './academicFaculty.Controller';
import { FacultyZod } from '../../../allErrorHandlerFunction/validation/FacultyValidation/FacultyValidation';
import validateRequest from '../../../allErrorHandlerFunction/validation/validateReqest';

const router = express.Router();

router.post(
  '/create',
  validateRequest(FacultyZod.createFacultyZodSchema),
  FacultyController.createFaculty
);

router.patch(
  '/:id',
  validateRequest(FacultyZod.UpdateFacultyZodSchema),
  FacultyController.UpdateFaculty
);
router.get('/getAll', FacultyController.getAllFaculty);
router.get('/:id', FacultyController.getSingleFaculty);
router.delete('/:id', FacultyController.deleteFaculty);

export const FacultyRoute = router;
