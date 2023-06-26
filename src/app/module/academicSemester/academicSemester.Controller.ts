import { NextFunction, Request, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import httpStatus from 'http-status';
import pick from '../../../Shared/Pagination/pick';
import { paginationKey } from '../../../Shared/Pagination/Constent';
import { filterControllerKey } from '../../../Shared/SearchField/SerchFields.Constent';

const AcademicSemesterIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const academicSemesterData = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    );
    console.log(result);

    res.status(200).json({
      success: true,
      message: 'Academic Semester created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateAcademicSemesterController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const result = await AcademicSemesterService.updateAcademicSemester(
      id,
      updateData
    );
    res.status(200).json({
      success: true,
      message: 'Updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const paginationController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filter = pick(req.query, filterControllerKey);
    const pagination = pick(req.query, paginationKey);

    const result = await AcademicSemesterService.getByPaginationService(
      filter,
      pagination
    );

    res.status(httpStatus.OK).json({
      success: true,
      message: 'Successfully get pagination',
      meta: result,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleSemesterController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const result = await AcademicSemesterService.getSingleSemesterService(id);
    res.status(httpStatus.OK).json({
      success: true,
      message: 'Academic single Semester got it successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteSemesterController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const result = await AcademicSemesterService.deleteAcademicSemester(id);
    console.log(result, 'controller');
    res.status(200).json({
      success: true,
      message: 'delete successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const AcademicSemesterController = {
  AcademicSemesterIdController,
  updateAcademicSemesterController,
  paginationController,
  getSingleSemesterController,
  deleteSemesterController,
};
