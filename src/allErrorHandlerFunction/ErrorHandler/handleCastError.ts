import mongoose from 'mongoose';
import { IGenericErrorMessage } from '../ErrorInterfaces/error';

const handleCastError = (error: mongoose.Error.CastError) => {
  const errors: IGenericErrorMessage[] = [
    {
      path: error.path,
      message: error.message,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'cast error',
    errorMessage: errors,
  };
};

export default handleCastError;
