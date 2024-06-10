import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

configDotenv();

const generateUserToken = (user) => {
  const { email, coverImage, _id, role } = user;
  if (!user) throw "user is required";
  const payload = {
    _id,
    email,
    coverImage,
    role,
  };
  const token = jwt.sign(payload, process.env.JWTSECRET, {
    expiresIn: "1d",
  });

  return token;
};

const getUserFromToken = (token) => {
  const payload = jwt.verify(token, process.env.JWTSECRET);

  return payload;
};

export { generateUserToken, getUserFromToken };
