import { TErrorSources } from '../interface/error';

const handleDuplicateError = (err: any) => {
  const match = err.message.match(/"(^")*"/);
  const exractedMessage = match && match[1];
  const errorSources: TErrorSources = [
    {
      path: '',
      message: exractedMessage,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: `${exractedMessage} is already register`,
    errorSources,
  };
};

export default handleDuplicateError;
