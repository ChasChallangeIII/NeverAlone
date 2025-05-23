import express from "express";
import cookieParser from "cookie-parser";
import ApiRouter from "./routes/ApiRouter.js";
import AuthRouter from "./routes/AuthRouter.js";
import AdminRouter from "./routes/AdminRouter.js";
import CommentsRouter from "./routes/ReportCommentRouter.js";
import dotenv from "dotenv";
import cors from "cors";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";
import { authenticate, authorizeAdmin } from "./middleware/auth.js";
import swaggerUi from "swagger-ui-express";
import { swaggerDocs } from "./config/swagger.js";
import "./config/postgres.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get("/", (_, res) => {
  res.redirect("/docs");
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));



app.use("/api", authenticate, ApiRouter);
app.use("/admin", authorizeAdmin, AdminRouter);
app.use("/admin/comments", authorizeAdmin, CommentsRouter);
app.use("/auth", AuthRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
