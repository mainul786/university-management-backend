import { Model } from 'mongoose';
import { USERROLE } from './User.constant';
export interface TUser {
  id: string;
  email: string;
  password: string;
  needsPasswordChange?: boolean;
  passwordChangeAt?: Date;
  role: 'superAdmin' | 'admin' | 'faculty' | 'student';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}

export interface UserModel extends Model<TUser> {
  isUserExistsByCustomId(id: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChange(
    passwordChangeTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}

export type TUserRole = keyof typeof USERROLE;
