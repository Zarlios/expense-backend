import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import cors from "cors";
import "./loadEnvironment.mjs";
import "./db/conn.mjs"

import users from "./routes/users.mjs";
import expenses from "./routes/expenses.mjs";
import login from "./routes/login.mjs";
import logout from "./routes/logout.mjs";
import authStatus from "./routes/authStatus.mjs";

const PORT = process.env.PORT || 5050;
const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use(
  session({
    secret: "asdfghjkl",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 3600000
    }
  })
);

server.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
server.use(express.json());

server.use("/users", users);
server.use("/expenses", expenses);
server.use("/login", login);
server.use("/logout", logout);
server.use("/authStatus", authStatus);

// start the Express server
server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
