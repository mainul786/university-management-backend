import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../User/User.model';
import { TLoginUser } from './Auth.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
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

const refreshToken = async (token: string) => {
  //token verify

  const decoded = jwt.verify(
    token,
    config.jwt_refreshSecret as string,
  ) as JwtPayload;

  const { userId, iat } = decoded;

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

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_accessSecret as string,
    config.jwt_accessExpiresIn as string,
  );
  return { accessToken };
};

const forgetPassword = async (id: string) => {
  const user = await User.isUserExistsByCustomId(id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'user does`t found');
  }

  const isUserDeleted = user?.isDeleted;
  if (isUserDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User does`t exists!');
  }

  const isUserBlocked = user?.status;
  if (isUserBlocked === 'blocked') {
    throw new AppError(httpStatus.BAD_REQUEST, 'user does`t exists!');
  }

  const jwtPayload = {
    userId: user?.id,
    role: user?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_accessSecret as string,
    '10m',
  );
  const resetUILink = `http://localhost:3000?id=${user?.id}&token=${accessToken}`;
  console.log(resetUILink);
};

export const AuthServices = {
  loginUser,
  passwordChange,
  refreshToken,
  forgetPassword,
};
