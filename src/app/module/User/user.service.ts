import mongoose from "mongoose";
import config from "../../../config";
import { Student } from "../Student/Student.Model"
import { IStudent } from "../Student/Student.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.Model";
import { IUser } from "./user.interface";
import { users } from "./user.model";
import { generateStudentId } from "./user.utils";
import ApiError from "../../../allErrorHandlerFunction/ApiError/ApiError";
import httpStatus from "http-status";




const createStudent =async(student:IStudent, user:IUser)=>{
    // জদি password না দেয়, তাহলে আমরা default password দিয়ে দিচ্ছি step = 1  ----------------------------------------------------------------
    if(!user.password){
        user.password = config.default_student_password as string;
    }


    // যেহেতু আমরা body থেকে কোন role দিব না , সে জন্য এখানে role কে set করে দিয়েছি 
    // set role  step = 2
    user.role = 'student';



    // student create করতে হলে year and code আমাদের লাগবে যা academic semester য়ে আমরা তৈরি করেছি , এবং academics semester কে student এর মাজে reference করে দিয়েছি , তাই এখানে student  দিয়ে reference  field এর id খুজে বের করতেছি   
    // step = 3
    const academicSemester = await AcademicSemester.findById(student.academicSemester)
 



// for access all data like student, academicSemester ....  for returning 
// step = 10
let newUserAllData = null



// transition and rolleback step = 4
const session = await mongoose.startSession()
try {
    session.startTransaction()



    // এখানে আমরা নিজের মত করে একটা id create করতেছি এবং এই id কে user and student দুটোকেই দিয়ে দিচ্ছি
    //step = 5
    const id = await generateStudentId(academicSemester)
    user.id = id
    student.id = id


// Since we are here use transaction Because of that our data convert in a arrays
//step = 6 
const createNewStudent = await Student.create([student],{session})


// জদি student তৈরি না হয় তাহলে error দিবে আমাদের কে --------------------------------
if(!createNewStudent.length){
throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student')
}

// student তৈরি করার পর যেই _id তা পাই সেটাকে আমরা user এর reference fields student কে দিয়ে দিলাম
//step = 7 
user.student = createNewStudent[0]._id 



// user create করলাম , আর যেহেতু transection ব্যবহার করলে আমাদের data গুলো array হয়ে সে জন্য user and student দুটোকেই array এর ভিতরে রাখলাম = [];


// user crete করলাম step = 8
const createNewUser = await users.create([user],{session})

if(!createNewUser.length){
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user')
}

// step = 11 আমরা নতুন user এর id কে newUserAllData এর মাজে Assign করেছি সব data গুলোকে populete করার জন্য like that => user---> student ---> academicSemester , academicDepartment, AcademicFaculty 
newUserAllData = createNewUser[0]

// transection commit and end করলাম  step = 9
await session.commitTransaction();
await session.endSession()

} catch (error) {
await session.abortTransaction();
await session.endSession();
// যদি কোন error দেয় , তাই error দিলাম
    throw error;
}


 if(newUserAllData){
    newUserAllData= await users.findOne({id:newUserAllData.id}).populate({path: 'student',
populate:[
    {
        path:'academicSemester',
    },
    {
        path:'academicDepartment',
    },
    {
        path:'academicFaculty',
    }
]})
 }
console.log(newUserAllData);
 return newUserAllData
}


export const userService = {
    createStudent,
}