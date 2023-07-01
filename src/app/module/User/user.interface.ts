import { Model, Types } from 'mongoose';
import { IStudent } from '../Student/Student.interface';
import { IFaculty } from '../Faculty/Faculty.interface';
import { IAdmin } from '../Admin/Admin.interface';

export type IUser = {
  id: string;
  role: string;
  password: string;
  needsPasswordChange: true | false;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId | IFaculty;
  admin?: Types.ObjectId | IAdmin;
};

// Create a new Model type that knows about IUserMethods...
/* // Create a new Model type that knows about IUserMethods...
type UserModel = Model<IUser, {here need Query Helper Methods => https://codeigniter.com/user_guide/database/helpers.html}, this is static method function when need we are use static method IUserMethods>; */
// type UserModel = Model<userIdType, object>
export type UserModel = Model<IUser, object>;
