import routes from "./routes"; //자동생성

export const localsMiddleware = (req, res, next) => {
    
    res.locals.siteName = "Wetube"
    res.locals.routes = routes;
    res.locals.user = {
        isAuthenticated:true,
        id:1
    };
    next();
    
};