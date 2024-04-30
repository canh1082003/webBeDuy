import { verifyToken } from "../utils/jwt.js";
export const isLogin = (req, res, next) => {
  const token = req?.headers?.authorization?.split(" ")[1];

  if (token === undefined) {
    return res
      .status(401)
      .json({ message: "Invalid token or expired, please try again" });
  }
  const decoded = verifyToken(token);
  if (decoded) {
    req.userAuthId = decoded?.id;
    req.role = decoded?.role;
    next();
  } else {
    return res
      .status(401)
      .json({ message: "Invalid token or expired, please try again" });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.role == "admin") {
    next();
  } else {
    return res.status(401).json({ message: "Permission error" });
  }
};
