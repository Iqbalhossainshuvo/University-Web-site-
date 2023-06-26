import express from 'express';
import { createAcademicSemesterZodSchema } from '../../../allErrorHandlerFunction/validation/academicSemesterValidation/academicSemesterZodValidation';
import validateRequest from '../../../allErrorHandlerFunction/validation/validateReqest';
import { AcademicSemesterController } from './academicSemester.Controller';

const router = express.Router();

router.post(
  '/semester',
  validateRequest(createAcademicSemesterZodSchema.academicSemesterZodSchema),
  AcademicSemesterController.AcademicSemesterIdController
);
router.patch(
  '/:id',
  validateRequest(createAcademicSemesterZodSchema.updateSemesterZodSchema),
  AcademicSemesterController.updateAcademicSemesterController
);

router.get(
  '/single-semesters/:id',
  AcademicSemesterController.getSingleSemesterController
);

router.delete('/:id', AcademicSemesterController.deleteSemesterController);

router.get('/pagination', AcademicSemesterController.paginationController);

export const AcademicSemesterRoute = router;
