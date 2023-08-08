import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

const user = express.Router();

const userCollection = await db.collection("users");

user.get("/user", async (req, res) => {
  let results = await userCollection.find({}).toArray();
  res.send(results).status(200);
});

user.get("/user/:id", async (req, res) => {
  let query = {_id: new ObjectId(req.params.id)};
  let result = await userCollection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

user.post("/user", async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await userCollection.findOne({ username });
  if (existingUser) {
    return res.status(409).json({ error: 'Username already exists' });
  }

  const user = {
    username: username,
    password: bcrypt.hash(password, 10)
  };

  try {
    await userCollection.insertOne(user);
    res.sendStatus(201);
  } catch (err) {
    console.error('Error inserting user:', err);
    res.sendStatus(500);
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

  let result = await userCollection.updateOne(query, updates);

  res.send(result).status(200);
});

// user.delete("/:id", async (req, res) => {
//   const query = { _id: new ObjectId(req.params.id) };

//   let result = await userCollection.deleteOne(query);

//   res.send(result).status(200);
// });

export default user;