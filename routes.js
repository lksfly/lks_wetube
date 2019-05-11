
//URL 주소들을 정의해둔 곳!!

//global
const HOME = "/";  //비디오들이 전달됨
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";


//users
const USERS = "/users";
const USER_DETAIL = "/:id";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";



//videos 

const VIDEOS = "/videos";
const UPLOAD = "/upload";
const VIDEO_DETAIL = "/:id"; // :쓰는 이유 -> 콜론 붙인 것은 변하는 값이라는 걸 express 가 알아챔. /id 로만 쓰면 텍스트로 인식 
const EDIT_VIDEO = "/:id/edit";
const DELETE_VIDEO = "/:id/delete";


const routes = {
    home: HOME,
    join: JOIN,
    login: LOGIN,
    logout: LOGOUT,
    search: SEARCH,
    users : USERS,

    userDetail: id => {
        if (id) {
          return `/users/${id}`
        } else {
          return USER_DETAIL
        }
      },
    // userDetail : id => {
    //     if(id){
    //         return `/users/${id}`;
    //     } else{
    //         return USER_DETAIL;
    //     }
    // },
    editProfile: EDIT_PROFILE,
    changePassword : CHANGE_PASSWORD,
    videos:VIDEOS,
    upload: UPLOAD,
    videoDetail: (id) => {
        if(id) {
            return `/videos/${id}`;
        }else{
            return VIDEO_DETAIL;
        }
    },
    editVideo: EDIT_VIDEO,
    deleteVideo: DELETE_VIDEO
    
};

export default routes;