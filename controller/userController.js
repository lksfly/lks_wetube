import passport from "passport";
import routes from "../routes";
import User from "../models/User";
import { readdirSync } from "fs";

export const getJoin = (req, res) => {
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

      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error.name);
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

//github login
export const githubLogin = passport.authenticate("github");

export const githubLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, avatar_url: avatarUrl, name, email }
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      user.avatarUrl = avatarUrl;
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
//facebook login
export const facebookLogin = passport.authenticate("facebook");
export const facebookLoginCallback = async (_, __, profile, cb) => {
  console.log(profile);
  const {
    _json: { id, name, email }
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.facebookId = id;
      user.avatarUrl = `https://graph.facebook.com/${id}/picture?type=large`;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      //새유저만든사람은 cb리턴안하고 어떻게 쿠키를 보내ㅣ?
      email,
      name,
      facebookId: id,
      avatarUrl: `https://graph.facebook.com/${id}/picture?type=large`
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};
export const postFacebookLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};
export const getMe = (req, res) => {
  console.log(req.user);
  //console.log(loggedUser);
  res.render("userDetail", { pageTitle: "User Detail", user: req.user }); //req.user는 현재 로그인 된 사용자이다!
};
export const getEditProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "edit Profile" });
export const postEditProfile = async (req, res) => {
  const {
    body: { email, name },
    file
  } = req;

  try {
    const user = await User.findByIdAndUpdate(req.user.id, {
      email,
      name,
      avatarUrl: file ? file.path : req.users.avatarUrl
    }); //문제점 깃헙으로 로그인하고 이메일을 수정하면 수정한 메일로 새로운 계정이 생성됨.
    console.log(email, name);
    res.redirect(routes.me);
  } catch (error) {
    console.log(error);
    res.redirect(routes.editProfile);
  }
};
export const userDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const user = await User.findById(id).populate("videos"); //userDetail에 user의 비디오 뿌려주기위해서 populate
    console.log(user);
    res.render("userDetail", { pageTitle: "user Detail", user });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const getChangePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "change Password" });

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword1 }
  } = req;
  try {
    if (newPassword !== newPassword1) {
      res.status(400);
      console.log("1");
      res.redirect(`/users${routes.changePassword}`);

      return;
    }
    await req.user.changePassword(oldPassword, newPassword);
    console.log("2");
    res.redirect(routes.me);
  } catch (error) {
    console.log("3");
    res.status(400);
    res.redirect(`/users${routes.changePassword}`);
  }
};
