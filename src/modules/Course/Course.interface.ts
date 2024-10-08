import { Types } from 'mongoose';

export type TPreRequistieCoureses = {
  course: Types.ObjectId;
  isDeleted: boolean;
};

export type TCourse = {
  title: string;
  prefix: string;
  code: string;
  credits: number;
  isDeleted: boolean;
  preRequisiteCourses: [TPreRequistieCoureses];
};

export type TCourseFaculty = {
  course: Types.ObjectId;
  faculties: [Types.ObjectId];
};
