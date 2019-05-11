
import routes from "../routes";
//import { videos } from "../db";
import Video from "../models/Video";
export const home = async (req, res) => {
    //videos:videos -> videos
    try{
        const videos = await Video.find({});   //await 부분이 끝나기 전까지는 render부분을 실행하지 않을 것이란 걸 확실하게 보여준다!!
        //console.log(videos);
        res.render("home",{pageTitle:"Home",videos}); // 이 함수가 views 폴더에서 파일명이 home이고 확장자가 pug인 템플릿 파일을 찾은 후에 보여줄 것임. 또한 home.pug에서 videos 변수 사용가능!!!

    } catch(error){
        console.log(error);
        res.render("home", { pageTitle:"home",videos:[] });
    }
};

export const search = (req, res) => {
    // console.log(req.query);
    // const searchingBy = req.query.term;   -> ES6이전의 코딩 방식 

    const {
        query : {term :searchingBy}   //const searchingBy = req.query.term
    } = req;    //컨트롤러가 query에 접근하려면 form의 메소드가 "get"이어야 한다!
    
    console.log(req.query);   
    console.log(req.body);
    res.render("search",{pageTitle:"Search",searchingBy,videos});  //searchingBy: searchingBy 인데 searchingBy만 써도 자동적으로 인식.

}


export const getUpload = (req, res) => res.render("upload",{pageTitle:"Upload"});
export const postUpload = (req, res) => {
    
    const {
        body: { file, title, description }
    } = req;
    console.dir(file,title,description);
    //To Do : upload and save video
    //사용자가 비디오를 업로드 하면 새로운 비디오 id를 반환받고, 업로드 후에 사용자가 업로드한 비디오의 videoDetail페이지로 리다이렉트 시킨다.
    res.redirect(routes.videoDetail(324393));
}


export const videoDetail = (req, res) => res.render("videoDetail",{pageTitle:"Video Deatail"});

export const editVideo = (req, res) => res.render("editVideo",{pageTitle:"Edit Video"});

export const deleteVideo = (req, res) => res.render("deleteVideo",{pageTitle:"Delete Video"});





export const video = (req, res) => res.render("videos");

