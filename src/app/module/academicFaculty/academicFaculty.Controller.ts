import { NextFunction, Request, Response } from 'express';
import { FacultyService } from './academicFaculty.service';
import pick from '../../../Shared/Pagination/pick';
import { paginationKey } from '../../../Shared/Pagination/Constent';
import { FacultyFilterKey } from '../../../Shared/SearchField/SerchFields.Constent';

const createFaculty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { ...academicFacultyData } = req.body;
    const result = await FacultyService.createFaculty(academicFacultyData);

    res.status(200).json({
      success: true,
      message: 'Faculty created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllFaculty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filter = pick(req.query, FacultyFilterKey);
    const pagination = pick(req.query, paginationKey);
    // const query = {};
    // const result = await FacultyService.getAllFaculty(query );
    const result = await FacultyService.getAllFaculty(filter, pagination);

    res.status(200).json({
      success: true,
      message: 'All Faculty successfully getting',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleFaculty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const result = await FacultyService.getSingleFaculty(id);
    res.status(200).json({
      success: true,
      message: 'get single Faculty',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const UpdateFaculty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await FacultyService.UpdateFaculty(id, data);
    res.status(200).json({
      success: true,
      message: 'Updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteFaculty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const result = await FacultyService.deleteFaculty(id);

    res.status(200).json({
      success: true,
      message: 'Faculty deleted successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const FacultyController = {
  createFaculty,
  getAllFaculty,
  getSingleFaculty,
  UpdateFaculty,
  deleteFaculty,
};
