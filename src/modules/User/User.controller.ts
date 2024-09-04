import { Request, Response } from 'express';
import { UserServices } from './User.services';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { password, studentData } = req.body;

    const result = await UserServices.createStudentFromDB(
      password,
      studentData,
    );
    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Somethings went is wrong!',
      error,
    });
  }
};

export const UserController = {
  createStudent,
};
