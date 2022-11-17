import jwt from "jsonwebtoken";
import User from "/model/user";

export default async function getsession(req) {
  try {
    const {TokenSession} = req.cookies;
    if (!TokenSession) {
      return null;
    }
    const { email } = jwt.verify(TokenSession, process.env.SECRET_SESSION_HASH);
    const user = await User.get(email);
    return JSON.parse(JSON.stringify(user))
  }
  catch (e) {
    return null;
  }
}
