import routes from "../routes"

export const getJoin = (req, res) => {
    console.log('나는 getjoin이다.')
    res.render("Join", {pageTitle:"Join"});

};


export const postJoin = (req, res) => {
    const {body : {name, eamail, password, password2}} = req
    if(password !== password2){
        res.status(400);
        res.render("Join", {pageTitle:"Join"});
    }else{
        // to Do : register User
        // to Do : log user in
        res.redirect(routes.home);
    }
    
}

export const getLogin = (req, res) => res.render("Login", {pageTitle:"Login"});
export const postLogin = (req, res) => {
    console.log(req.body);
    res.redirect(routes.home);
};

export const logout = (req, res) => {
    res.redirect(routes.home);
}
export const editProfile = (req, res) => res.render("editProfile", {pageTitle:"edit Profile"});
export const userDetail = (req, res) => res.render("userDetail", {pageTitle:"user Detail"});
export const changePassword = (req, res) => res.render("changePassword", {pageTitle:"change Password"});
