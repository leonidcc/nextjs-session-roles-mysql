import stringHash from 'string-hash';
import { sign } from "jsonwebtoken";
import User from "/model/usuario";
import { serialize } from "cookie";

export default async function loginHandler(req, res) {
  const {email, phone, password} = req.body;
  let user = await User.get(email);
  if(user != null)
    return res.status(401).json({ message: "User exist" });

  let newUser = await User.create("New user", email ,"none", "/newusericon.png","[]",0,stringHash(password), phone);
  if(newUser != null){
    const serialized = createTokenSerialized(email, "New user");
    res.setHeader("Set-Cookie", serialized);
    return res.status(200).json({
      message: "Login successful",
    });
  }
  else return res.status(401).json({ message: "Ocurrio un error" });
}

function createTokenSerialized(email,username) {
  const token = sign(
       {
         exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
         email,
         username
       },
       process.env.SECRET_SESSION_HASH
     );

     const serialized = serialize("TokenSession", token, {
       httpOnly: true,
       secure: process.env.NODE_ENV === "production",
       sameSite: "strict",
       maxAge: 1000 * 60 * 60 * 24 * 30,
       path: "/",
     });
     return serialized;
}
