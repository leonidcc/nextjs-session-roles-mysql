import User from "model/user";

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
    const result = await User.getsById(req.query.id);
    return res.status(200).json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const result = await User.remove(req.query.id);
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const result = await User.update(req.body,req.query.id);
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
