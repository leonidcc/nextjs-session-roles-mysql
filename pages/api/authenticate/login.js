import stringHash from 'string-hash';
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

import User from "/model/usuario";

export default async function loginHandler(req, res) {
  const {email, password} = req.body;

  let user = await User.get(email);
  console.log(user);
  if(user == null)
    return res.status(401).json({
      message: "El usuario no existe"
     });
  if(stringHash(password) !=  user.password)
    return res.status(401).json({
      message: "Revisar contraseña"
     });

  if(user.email == email){
    const serialized = createTokenSerialized(email, user.name);
    res.setHeader("Set-Cookie", serialized);
    return res.status(200).json({
      message: "Inicio correctamente"
     });
  }else {
     return res.status(401).json({
       message: "Ups! error interno"
      });
  }
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
