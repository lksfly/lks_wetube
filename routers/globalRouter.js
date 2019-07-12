import express from "express";
import routes from "../routes";
import { home, search } from "../controller/videoController";
import {
  logout,
  getJoin,
  postJoin,
  getLogin,
  postLogin
} from "../controller/userController";

const globalRouter = express.Router();
export default globalRouter;

globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin, postLogin); //postJoin에서 받은 email과  password를 post login으로 보낸다.

globalRouter.get(routes.home, home); //자동적으로 import 해줌!!

globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.logout, logout);
globalRouter.get(routes.search, search);
// globalRouter1.post(routes.search, search);
