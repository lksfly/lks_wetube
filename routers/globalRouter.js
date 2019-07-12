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
import { onlyPublic } from "../middlewares";

const globalRouter = express.Router();
export default globalRouter;

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, postJoin, onlyPublic, postLogin); //postJoin에서 받은 email과  password를 post login으로 보낸다.

globalRouter.get(routes.home, home); //자동적으로 import 해줌!!

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.logout, logout);
globalRouter.get(routes.search, search);
// globalRouter1.post(routes.search, search);
