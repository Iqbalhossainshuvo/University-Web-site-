// const pagination: IPagination = {
//     page: Number(req.params.page),
//     limit: Number(req.params.limit),
//     sortBy: req.params.sortBy,
//     sortOrder: req.params.sortOrder,
//   };

// we are doing this daynamically for use everywhere

const pick = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> => {
  const finalObj: Pick<T, K> = {} as Pick<T, K>;
  for (const key of keys) {
    if (obj && obj.hasOwnProperty.call(obj, key)) {
      finalObj[key] = obj[key];
    }
  }
  return finalObj;
};

// /**
//  * Picks specified keys from an object and returns a new object with only those keys.
//  * @param obj - The object from which to pick keys.
//  * @param keys - An array of keys to pick.
//  * @returns A new object with only the picked keys.
//  */
// export const pick = <T extends object, K extends keyof T>(
//   obj: T,
//   keys: K[]
// ) => {
//   const finalObj: Partial<T> = {}; // Create an empty object to store the picked keys

//   for (const key of keys) {
//     // Iterate over each key
//     if (obj && obj.hasOwnProperty.call(obj, key)) {
//       // Check if the key exists in the object
//       finalObj[key] = obj[key]; // Add the key-value pair to the new object
//     }
//   }

//   return finalObj; // Return the new object with only the picked keys
// };

export default pick;
