import { NextFunction, Request, Response } from 'express';

const globalErrorHanlaler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode || 500;
  let message = err.message || 'something went is wrong!';
  return res.status(statusCode).json({
    success: false,
    message,
    error: err,
  });
};

export default globalErrorHanlaler;
