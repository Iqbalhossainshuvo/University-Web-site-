import httpStatus from 'http-status';
import { AcademicSemesterCodeMapper } from '../../../AllConstent/AcademicSemesterConstent/AcademicConstant';
import ApiError from '../../../allErrorHandlerFunction/ApiError/ApiError';
import { AcademicSemester } from './academicSemester.Model';
import { IAcademicSemester } from './academicSemester.interface';
import {
  IPagination,
  dependOnIAcademicData,
} from '../../../Shared/Pagination/Pagination.type';
import { calculatePagination } from '../../../Shared/Pagination/PaginationCalculatel';
import { SortOrder } from 'mongoose';
import { SearchFieldType } from '../../../Shared/SearchField/SerchField.type';
import { academicDataSearchTerm } from '../../../Shared/SearchField/SerchFields.Constent';

const createSemester = async (
  data: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (AcademicSemesterCodeMapper[data.title] !== data.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code');
  }
  const result = await AcademicSemester.create(data);
  return result;
};

// pagination

const getByPaginationService = async (
  filter: SearchFieldType,
  getPagination: IPagination
): Promise<dependOnIAcademicData<IAcademicSemester[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(getPagination);
  // sort
  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  // const academicDataSearchTerm = ['title', 'code', 'year'];
  const { searchTerm, ...filterData } = filter;

  const andCondition = [];

  // search term
  if (searchTerm) {
    andCondition.push({
      $or: academicDataSearchTerm.map(field => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    });
  }

  // extract matching
  if (Object.keys(filterData).length) {
    andCondition.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // solve searching problem
  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

  const results = await AcademicSemester.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await AcademicSemester.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: results,
  };
};

const getSingleSemesterService = async (id: string) => {
  const results = await AcademicSemester.findById(id);
  return results;
};

const updateAcademicSemester = async (
  id: string,
  payload: Partial<IAcademicSemester>
) => {
  if (
    payload.title &&
    payload.code &&
    AcademicSemesterCodeMapper[payload.title] !== payload.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code');
  }
  const results = await AcademicSemester.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true }
  );
  return results;
};
const deleteAcademicSemester = async (id: string) => {
  const results = await AcademicSemester.findByIdAndDelete(id);

  return results;
};

export const AcademicSemesterService = {
  createSemester,
  updateAcademicSemester,
  getByPaginationService,
  getSingleSemesterService,
  deleteAcademicSemester,
};

// const createSemester = async (
//   payload: IAcademicSemester
// ): Promise<IAcademicSemester> => {
//   if (AcademicSemesterCodeMapper[payload.title] !== payload.code) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code');
//   }
//   console.log(payload.title);
//   const result = await AcademicSemester.create(payload);
//   console.log(result);
//   return result;
// };
