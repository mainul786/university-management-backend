import { Error } from 'mongoose';
import { TErrorSources } from '../interface/error';

const handleValidationError = (err: Error.ValidationError) => {
  const errorSources: TErrorSources = Object.values(err.errors).map(
    (val: Error.ValidatorError | Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    },
  );
  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation error',
    errorSources,
  };
};

export default handleValidationError;
