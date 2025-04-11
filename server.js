import express, { json } from "express";
import cookieParser from "cookie-parser";
import { logging } from "./middleware/logging.js";
import ApiRouter from "./routes/ApiRouter.js";
import AuthRouter from "./routes/AuthRouter.js";
import dotenv from "dotenv";

const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome to the Express server of the NeverAlone project");
});

app.use("/api", logging, ApiRouter);
app.use("/auth", AuthRouter);

app.listen(PORT, () => {
  console.log(`Server is very running at http://localhost:${PORT}`);
});

app.use(notFound);
app.use(errorHandler);
