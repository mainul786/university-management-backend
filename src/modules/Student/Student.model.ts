import { model, Schema } from 'mongoose';
import {
  studentMethod,
  TGurdian,
  TLocalGurdian,
  TStudent,
  TUserName,
  StudentModel,
} from './Student.interface';

const userSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: [20, 'First Name can`t be more than 20 charecter'],
    validate: function (value: string) {
      const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
      return firstNameStr === value;
    },
  },
  middleName: { type: String },
  lastName: { type: String, require: true },
});
const gurdianSchema = new Schema<TGurdian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});
const localGrudianSchema = new Schema<TLocalGurdian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});
const studentSchema = new Schema<TStudent, StudentModel, studentMethod>({
  id: { type: String },
  name: {
    type: userSchema,
    required: [true, 'name is  required'],
  },
  gender: { type: String, required: true, enum: ['Male', 'Female'] },
  dateOfBirth: { type: String, required: true },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  emargencyContactNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  presentAddress: { type: String, required: true },
  parmenatAddress: { type: String, required: true },
  guardian: gurdianSchema,
  localGrudian: localGrudianSchema,
  profileImg: { type: String, required: true },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
  },
});

studentSchema.methods.isUserExists = async function (id: string) {
  const existsUser = await Student.findOne({ id });
  return existsUser;
};

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
