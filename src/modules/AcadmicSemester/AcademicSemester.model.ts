import { model, Schema } from 'mongoose';

import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from './AcademicSemester.constant';
import { TAcademicSemester } from './AcademicSemeter.interface';

const academicSemeterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: AcademicSemesterName,
      required: true,
    },
    code: {
      type: String,
      enum: AcademicSemesterCode,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      enum: Months,
    },
    endMonth: {
      type: String,
      enum: Months,
    },
  },
  {
    timestamps: true,
  },
);

academicSemeterSchema.pre('save', async function (next) {
  const isSemesterExists = await AcademicSemester.findOne({
    name: this.name,
    year: this.year,
  });

  if (isSemesterExists) {
    throw new Error('Semester Already Exits!');
  }
  next();
});

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemeterSchema,
);
