import routes from "./routes"; //자동생성
import multer from "multer";

const multerVideo = multer({ dest: "uploads/videos/" }); //  /uploads/videos/ 와 같이 앞에 슬래쉬 붙이면 안됨. 왜냐하면 해당 위치가 네 project file 안에있는 디렉토리라고 생각할 것이기 때문

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Wetube";
  res.locals.routes = routes;
  res.locals.user = req.user || null;
  console.log(req.user);
  next();
};

//export const uploadVideo
export const uploadVideo = multerVideo.single("videoFile"); //이 single은 오직 하나의 파일만 업로드 할 수 있는 걸 의미
