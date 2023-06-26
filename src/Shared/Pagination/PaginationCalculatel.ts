import { SortOrder } from 'mongoose';

type IPageQuery = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
};

// returns type
type IPageQueryReturnType = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: SortOrder;
};

export const calculatePagination = (
  parameter: IPageQuery
): IPageQueryReturnType => {
  const page = Number(parameter.page || 1);
  const limit = Number(parameter.limit || 10);

  const skip = (page - 1) * limit;

  // sort=> sortBy=> 'createdAt'  sort order => ascending or descending

  const sortBy = parameter.sortBy || 'createdAt';
  const sortOrder = parameter.sortOrder || 'asc';

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};
