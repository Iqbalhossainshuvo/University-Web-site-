import { Schema, model } from 'mongoose';
import { UserModel, IUser } from './user.interface';

// And a schema that knows about IUserMethods
// export const UserIdSchema = new Schema<IUser, UserModel>({
//   id: { type: String, required: true, unique: true },
//   role: { type: String, required: true, unique: true },
//   password: { type: String, required: true, unique: true },
// })

const UserIdSchema = new Schema<IUser>(
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

/* database collection this called modal, here 'User' is database collection name */
export const users = model<IUser, UserModel>('User', UserIdSchema);
