import { RequestHandler } from 'express'
import {  userService } from './user.service'

const userCreateStudent: RequestHandler = async (req, res, next) => {
  try {
   
    const {student, ...user } = req.body
    const result = await userService.createStudent(student, user)
    console.log(result)
    res.status(200).json({
      success: true,
      message: 'User created',
      data: result,
    })
  } catch (err) {
    // res.status(400).json({
    // check mongoose error
    // error: err,
    // common error message
    // success: false,
    // message: 'Failed User created',
    // })
    next(err)
  }
}

export const UserController = { userCreateStudent }
