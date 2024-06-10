import { getUserFromToken } from "../service/authentication.service.js";

const checkStatusUser = (cookieName) => {
  return (req, res, next) => {
    const cookie = req.cookies[cookieName];

    if (!cookie) return next();

    const user = getUserFromToken(cookie);

   req.user = user;

   return next()
  };
};

export { checkStatusUser };
