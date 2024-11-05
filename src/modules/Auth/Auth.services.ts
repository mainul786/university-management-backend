import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../User/User.model';
import { TLoginUser } from './Auth.interface';
import bcrypt from 'bcrypt';

const loginUser = async (payload: TLoginUser) => {
  //if check the user is exists or not
  const user = await User.isUserExistsByCustomId(payload?.id);

  if (!user) {
    throw new AppError(httpStatus.FORBIDDEN, 'User does not exists!');
  }

  // // if the user is delete or not
  // const isDeleted = isUserExists?.isDeleted;
  // if (isDeleted) {
  //   throw new AppError(httpStatus.NOT_FOUND, 'you can`t login');
  // }

  // //if check the user is blocked or not
  // const userStatus = isUserExists?.status;
  // if (userStatus === 'blocked') {
  //   throw new AppError(httpStatus.FORBIDDEN, 'user already blocked!');
  // }

  // if checking the password is correct or not

  if (!(await User.isPasswordMatched(payload?.password, user.password))) {
    throw new AppError(httpStatus.NOT_FOUND, 'unAuthrization access!');
  }
};

export const LoginUserServices = {
  loginUser,
};
