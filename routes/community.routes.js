import { Router } from "express";
import {
  createPost,
  getAllPostsByLocation,
  getAllSelfPosts,
} from "../controllers/community.controllers.js";
import { authUserMiddleware } from "../middlewares/auth.middlewares.js";

const communityRouter = Router();

// Create a new post (protected)
communityRouter.post("/posts", authUserMiddleware, createPost);

// Get posts by location
communityRouter.get("/posts/location", getAllPostsByLocation);

// Get all self posts (protected)
communityRouter.get("/posts/self", authUserMiddleware, getAllSelfPosts);

export default communityRouter;
