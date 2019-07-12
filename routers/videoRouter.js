import express from "express";
import routes from "../routes";
import {
  videoDetail,
  deleteVideo,
  getUpload,
  postUpload,
  getEditVideo,
  postEditVideo
} from "../controller/videoController";
import { uploadVideo, onlyPrivate } from "../middlewares";

const videoRouter = express.Router();

export default videoRouter; // export default는 파일로 export 한다는 것임.

//Upload
videoRouter.get(routes.upload, onlyPrivate, getUpload);
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, postUpload);

//Video Detail
videoRouter.get(routes.videoDetail(), videoDetail);

//Edit Video
videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo);
videoRouter.post(routes.editVideo(), onlyPrivate, postEditVideo);

//Delete Video
videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo);
