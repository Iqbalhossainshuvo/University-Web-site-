import { NextFunction, Request, Response } from 'express';
import { AcademicDepartment } from './academicDepartment.service';
import pick from '../../../Shared/Pagination/pick';
import { paginationKey } from '../../../Shared/Pagination/Constent';
import { filterControllerKey } from '../../../Shared/SearchField/SerchFields.Constent';

const createDepartments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const result = await AcademicDepartment.createDepartments(data);

    res.status(200).json({
      success: true,
      message: 'departments created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllDepartments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const query = {};
    // const result = await AcademicDepartment.getAllDepartments(query);
    const filter = pick(req.query, filterControllerKey);
    const pagination = pick(req.query, paginationKey);
    const result = await AcademicDepartment.getAllDepartments(
      filter,
      pagination
    );

    res.status(200).json({
      success: true,
      message: 'get all department successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await AcademicDepartment.updateDepartment(id, data);

    res.status(200).json({
      success: true,
      message: 'updated department successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const result = await AcademicDepartment.getSingleDepartment(id);

    res.status(200).json({
      success: true,
      message: 'getSingleDepartment successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const result = await AcademicDepartment.deleteDepartment(id);

    res.status(200).json({
      success: true,
      message: 'Department deleted successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const departmentController = {
  createDepartments,
  updateDepartment,
  getSingleDepartment,
  getAllDepartments,
  deleteDepartment,
};
