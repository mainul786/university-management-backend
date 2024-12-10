import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { OfferedCourse } from '../OfferedCourse/OfferedCourse.model';
import { TEnrolledCourse } from './EnrolledCouser.interface';
import EnrolledCourse from './EnrolledCourse.model';
import { Student } from '../Student/Student.model';

const createEnrolledCourseIntoDB = async (
  userId: string,
  payload: TEnrolledCourse,
) => {
  // step-1: check the offered course is exists.
  //step-2: check if the student is already enrolled.
  //step-3: create an enrolled course

  const { offeredCourse } = payload;
  const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse);
  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered course do not exists!');
  }

  if (isOfferedCourseExists?.maxCapacity <= 0) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Room is full!');
  }

  const student = await Student.findOne({ id: userId }).select('id');
  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, 'student not found!');
  }
  const isStudentAlreadyEnrolled = await EnrolledCourse.findOne({
    semesterRegistration: isOfferedCourseExists?.semesterRegistration,
    offeredCourse,
    student: student._id,
  });

  if (isStudentAlreadyEnrolled) {
    throw new AppError(httpStatus.CONFLICT, 'student already register!');
  }
};

export const enrolledCourseServices = {
  createEnrolledCourseIntoDB,
};
