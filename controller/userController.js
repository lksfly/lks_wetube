import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
  console.log("나는 getjoin이다.");
  res.render("Join", { pageTitle: "Join" });
};

export const postJoin = async (req, res, next) => {
  //가입하고 바로 로그인시키기 위해 미들웨어로 변환
  // 1. 사용자등록 2. 로그인시키기
  const {
    body: { name, email, password, password2 }
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("Join", { pageTitle: "Join" });
  } else {
    try {
      //To Do : Register User
      const user = await User({
        //디비에 등록됨.
        name,
        email
      });
      console.log(user);
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};

export const getLogin = (req, res) =>
  res.render("Login", { pageTitle: "Login" });
export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home
});

export const githubLogin = passport.authenticate("github");

export const githubLoginCallback = async (_, __, profile, cb) => {
  console.log(profile);
  const {
    _json: { id, avatar_url: avatarUrl, name, email }
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      //새유저만든사람은 cb리턴안하고 어떻게 쿠키를 보내ㅣ?
      email,
      name,
      githubId: id,
      avatarUrl
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postGithubLogIn = (req, res) => {
  res.redirect(routes.home);
};
export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};
export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "edit Profile" });
export const userDetail = (req, res) =>
  res.render("userDetail", { pageTitle: "user Detail" });
export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "change Password" });
