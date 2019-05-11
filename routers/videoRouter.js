import express from "express";
import routes from "../routes"
import { videoDetail, editVideo, deleteVideo, getUpload, postUpload } from "../controller/videoController";
import { uploadVideo } from "../middlewares";

const videoRouter = express.Router();

export default videoRouter;  // export default는 파일로 export 한다는 것임.


videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo, postUpload );

videoRouter.get(routes.videoDetail(),videoDetail);
videoRouter.get(routes.editVideo, editVideo);
videoRouter.get(routes.deleteVideo, deleteVideo);

