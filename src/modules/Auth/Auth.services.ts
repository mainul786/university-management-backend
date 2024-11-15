import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../User/User.model';
import { TLoginUser } from './Auth.interface';
import { JwtPayload } from 'jsonwebtoken';
import config from '../../config/index';
import bcrypt from 'bcrypt';
import { createToken } from './Auth.utils';

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

  const accessToken = createToken(
    jwtPayload,
    config.jwt_accessSecret as string,
    config.jwt_accessExpiresIn as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refreshSecret as string,
    config.jwt_refreshExpiresIn as string,
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

const passwordChange = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  //check user exists or not
  const user = await User.isUserExistsByCustomId(userData.userId);
  if (!user) {
    throw new AppError(httpStatus.FORBIDDEN, 'User does not exists!');
  }

  // user is blocked or not
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'user already blocked!');
  }

  //check user is deleted or not
  const userDeleted = user?.isDeleted;
  if (userDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'user not found!');
  }

  //checking password is matched or not
  if (!(await User.isPasswordMatched(payload?.oldPassword, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password does not matched!');
  }

  //hashed password
  const newHashedPassword = await bcrypt.hash(
    payload?.newPassword,
    Number(config.salt_round),
  );

  await User.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangeAt: new Date(),
    },
  );

  return null;
};

export const AuthServices = {
  loginUser,
  passwordChange,
};
