import { NextFunction, Request, Response } from "express";
import { AuthService } from "./Auth.service";



const login = async(req:Request,res:Response,next:NextFunction)=>{
  try {
    const {...loginData} = req.body;
    const result = await AuthService.loginUser(loginData)

    res.status(200).json({
        success:true,
        message:'Success login',
        data:result
    })
  } catch (error) {
    next(error)
  }
    console.log(req.body);
}

export const loginController = {
    login,
}