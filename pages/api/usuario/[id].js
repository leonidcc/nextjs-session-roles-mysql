import Usuario from "model/usuario";
  import getsession from "/lib/session"

  export default async function handler(req, res) {
    switch (req.method) {
      case "GET":
        return await get(req, res);
      case "DELETE":
        return await remove(req, res);
      case "PUT":
        return await update(req, res);
      default:
        return res.status(400).json({ message: "bad request" });
    }
  }

  const get  = async (req, res) => {
     try {
       const session = await getsession(req);
       // if(session && session.roles.includes("sudo")){
       if(session){
          const result = await Usuario.getById(req.query.id);
          return res.status(200).json(result);
       }else return res.status(403).send("Forbiden");
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  const remove = async (req, res) => {
    try {
      const session = await getsession(req);
      // if(session && session.roles.includes("sudo")){
      if(session){
        const result = await Usuario.remove(req.query.id);
        return res.status(200).json(
          { message: "Removido" }
        );
      }else return res.status(403).send("Forbiden");
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  const update = async (req, res) => {
    let { name, email, email_verified, image, roles, status, password, phone} = req.body
    try {
      const session = await getsession(req);
      // if(session && session.roles.includes("sudo")){
      if(session){
        const result = await Usuario.update({ name, email, email_verified, image, roles, status, password, phone}, req.query.id);
        return res.status(200).json({
          message:"Cambios aplicados",
          data:req.body
        });
      }else return res.status(403).send("Forbiden");
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
