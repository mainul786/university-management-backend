import { model, Schema, Types } from 'mongoose';
import { TCourseMarks, TEnrolledCourse } from './EnrolledCouser.interface';
import { Grade } from './EnrolledCourse.constant';

const courseMarksSchema = new Schema<TCourseMarks>({
  classTest1: {
    type: Number,
    default: 0,
  },
  midterm: {
    type: Number,
    default: 0,
  },
  classTest: {
    type: Number,
    default: 0,
  },
  finalTerm: {
    type: Number,
    default: 0,
  },
});

const enrolledCourseSchema = new Schema<TEnrolledCourse>({
  semesterRegistration: {
    type: Schema.Types.ObjectId,
    ref: 'semesterRegistration',
    required: true,
  },
  academicSemester: {
    type: Schema.Types.ObjectId,
    ref: 'academicSemester',
    required: true,
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    ref: 'faculty',
    required: true,
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    ref: 'academicDepartment',
    required: true,
  },
  offeredCourse: {
    type: Schema.Types.ObjectId,
    ref: 'offeredCourse',
    required: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'course',
    required: true,
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: 'student',
    required: true,
  },
  isEnrolled: {
    type: Boolean,
    default: false,
  },
  courseMarks: {
    type: courseMarksSchema,
  },
  grade: {
    type: String,
    enum: Grade,
    default: 'NA',
  },
  gradePoints: {
    type: Number,
    min: 0,
    max: 4,
    default: 0,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const EnrolledCourse = model<TEnrolledCourse>(
  'EnrolledCourse',
  enrolledCourseSchema,
);
export default EnrolledCourse;
