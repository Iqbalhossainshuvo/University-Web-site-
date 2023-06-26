import { users } from './user.model'

//
// export const findLastUserId = async () => {
//
//   const lastUser = await userCollection
//     .findOne({}, { id: 1, _id: 0 })
//     .sort({ createdAt: -1 })
//     .lean()

//   return lastUser?.id
// }

// // generate id from 0 to five
// export const generateId = async () => {
//   const id = (await findLastUserId()) || (0).toString().padStart(5, '0')
//   const incrementId = (parseInt(id) + 1).toString()
//   return incrementId
// }
// find last user from database and increment id
export const findLastUserId = async () => {
  const lastUser = await users
    // this is called fild filter // // id:1 মানে হল এটা দেও, আমি এতাই চাই, আর _id:0 মানে হল mongodb এর id আর 0 মানে হল এটা আমার লাগবেনা, lean মানে হল এটাকে pure javascript য়ে convert করে নিচ্ছি ,কারন এটার উপর mongoose এর কোন operation করব না তাই ।
    .findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()

  return lastUser?.id
}

export const generateId = async () => {
  const lastUserId = await findLastUserId()
  const id = lastUserId ? parseInt(lastUserId) : 0 //giver first id 0
  const incrementId = (id + 1).toString().padStart(5, '0') //generate id from 0 to five using padstart

  return incrementId
}
