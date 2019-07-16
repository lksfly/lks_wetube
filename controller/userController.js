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

//github login
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
  res.render("userDetail", { pageTitle: "User Detail", user: req.user }); //req.user는 현재 로그인 된 사용자이다!
};
export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "edit Profile" });
export const userDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const user = await User.findById(id);
    res.render("userDetail", { pageTitle: "user Detail", user });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "change Password" });
