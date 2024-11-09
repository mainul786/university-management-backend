import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../User/User.model';
import { TLoginUser } from './Auth.interface';
import jwt from 'jsonwebtoken';
import config from '../../config/index';

const loginUser = async (payload: TLoginUser) => {
  //if check the user is exists or not
  const user = await User.isUserExistsByCustomId(payload?.id);

  if (!user) {
    throw new AppError(httpStatus.FORBIDDEN, 'User does not exists!');
  }

  // if the user is delete or not
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'you can`t login');
  }

  //if check the user is blocked or not
  const userStatus = user?.status;
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'user already blocked!');
  }

  // if checking the password is correct or not

  if (!(await User.isPasswordMatched(payload?.password, user.password))) {
    throw new AppError(httpStatus.NOT_FOUND, 'unAuthrization access!');
  }

  // implementation for jwt
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_accessSecret as string, {
    expiresIn: '10d',
  });

  return {
    accessToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

export const LoginUserServices = {
  loginUser,
};
