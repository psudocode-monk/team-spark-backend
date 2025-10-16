import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "../routes/auth.routes.js";
import communityRouter from "../routes/community.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

// Auth routes
app.use("/api/auth", authRouter);

// Community routes
app.use("/api/community", communityRouter);

// Demo route
app.get("/", (req, res) => {
  res.send(
    "<h1>This is the Backend of The Project Bharat Yatra - by Team Spark.. </h1>"
  );
});

export default app;
