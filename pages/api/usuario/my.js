import Usuario from "model/usuario";
  import getsession from "/lib/session"

  export default async function handler(req, res) {
    switch (req.method) {
      case "PUT":
        return await update(req, res);
      default:
        return res.status(400).json({ message: "bad request" });
    }
  }


  const update = async (req, res) => {
    let { name, email, image, phone} = req.body
    try {
      const session = await getsession(req);
      // if(session && session.roles.includes("sudo")){
      if(session){
        const result = await Usuario.update({ name,   image, phone}, session.id);
        return res.status(200).json({
          message:"Cambios aplicados",
          data:req.body
        });
      }else return res.status(403).send("Forbiden");
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
