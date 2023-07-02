import httpStatus from "http-status"
import ApiError from "../../../allErrorHandlerFunction/ApiError/ApiError"
import { users } from "../User/user.model"
import { ILoginUser } from "./Auth.interface"
import bcrypt from 'bcrypt'


const loginUser = async(loginData:ILoginUser)=>{
   try {
    const {id, password} = loginData


    // form this isUserExists and end of the isPassword this is all common that way we write this is model file 
    // user is existing , মানে এই user টা database য়ে আছে কিনা চেক করা 
    // const isUserExist = await users.findOne({ইউজার থেকে id নিবে এবং জদি id মিলে যায় database এর সাথে তাহলে }, {এগুলো দিবে })
    const isUserExist = await users.findOne({id}, {id:1,password:1, needsPasswordChange:1})

    if(!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND,'user not found')
    }

    // password matches 
    // const isPasswordMatch = await bcrypt.compare(ইউজার এখন যে password দিয়ে login করতে চাচ্ছে ,ঐ ইউজারের databases য়ে seve করা password)
    const isPasswordMatch = await bcrypt.compare(password,isUserExist?.password)

    // password যদি না মিলে 
    if(!isPasswordMatch){
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect')
    }


   
   } catch (error) {
   console.log(error);
   }
}


export const AuthService ={
    loginUser,
}