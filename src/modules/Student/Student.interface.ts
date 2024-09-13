import { Model, Types } from 'mongoose';

export type TGurdian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TLocalGurdian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};
export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TStudent = {
  id: string;
  user: Types.ObjectId;
  name: TUserName;
  gender: 'Male' | 'Female';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emargencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  parmenatAddress: string;
  guardian: TGurdian;
  localGrudian: TLocalGurdian;
  admissionSemester: Types.ObjectId;
  profileImg?: string;
};

export type studentMethod = {
  isUserExists(id: string): Promise<TStudent | null>;
};

export type StudentModel = Model<TStudent, {}, studentMethod>;
