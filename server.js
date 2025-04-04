import express from "express";
import { logging } from "./middleware/logging.js";
import ApiRouter from "./routes/ApiRouter.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Welcome to the Express server of the NeverAlone project");
});

app.use("/api", logging, ApiRouter);

app.listen(PORT, () => {
  console.log(`Server is very running at http://localhost:${PORT}`);
});
