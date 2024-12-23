import {
  TAcademicSemesterCode,
  TAcademicSemesterCodeNameMapper,
  TAcademicSemesterName,
  TMonths,
} from './AcademicSemeter.interface';

export const Months: TMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const AcademicSemesterName: TAcademicSemesterName[] = [
  'Autumn',
  'Summer',
  'Fall',
];

export const AcademicSemesterCode: TAcademicSemesterCode[] = ['01', '02', '03'];

export const academicSemestercodeNameMapper: TAcademicSemesterCodeNameMapper = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};
