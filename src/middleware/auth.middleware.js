
export const isLogin = (req, res, next) => {
  const token = getTokenFromHeader(req);
  const decoded = verifyToken(token);
  if (decoded) {
    req.userAuthId = decoded?.id;
    next();
  } else throw new Error("Invalid token or expired, please try again");
};