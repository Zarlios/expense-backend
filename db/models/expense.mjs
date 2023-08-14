import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: false,
  },
  expenseDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
    scale: 2,
  },
  category: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
  },
  merchant: {
    type: String,
  },
  note: {
    type: String,
  },
  receipt: {
    type: String,
  },
});

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
