import { Schema, model } from 'mongoose'
import { UserModel, userIdType } from './user.interface'

// And a schema that knows about IUserMethods
// export const UserIdSchema = new Schema<userIdType, UserModel>({
//   id: { type: String, required: true, unique: true },
//   role: { type: String, required: true, unique: true },
//   password: { type: String, required: true, unique: true },
// })

const UserIdSchema = new Schema<userIdType>(
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
  },
  {
    timestamps: true,
  }
)

/* database collection this called modal, here 'User' is database collection name */
export const users = model<userIdType, UserModel>('User', UserIdSchema)
