import User from "/model/user";
import getsession from "/lib/session"

export default async function handler(req, res) {
  let session = await getsession(req)
  if(session && session.roles.includes("sudo") && session.id != req.body.id){
    let user = User.update({status:req.body.newStatus}, req.body.id);
    return res.status(200).send({
      message:"successful change",
      value:req.body.newStatus
    });
  }
  return res.status(403).send({
    message:"Forbbiden",
    session
  });

}
