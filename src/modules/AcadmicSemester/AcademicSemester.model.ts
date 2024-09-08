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

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemeterSchema,
);
