import getsession from "/lib/session"

export default async function handler(req, res) { 
  if(!session) return res.status(403).send("Forbiden")
  res.status(200).json({ name: 'John Doe' })
}
