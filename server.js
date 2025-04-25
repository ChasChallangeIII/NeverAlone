import express from "express";
import cookieParser from "cookie-parser";
import ApiRouter from "./routes/ApiRouter.js";
import AuthRouter from "./routes/AuthRouter.js";
import dotenv from "dotenv";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";
import { authenticate } from "./middleware/auth.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { swaggerDocs } from "./config/swagger.js";
import "./config/postgres.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.get("/", (_, res) => {
  res.redirect("/docs");
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api", authenticate, ApiRouter);
app.use("/auth", AuthRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
