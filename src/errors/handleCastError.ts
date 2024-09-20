import { Error } from 'mongoose';
import { TErrorSources, TGenericResponse } from '../interface/error';

const handleCastError = (err: Error.CastError): TGenericResponse => {
  const errorSources: TErrorSources = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: 'Invalid Id',
    errorSources: errorSources,
  };
};

export default handleCastError;
