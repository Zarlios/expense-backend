import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const expenses = express.Router();

export default expenses;