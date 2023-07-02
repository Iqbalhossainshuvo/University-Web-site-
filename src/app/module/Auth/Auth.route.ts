import express from 'express';
import validateRequest from '../../../allErrorHandlerFunction/validation/validateReqest';
import { loginValidation } from '../../../allErrorHandlerFunction/validation/AuthValidation/Auth.validatio';
import { loginController } from './Auth.controller';


const router = express.Router()


router.post('/login', validateRequest(loginValidation.loginZodValidation),loginController.login )



export const loginRoute = router