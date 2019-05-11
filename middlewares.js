import routes from "./routes"; //자동생성
import multer from "multer";

const multerVideo = multer({dest: "videos/"})


export const localsMiddleware = (req, res, next) => {
    
    res.locals.siteName = "Wetube"
    res.locals.routes = routes;
    res.locals.user = {
        isAuthenticated:true,
        id:1
    };
    next();
    
};

//export const uploadVideo
export const uploadVideo = multerVideo.single('videoFile'); //이 single은 오직 하나의 파일만 업로드 할 수 있는 걸 의미 