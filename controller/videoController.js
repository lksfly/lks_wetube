import routes from "../routes";
//import { videos } from "../db";
import Video from "../models/Video";
import Comment from "../models/Comment";

export const home = async (req, res) => {
  //videos:videos -> videos
  try {
    const videos = await Video.find({}).sort({ _id: -1 }); //await 부분이 끝나기 전까지는 render부분을 실행하지 않을 것이란 걸 확실하게 보여준다!!
    //console.log(videos);
    res.render("home", { pageTitle: "Home", videos }); // 이 함수가 views 폴더에서 파일명이 home이고 확장자가 pug인 템플릿 파일을 찾은 후에 보여줄 것임. 또한 home.pug에서 videos 변수 사용가능!!!
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "home", videos: [] });
  }
};

export const search = async (req, res) => {
  // console.log(req.query);
  // const searchingBy = req.query.term;   -> ES6이전의 코딩 방식
  //const videos = Video.findOne({ title });
  const {
    query: { term: searchingBy } //const searchingBy = req.query.term
  } = req; //컨트롤러가 query에 접근하려면 form의 메소드가 "get"이어야 한다!
  let videos = []; //빈 배열의 empty array를 만들어 놓고 아무 비디오도 찾지 못한다면 빈 어레이를 render한다!
  try {
    const videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" }
    });
    //console.log(videos);
    res.render("search", { pageTitle: "Search", searchingBy, videos }); //searchingBy: searchingBy 인데 searchingBy만 써도 자동적으로 인식.
  } catch (error) {
    console.log(error);
  }
};

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });
export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path }
  } = req;

  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
    creator: req.user.id
  });
  req.user.videos.push(newVideo.id); //비디오를 넣는것이아니라 비디오 아이디를 넣는다.
  req.user.save();

  //console.log(newVideo);
  //To Do : upload and save video
  //사용자가 비디오를 업로드 하면 새로운 비디오 id를 반환받고, 업로드 후에 사용자가 업로드한 비디오의 videoDetail페이지로 리다이렉트 시킨다.
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id)
      .populate("creator")
      .populate("comments"); //.populate() 객체를 데려오는 함수
    //console.log(video);
    //console.log(video);
    res.render("videoDetail", {
      pageTitle: video.title,
      video
    }); // video : video  == video
  } catch (error) {
    console.log("1");
    console.log(error);
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id }
  } = req;

  try {
    const video = await Video.findById(id);
    console.log(video);
    console.log(video.creator);
    console.log(req.user.id);
    console.log(req.user.id == video.creator);
    if (video.creator != req.user.id) {
      console.log("??????");
      throw Error(); //try 안에서 error를 발생시키면 이건 자동적으로 catch로 가게되어있다.
    } else {
      res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
    }
    //console.log(video);
  } catch (error) {
    console.log("2");
    console.log(error);
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description }
  } = req;
  try {
    // console.log(id,"hi!!!!!!!!!!!!!!!");
    // console.log(title);
    // console.log(description);
    await Video.findOneAndUpdate(
      { _id: id },
      {
        title,
        description
      }
    );
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id }
  } = req;

  try {
    const video = await Video.findById(id);
    if (video.creator != req.user.id) {
      throw Error();
    } else {
      await Video.findOneAndDelete({ _id: id });
      //res.redirect(routes.home);
      //const videos = await Video.findById(id);
    }
  } catch (error) {
    console.log(error);
  }

  res.redirect(routes.home); //삭제 성공하든 실패하든 home으로 리다이렉트
};

export const postRegisterView = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment }, // name 없이 comment어떻게 받아왔지?
    user
  } = req;
  //console.log(comment);
  try {
    const video = await Video.findById(id);
    const newComment = await Comment.create({
      text: comment,
      creator: user.id
    });
    video.comments.push(newComment.id);
    video.save();
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};
