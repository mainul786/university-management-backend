import { ModifiedPathsSnapshot, startSession } from 'mongoose';
import { Student } from './Student.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../User/User.model';
import { TStudent } from './Student.interface';

const getAllStudentFromDB = async () => {
  const result = await Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  // console.log(id);
  // const result = await Student.aggregate([{ $match: { id } }]);
  // console.log(result);
  return result;
};

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGrudian, ...remaningStudentData } = payload;

  //non-primitive value update code line no 32 theke line no. 52
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remaningStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGrudian && Object.keys(localGrudian).length) {
    for (const [key, value] of Object.entries(localGrudian)) {
      modifiedUpdatedData[`localGrudian.${key}`] = value;
    }
  }
  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await startSession();
  try {
    session.startTransaction();
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to deleted student');
    }

    const userDeleted = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!userDeleted) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to user delete');
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete student');
  }
};

export const StudentServices = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB,
};
