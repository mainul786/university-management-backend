import { startSession } from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../AcadmicSemester/AcademicSemester.model';
import { TStudent } from '../Student/Student.interface';
import { Student } from '../Student/Student.model';
import { TUser } from './User.interface';
import { User } from './User.model';
import { generateStudentId } from './User.utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createStudentFromDB = async (password: string, payload: TStudent) => {
  // create a object
  const userData: Partial<TUser> = {};
  // set roll
  userData.role = 'student';

  //   password set
  userData.password = password || (config.default_password as string);

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload?.admissionSemester,
  );

  // default  set id
  // userData.id = '203010001';

  const session = await startSession();

  try {
    session.startTransaction();
    userData.id = await generateStudentId(admissionSemester);

    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Your request is invalid!');
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to create new student!',
      );
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to create student');
  }
};

export const UserServices = {
  createStudentFromDB,
};
