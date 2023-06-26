// // service field
// // pagination

// const getByPaginationService = async (
//   getPagination: IPagination
// ): Promise<dependOnIAcademicData<DatabserelateType[]>> => {
//   const { page, limit, skip, sortBy, sortOrder } =
//     calculatePagination(getPagination);
//   // sort
//   const sortCondition: { [key: string]: SortOrder } = {};
//   if (sortBy && sortOrder) {
//     sortCondition[sortBy] = sortOrder;
//   }

//   const results = await databseName
//     .find()
//     .sort(sortCondition)
//     .skip(skip)
//     .limit(limit);

//   const total = await databseName.countDocuments();
//   console.log(results, 'service');
//   return {
//     meta: {
//       page,
//       limit,
//       total,
//     },
//     data: results,
//   };
// };

// // Controller

// const paginationController = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const pagination = pick(req.query, paginationKey);
//     console.log(pagination, 'controller');
//     const result = await AcademicSemesterService.getByPaginationService(
//       pagination
//     );
//     console.log(result, 'controller');
//     res.status(httpStatus.OK).json({
//       success: true,
//       message: 'Successfully get pagination',
//       meta: result,
//       data: result,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // routes same as all other

/* 
//   const sortCondition: { [key: string]: SortOrder } = {};
//   if (sortBy && sortOrder) {
//     sortCondition[sortBy] = sortOrder;
//   }

// now normalize the sort order => sortCondition here

// Declare an empty object called sortConditions. The keys of this object are strings, and the values are of type SortOrder.
const sortConditions: { [key: string]: SortOrder } = {};

// Define a function called addSortCondition that takes in two parameters: sortBy (a string) and sortOrder (a SortOrder type).
function addSortCondition(sortBy: string, sortOrder: SortOrder) {
  // Add a new property to the sortConditions object, using the sortBy value as the key and the sortOrder value as the value.
  sortConditions[sortBy] = sortOrder;
}

// Example usage:

// Declare a variable called sortBy and assign it the value "name".
const sortBy = "name";

// Declare a variable called sortOrder and assign it the value "asc".
const sortOrder = "asc";

// Call the addSortCondition function with the sortBy and sortOrder variables as arguments.
addSortCondition(sortBy, sortOrder);


*/
