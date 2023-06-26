import ApiError from '../../../allErrorHandlerFunction/ApiError/ApiError';
import config from '../../../config/index';
import { userIdType } from './user.interface';
import { users } from './user.model';
import { generateId } from './user.utils';

const createUser = async (user: userIdType): Promise<userIdType | null> => {
  // generate user id
  const id = await generateId();
  user.id = id;

  // set default password
  if (!user.password) {
    user.password = config.default_student_password as string;
  }
  const newUser = users.create(user);
  if (!createUser) {
    throw new ApiError(400, 'Failed to create user');
  }
  return newUser;
};

export const UserService = {
  createUser,
};
