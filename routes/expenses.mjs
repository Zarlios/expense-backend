import express from "express";
import Expenses from "../db/models/expense.mjs";

const expenses = express.Router();

expenses.get("/expense", async (req, res) => {
  let _id = req.session.userId;
  let results = await Expenses.find({ _id }).toArray();
  res.send(results).status(200);
});

expenses.post("/expense", async (req, res) => {
  try {
    const expense = req.body;
    const createdExpense = await Expenses.create(expense);
    res.status(201).json(createdExpense);
  }
  catch (error) {
    res.status(500).json({ error: 'Could not create expense' });
  }
  
});

expenses.patch("/expense", async (req, res) => {
  let _id = req.session.userId;
  const updates =  {
    $set: {

    }
  };

  let result = await User.updateOne(_id, updates);

  res.send(result).status(200);
});

// user.delete("/:id", async (req, res) => {
//   const query = { _id: new ObjectId(req.params.id) };

//   let result = await userCollection.deleteOne(query);

//   res.send(result).status(200);
// });

export default expenses; 