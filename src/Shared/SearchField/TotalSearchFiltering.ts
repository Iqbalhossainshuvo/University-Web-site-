// // service page
// // pagination

// import pick from '../Pagination/pick';

// const getByPaginationService = async (
//   // searching service
//   filter: SearchFieldType,
//   // pagination
//   getPagination: IPagination
// ): Promise<dependOnIAcademicData<IAcademicSemester[]>> => {
//   const { page, limit, skip, sortBy, sortOrder } =
//     calculatePagination(getPagination);
//   // sort
//   const sortCondition: { [key: string]: SortOrder } = {};
//   if (sortBy && sortOrder) {
//     sortCondition[sortBy] = sortOrder;
//   }

//   // const academicDataSearchTerm = ['title', 'code', 'year'];

//   // searching service
//   const { searchTerm, ...filterData } = filter;

//   const andCondition = [];
//   // search term daynamic
//   if (searchTerm) {
//     andCondition.push({
//       $or: academicDataSearchTerm.map(field => ({
//         [field]: { $regex: searchTerm, $options: 'i' },
//       })),
//     });
//   }

//   // extract matching
//   if (Object.keys(filterData).length) {
//     andCondition.push({
//       $and: Object.entries(filterData).map(([field, value]) => ({
//         [field]: value,
//       })),
//     });
//   }

//   // const andCondition = [
//   //   {
//   //     $or: [
//   //       {
//   //         title: {
//   //           $regex: searchTerm, // for partial matches
//   //           $options: 'i', // case insensitive
//   //         },
//   //       },
//   //       {
//   //         code: {
//   //           $regex: searchTerm, // for partial matches
//   //           $options: 'i', // case insensitive
//   //         },
//   //       },
//   //       {
//   //         year: {
//   //           $regex: searchTerm, // for partial matches
//   //           $options: 'i', // case insensitive
//   //         },
//   //       },
//   //     ],
//   //   },
//   // ];
// solve searching problem
// const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
//   const results = await collectionName
//     .find(whereCondition)
//     .sort(sortCondition)
//     .skip(skip)
//     .limit(limit);

//   const total = await collectionName.countDocuments();
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

// // controller page

// const paginationController = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const filter = pick(req.query, filterControllerKey); // serching filter
//     const pagination = pick(req.query, paginationKey);
//     console.log(pagination, 'controller');

//     const result = await AcademicSemesterService.getByPaginationService(
//       filter, // serching filter
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
