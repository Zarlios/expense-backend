import express from "express";
import bcrypt from "bcrypt";
import Users from "../db/models/user.mjs";

const user = express.Router();
user.get("/", async (req, res) => {
  let result = await Users.find();

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Find one
user.get("/:id", async (req, res) => {
  let _id = req.params.id;
  let result = await Users.findOne(_id);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

user.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const existingUser = await Users.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    const user = {
      username: username,
      password: await bcrypt.hash(password, 10)
    };

    const createdUser = await Users.create(user); // Using the User model to create a new user
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({ error: 'Could not create user' });
  }
});

user.patch("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates =  {
    $set: {
      username: req.body.username,
      password: req.body.password,
    }
  };

  let result = await User.updateOne(query, updates);

  res.send(result).status(200);
});

// user.delete("/:id", async (req, res) => {
//   const query = { _id: new ObjectId(req.params.id) };

//   let result = await userCollection.deleteOne(query);

//   res.send(result).status(200);
// });

export default user;