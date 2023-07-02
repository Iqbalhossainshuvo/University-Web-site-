/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { UserModel, IUser, IUserMethods } from './user.interface';
import config from '../../../config';


// And a schema that knows about IUserMethods
// export const UserIdSchema = new Schema<IUser, UserModel>({
//   id: { type: String, required: true, unique: true },
//   role: { type: String, required: true, unique: true },
//   password: { type: String, required: true, unique: true },
// })

const UserIdSchema = new Schema<IUser, Record<string, never>, IUserMethods>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select:0
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  {
    timestamps: true,
  }
);

UserIdSchema.methods.isUserExist = async function (id:string){
  const user = await users.findOne({id}, {id:1, password:1, needsPasswordChange:1})
  return user
}

// hash passwords
UserIdSchema.pre('save', async function (next){
  const user = this 
  user.password = await bcrypt.hash(user.password,
    Number(config.hash_password))
    next();
})

/* database collection this called modal, here 'User' is database collection name */
export const users = model<IUser, UserModel>('User', UserIdSchema);
