import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { decode, JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/User/User.interface';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'you are not authorized');
    }

    jwt.verify(
      token,
      config.jwt_accessSecret as string,
      function (err, decoded) {
        if (err) {
          throw new AppError(httpStatus.UNAUTHORIZED, 'you are not authorize!');
        }

        const role = (decoded as JwtPayload)?.role;
        if (requiredRoles && !requiredRoles.includes(role)) {
          throw new AppError(httpStatus.UNAUTHORIZED, 'you are not authorize!');
        }

        req.user = decoded as JwtPayload;
        next();
      },
    );
  });
};
export default auth;
