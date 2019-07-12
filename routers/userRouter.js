//router란 route들의 복잡함을 쪼개주는데 사용할 수 있음.
//router는 많은 route들이 담긴 파일이다.

import express from "express";
import routes from "../routes";
import {
  editProfile,
  userDetail,
  changePassword
} from "../controller/userController"; //자동생성
import { onlyPrivate } from "../middlewares";

const userRouter = express.Router();
export default userRouter;

userRouter.get(routes.editProfile, onlyPrivate, editProfile);
userRouter.get(routes.changePassword, onlyPrivate, changePassword);
userRouter.get(routes.userDetail(), userDetail);
