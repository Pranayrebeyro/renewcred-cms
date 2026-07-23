import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "renewcred_secret";

export const generateToken = (adminId: string): string => {
  return jwt.sign({ adminId }, JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};