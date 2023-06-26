import express from 'express';
import { UserController } from './user.controller';
import { UserValidation } from '../../../allErrorHandlerFunction/validation/userValidation/user.validation';
import validateRequest from '../../../allErrorHandlerFunction/validation/validateReqest';

const router = express.Router();

router.post(
  '/crete-user',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.userCreateId
);

export const UserRouter = router;
