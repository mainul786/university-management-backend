import { model, Schema, Types } from 'mongoose';
import {
  TEnrolledCourseMarks,
  TEnrolledCourse,
} from './EnrolledCouser.interface';
import { Grade } from './EnrolledCourse.constant';

const courseMarksSchema = new Schema<TEnrolledCourseMarks>({
  classTest1: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },
  midTerm: {
    type: Number,
    min: 0,
    max: 30,
    default: 0,
  },
  classTest2: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },
  finalTerm: {
    type: Number,
    min: 0,
    max: 50,
    default: 0,
  },
});

const enrolledCourseSchema = new Schema<TEnrolledCourse>(
  {
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
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'faculty',
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
      default: {},
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
  },
  {
    timestamps: true,
  },
);

const EnrolledCourse = model<TEnrolledCourse>(
  'EnrolledCourse',
  enrolledCourseSchema,
);
export default EnrolledCourse;
