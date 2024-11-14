import { Model } from 'mongoose';
import { USERROLE } from './User.constant';
export interface TUser {
  id: string;
  password: string;
  needsPasswordChange?: boolean;
  passwordChangeAt?: Date;
  role: 'admin' | 'faculty' | 'student';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}

export interface UserModel extends Model<TUser> {
  isUserExistsByCustomId(id: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USERROLE;
