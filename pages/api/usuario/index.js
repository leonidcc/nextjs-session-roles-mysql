import Usuario from "/model/usuario";
  import getsession from "/lib/session"

  export default async function handler(req, res) {
    switch (req.method) {
      case "GET":
        return await gets(req, res);
      case "POST":
        return await save(req, res);
      default:
        return res.status(400).send("Method not allowed");
    }
  }

  const gets = async (req, res) => {
    try {
      const session = await getsession(req);
      // if(session && session.roles.includes("sudo")){
      if(session){
        const results = await Usuario.gets();
        return res.status(200).json(results);
      }else return res.status(403).send("Forbiden");
    } catch (error) {
      return res.status(500).json({ error });
    }
  };

  const save = async (req, res) => {
     try {
       const session = await getsession(req);
       // if(session && session.roles.includes("sudo")){
       if(session){
          const { name, email, email_verified, image, roles, status, password, phone} = req.body;
          const results = await Usuario.create(
             name, email, email_verified, image, roles, status, password, phone
           );
          return res.status(200).json({ ...req.body, id: results });
      }else return res.status(403).send("Forbiden");
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };