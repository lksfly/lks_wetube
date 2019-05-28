import express from "express";
import routes from "../routes"
import { videoDetail, deleteVideo, getUpload, postUpload, getEditVideo, postEditVideo } from "../controller/videoController";
import { uploadVideo } from "../middlewares";

const videoRouter = express.Router();

export default videoRouter;  // export default는 파일로 export 한다는 것임.

//Upload
videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo, postUpload );

//Video Detail
videoRouter.get(routes.videoDetail(),videoDetail);

//Edit Video
videoRouter.get(routes.editVideo(), getEditVideo);
videoRouter.post(routes.editVideo(), postEditVideo);

//Delete Video
videoRouter.get(routes.deleteVideo(), deleteVideo);



