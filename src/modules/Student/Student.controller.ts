import { Request, Response } from 'express';
import { StudentServices } from './Student.service';
import studentValidationSchema from './Student.validation';

const createStudentController = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    const validationData = studentValidationSchema.parse(studentData);
    const result = await StudentServices.createStudent(validationData);
    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Somethings went is wrong!',
      error,
    });
  }
};

const getAllStudent = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();
    res.status(200).json({
      success: true,
      message: 'Student is retrived successfully!',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(studentId);
  res.status(200).json({
    success: true,
    message: 'Single student is retrived success fully!',
    data: result,
  });
};

export const StudentController = {
  createStudentController,
  getAllStudent,
  getSingleStudent,
};
