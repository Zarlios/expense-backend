import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

const user = express.Router();

// User Routes
const userCollection = await db.collection("user");

// This section will help you get a list of all the records.
user.get("/", async (req, res) => {
  let results = await userCollection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single record by id
user.get("/:id", async (req, res) => {
  let query = {_id: new ObjectId(req.params.id)};
  let result = await userCollection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new record.
user.post("/", async (req, res) => {
  let newUser = {
    username: req.body.username,
    password: (await bcrypt.hash(req.body.password, 10)).toString(),
  };
  let result = await userCollection.insertOne(newUser);
  res.send(result).status(204);
});

// This section will help you update a record by id.
user.patch("/:id", async (req, res) => {
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

// This section will help you delete a record
user.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  let result = await userCollection.deleteOne(query);

  res.send(result).status(200);
});

export default user;