import jwt from "jsonwebtoken";
import config from "config";
import fs from "fs";

export function signJwt(
  object: Object,
  keyName: string,
  options?: jwt.SignOptions | undefined
) {

  return jwt.sign(object, 
    fs.readFileSync(__dirname = keyName), {
    ...(options && options),
    algorithm: "RS256",
  });
}

export function verifyJwt(
  token: string,
  keyName: string
) {

  try {
    const decoded = jwt.verify(token, fs.readFileSync(__dirname = keyName));
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    console.error(e);
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
}
