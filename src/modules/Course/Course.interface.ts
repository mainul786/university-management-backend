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
  preRequisiteCourses: [];
};
