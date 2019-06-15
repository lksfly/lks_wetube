//reqire의 의미 : node module을 어딘가에서 가져오는 것.
//이 경우에는 express라는 이름의 폴더를 내 파일들 속에서 찾으려 한다.
//만약 찾지 못하면 그 다음엔 node_modules 안에서 찾으려고 한다.
//const express = require('express');//
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { localsMiddleware } from "./middlewares";
import routes from "./routes";
import userRouter from "./routers/userRouter"; //node.js 모듈과의 다른점.  default로 impor하지 않을 때는 왼쪽과 같은 방식으로 import 해줘야함. userRouter만 import한 것임. default는 app object이고
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";

const app = express(); //app object

//미들웨어도 순서대로 실행됨! 현재 5개의 미들웨어 사용, 나중에 더 추가 할 것.
// 마지막에 morgan이 모든 걸 기록한다!
//그다음 최정적으로 route에 도달한다.
app.use(helmet()); //보안을 위한 것. 좋은 습관.
app.set("view engine", "pug");
app.use("/uploads", express.static("uploads")); // /uploads 로 가면 'uploads'라는 디렉토리 안으로 파일이 들어간다.
app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(localsMiddleware);
//url을 분리하여 3개로 나눔!!
// use의 뜻은 누군가 /user경로에 접속하면  이 router전체를 사용하겠다는 의미임.
// 그렇게 되면 /user, /user/edit, /user/password 를 모두 쓸 수 있게 되는 것임.
//이런식으로 라우터를 만드는 것임.
// app.use( "/user",userRouter );
app.use(routes.home, globalRouter); //글로벌 라우터
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app; //default로 export    // 파일명이 아닌 16번째 줄의 app 오브젝트임!!!
//누군가 내 파일을 불러올때(import) app object를 주겠다는 의미
//app object는 우리가 설정한 것들이다.  (32 - 40 라인까지.)

// const handleHome = (req, res) =>  res.send("hello from home!!");

// const handleProfile = (req, res) => res.send("you are on my profile");

// const middleware = (req, response, next) => {  //미들웨어는 연결을 끊을 수 있다. 미들웨어서 응답을 해버리면 뒤로 연결안됨.
//     response.send("not happening");
// }

// app.use(morgan("tiny"));  //순서가 중요함 밑에다 두면 작동안함.
// app.use(morgan("combined"));
