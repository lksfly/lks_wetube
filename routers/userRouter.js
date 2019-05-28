//router란 route들의 복잡함을 쪼개주는데 사용할 수 있음.
//router는 많은 route들이 담긴 파일이다.

import express from "express";
import routes from "../routes";
import {
  editProfile,
  userDetail,
  changePassword
} from "../controller/userController"; //자동생성

const userRouter = express.Router();
export default userRouter;

userRouter.get(routes.editProfile, editProfile);
userRouter.get(routes.changePassword, changePassword);
userRouter.get(routes.userDetail(), userDetail);

// export const userRouter = express.Router();
//  //default로 export 하지 않았기때문에 import 할때 다르게 써줘야함.

// //홈에 익명함수 생성  route와 분리하지 않고 안에 바로 만든다.
// userRouter.get("/",(req, res)=>res.send('user index'))
// userRouter.get("/edit",(req, res)=>res.send('user deit'))
// userRouter.get("/password",(req, res)=>res.send('user password'))
