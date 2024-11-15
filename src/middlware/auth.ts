import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { decode, JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/User/User.interface';
import { User } from '../modules/User/User.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'you are not authorized');
    }

    //token verify

    const decoded = jwt.verify(
      token,
      config.jwt_accessSecret as string,
    ) as JwtPayload;

    const { role, userId, iat } = decoded;

    // Check user is exists or block

    const user = await User.isUserExistsByCustomId(userId);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'user not found!');
    }

    //check user is blocked
    const userStatus = user?.status;
    if (userStatus === 'blocked') {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'you are not authorized person.',
      );
    }

    //check user is deleted
    const userIsDeleted = user?.isDeleted;
    if (userIsDeleted) {
      throw new AppError(httpStatus.NOT_FOUND, 'user is not found!');
    }

    if (
      user.passwordChangeAt &&
      User.isJWTIssuedBeforePasswordChange(user.passwordChangeAt, iat as number)
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'you are not authorize!');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};
export default auth;
