import User from "/model/user";

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
    const results = await User.gets();
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const save = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const results = await User.create({
      name,
      description,
      price,
    });
    return res.status(200).json({ ...req.body, id: result.insertId });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
