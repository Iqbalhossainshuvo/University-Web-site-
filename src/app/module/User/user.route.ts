import express from 'express';
import { UserController } from './user.controller';



const router = express.Router();

router.post('/createStudent', UserController.userCreateStudent)
export const UserRouter = router;
