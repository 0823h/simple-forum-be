import jwt from "jsonwebtoken";
import { HttpException } from "./http-exception";

export const generateToken = (
  secretKey: string,
  data: object,
  time: string
): Promise<string | undefined> => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        data,
      },
      secretKey,
      { expiresIn: time },
      (error, token) => {
        if (error) {
          return reject(error);
        }
        return resolve(token);
      }
    );
  });
};

export const verifyToken = (
  token: string,
  secretKey: string,
  ignoreExpiration = false
): Promise<string | jwt.JwtPayload | undefined> => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      secretKey,
      {
        ignoreExpiration,
      },
      (error, decoded) => {
        if (error) {
          return reject(new HttpException("Unauthorized", 401));
        }
        return resolve(decoded);
      }
    );
  });
};
