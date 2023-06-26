import { SortOrder } from 'mongoose';
import { IPagination } from '../../../Shared/Pagination/Pagination.type';
import { calculatePagination } from '../../../Shared/Pagination/PaginationCalculatel';
import { department } from './academicDepartment.Model';
import { IAcademicDepartment } from './academicDepartment.interface';
import { departmentSearch } from '../../../Shared/SearchField/SerchFields.Constent';
import { SearchFieldType } from '../../../Shared/SearchField/SerchField.type';

const createDepartments = async (data: IAcademicDepartment) => {
  const result = (await department.create(data)).populate('academicFaculty');
  return result;
};

// get all department
const getAllDepartments = async (
  filter: SearchFieldType,
  pagination: IPagination
) => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(pagination);
  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const { searchTerm, ...filterData } = filter;

  const andCondition = [];

  // search term
  if (searchTerm) {
    andCondition.push({
      $or: departmentSearch.map(field => ({
        [field]: { $regex: searchTerm, $paginationOptions: 'i' },
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

  // solve search problems
  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
  const result = await department
    .find(whereCondition)
    .populate('academicFaculty')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  console.log(result);
  const total = await department.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateDepartment = async (id: string, data: IAcademicDepartment) => {
  const result = await department
    .findByIdAndUpdate(id, data, { new: true })
    .populate('academicFaculty');
  return result;
};

const getSingleDepartment = async (id: string) => {
  const result = await department.findById(id).populate('academicFaculty');
  return result;
};

const deleteDepartment = async (id: string) => {
  const result = await department
    .findByIdAndDelete(id)
    .populate('academicFaculty');
  return result;
};

export const AcademicDepartment = {
  createDepartments,
  updateDepartment,
  getSingleDepartment,
  getAllDepartments,
  deleteDepartment,
};
