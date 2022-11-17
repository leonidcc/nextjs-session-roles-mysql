
import getsession from "/lib/session"

export default async function sessionHandler(req, res) {
  try {
    const {TokenSession} = req.cookies;
    let session = await getsession(req);
    if(session != null)
    return res.status(200).json(session);
  } catch (e) {
    return res.status(401).json({ error: "Not logged in es" });

  }
}
