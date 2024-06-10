import { Router } from "express";
import { loginUser, logoutUser, signInUser } from "../controller/user.controller.js";

export const userRouter = Router()

userRouter.post('/signin',signInUser)
userRouter.post('/login',loginUser)
userRouter.get('/logout',logoutUser)