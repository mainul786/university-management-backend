import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { OfferedCourse } from '../OfferedCourse/OfferedCourse.model';
import { TEnrolledCourse } from './EnrolledCouser.interface';
import EnrolledCourse from './EnrolledCourse.model';
import { Student } from '../Student/Student.model';
import { startSession } from 'mongoose';
import { SemesterRegistration } from '../SemesterRegistration/SemisterRegistration.model';
import { Course } from '../Course/Course.model';

const createEnrolledCourseIntoDB = async (
  userId: string,
  payload: TEnrolledCourse,
) => {
  // step-1: check the offered course is exists.
  //step-2: check if the student is already enrolled.
  //step-3: Check if the max credits exceed
  //step-4: create an enrolled course

  const { offeredCourse } = payload;
  const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse);
  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered course do not exists!');
  }

  const course = await Course.findById(isOfferedCourseExists.course);
  const currentCredit = course?.credits;

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

  //check total credits exceeds maxcredit

  const semesterRegistration = await SemesterRegistration.findById(
    isOfferedCourseExists.semesterRegistration,
  ).select('maxCredit');

  const maxCredit = semesterRegistration?.maxCredit;

  // Total enroll credits + new Enroll course credit>maxCredit
  const enrolledCourses = await EnrolledCourse.aggregate([
    {
      $match: {
        semesterRegistration: isOfferedCourseExists.semesterRegistration,
        student: student._id,
      },
      $lookup: {
        from: 'course',
        localField: 'course',
        foreignField: '_id',
        as: 'enrolledCourseData',
      },
    },
    {
      $unwind: '$enrolledCourseData',
    },
    {
      $group: {
        _id: null,
        totalEnrolledCredits: { $sum: '$enrolledCourseData' },
      },
    },
    {
      $project: {
        _id: 0,
        totalEnrolledCredits: 1,
      },
    },
  ]);

  const totalCredits =
    enrolledCourses.length > 0 ? enrolledCourses[0].totalEnrolledCredits : 0;

  if (totalCredits && maxCredit && totalCredits + currentCredit > maxCredit) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You have exceeded maximum number of credits!',
    );
  }

  const session = await startSession();
  try {
    session.startTransaction();
    const result = await EnrolledCourse.create(
      [
        {
          semesterRegistration: isOfferedCourseExists.semesterRegistration,
          academicSemester: isOfferedCourseExists.academicSemester,
          academicFaculty: isOfferedCourseExists.academicFaculty,
          academicDepartment: isOfferedCourseExists.academicDepartment,
          offeredCourse: offeredCourse,
          course: isOfferedCourseExists.course,
          student: student._id,
          faculty: isOfferedCourseExists.faculty,
          isEnrolled: true,
        },
      ],
      { session },
    );

    if (!result) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to enroll in this course!',
      );
    }

    const maxCapacity = isOfferedCourseExists.maxCapacity;
    await OfferedCourse.findByIdAndUpdate(offeredCourse, {
      maxCapacity: maxCapacity - 1,
    });

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const updateEnrolledCourseMarks = async (
  facultyId: string,
  payload: Partial<TEnrolledCourse>,
) => {
  const { semesterRegistration, offeredCourse, student, courseMarks } = payload;

  const isSemesterRegistrationExists =
    await SemesterRegistration.findById(semesterRegistration);
  if (!isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'semesterRegistration does not exists!',
    );
  }

  const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse);
  if (!isOfferedCourseExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'offered course does not exists!',
    );
  }

  const isStudent = await Student.findById(student);
  if (!isStudent) {
    throw new AppError(httpStatus.BAD_REQUEST, 'student does not exists!');
  }
  // const result = await EnrolledCourse.findByIdAndUpdate(facultyId, payload, {
  //   new: true,
  // });
  // return result;
};

export const enrolledCourseServices = {
  createEnrolledCourseIntoDB,
  updateEnrolledCourseMarks,
};
