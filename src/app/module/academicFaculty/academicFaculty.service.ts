import { SortOrder } from 'mongoose';
import { IPagination } from '../../../Shared/Pagination/Pagination.type';
import { calculatePagination } from '../../../Shared/Pagination/PaginationCalculatel';
import { AcademicFaculty } from './academicFaculty.Model';
import { IAcademicFaculty } from './academicFaculty.interface';
import { SearchFieldType } from '../../../Shared/SearchField/SerchField.type';
import { FacultySearch } from '../../../Shared/SearchField/SerchFields.Constent';

const createFaculty = async (
  data: IAcademicFaculty
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.create(data);
  return result;
};

const getAllFaculty = async (
  filter: SearchFieldType,
  getPagination: IPagination
) => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(getPagination);
  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const { searchTerm, ...filterData } = filter;

  const andCondition = [];

  // search term
  if (searchTerm) {
    andCondition.push({
      $or: FacultySearch.map(field => ({
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

  const result = await AcademicFaculty.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await AcademicFaculty.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleFaculty = async (id: string) => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

const UpdateFaculty = async (id: string, data: IAcademicFaculty) => {
  const result = await AcademicFaculty.findByIdAndUpdate(id, data, {
    new: true,
  });
  return result;
};

const deleteFaculty = async (id: string) => {
  const result = await AcademicFaculty.findByIdAndDelete(id);
  return result;
};

export const FacultyService = {
  createFaculty,
  getAllFaculty,
  getSingleFaculty,
  UpdateFaculty,
  deleteFaculty,
};
