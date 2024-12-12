import { Types } from 'mongoose';
import { Faculty } from './../Faculty/Faculty.model';

export type TGrade = 'A' | 'B' | 'C' | 'D' | 'F' | 'NA';

export type TCourseMarks = {
  classTest1: number;
  midterm: number;
  classTest: number;
  finalTerm: number;
};

export type TEnrolledCourse = {
  semesterRegistration: Types.ObjectId;
  academicSemester: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  offeredCourse: Types.ObjectId;
  course: Types.ObjectId;
  student: Types.ObjectId;
  faculty: Types.ObjectId;
  isEnrolled: boolean;
  courseMarks: TCourseMarks;
  grade: TGrade;
  gradePoints: number;
  isCompleted: boolean;
};
