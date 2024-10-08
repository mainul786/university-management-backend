import { model, Schema, Types } from 'mongoose';
import {
  TCourse,
  TCourseFaculty,
  TPreRequistieCoureses,
} from './Course.interface';

const preRequisiteCoursesSchema = new Schema<TPreRequistieCoureses>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const courseSchema = new Schema<TCourse>(
  {
    title: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    prefix: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      trim: true,
      required: true,
    },
    credits: {
      type: Number,
      trim: true,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    preRequisiteCourses: [preRequisiteCoursesSchema],
  },
  {
    timestamps: true,
  },
);

export const Course = model<TCourse>('Course', courseSchema);

const assignCourseFaculties = new Schema<TCourseFaculty>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    unique: true,
  },
  faculties: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
  ],
});

export const CourseFaculty = model<TCourseFaculty>(
  'CourseFaculty',
  assignCourseFaculties,
);
