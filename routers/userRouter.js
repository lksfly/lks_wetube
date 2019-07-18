//router란 route들의 복잡함을 쪼개주는데 사용할 수 있음.
//router는 많은 route들이 담긴 파일이다.

import express from "express";
import routes from "../routes";
import {
  getEditProfile,
  postEditProfile,
  userDetail,
  getChangePassword,
  postChangePassword
} from "../controller/userController"; //자동생성
import { onlyPrivate, uploadAvatar } from "../middlewares";

const userRouter = express.Router();
export default userRouter;

userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile);

userRouter.get(routes.changePassword, onlyPrivate, getChangePassword);
userRouter.post(routes.changePassword, onlyPrivate, postChangePassword);
userRouter.get(routes.userDetail(), userDetail);
