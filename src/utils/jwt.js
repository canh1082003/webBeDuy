import jwt from "jsonwebtoken";
export const generateToken = (id, role) => {
  return jwt.sign({ id, role}, process.env.JWT_KEY);
};


export const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) return false;
      else {
        return decoded;
      }
    });
  };