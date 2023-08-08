import express from "express";
import bcrypt from "bcrypt";
import User from "../db/models/user.mjs";


const user = express.Router();

user.get("/user/:id", async (req, res) => {
  let query = {_id: new ObjectId(req.params.id)};
  let result = await User.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

user.post("/user", async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    const user = {
      username: username,
      password: await bcrypt.hash(password, 10)
    };

    const createdUser = await User.create(user); // Using the User model to create a new user
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({ error: 'Could not create user' });
  }
});

user.patch("/user/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates =  {
    $set: {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level
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