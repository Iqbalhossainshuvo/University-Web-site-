import { Model } from 'mongoose'

export type userIdType = {
  id: string
  role: string
  password: string
}

// Create a new Model type that knows about IUserMethods...
/* // Create a new Model type that knows about IUserMethods...
type UserModel = Model<IUser, {here need Query Helper Methods => https://codeigniter.com/user_guide/database/helpers.html}, this is static method function when need we are use static method IUserMethods>; */
// type UserModel = Model<userIdType, object>
export type UserModel = Model<userIdType, object>
