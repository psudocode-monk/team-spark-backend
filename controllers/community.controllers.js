import CommunityPost from "../models/community.models.js";

// 1. Create a new community post (user must be logged in)
export const createPost = async (req, res) => {
  try {
    const userId = req.user._id; // comes from authUserMiddleware
    const { content, image, location } = req.body;

    // Validate required fields
    if (!content || !location) {
      return res
        .status(400)
        .json({ message: "Content and location are required" });
    }

    // Create a new post linked to the user
    const newPost = new CommunityPost({
      user: userId,
      content,
      image,
      location,
    });

    await newPost.save();

    res.status(201).json({
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: error });
  }
};

// 2. Get all posts created by the logged-in user
export const getAllSelfPosts = async (req, res) => {
  try {
    const userId = req.user._id;

    const posts = await CommunityPost.find({ user: userId }).sort({
      createdAt: -1,
    });

    if (!posts.length) {
      return res.status(404).json({ message: "No posts found for this user" });
    }

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching user posts:", error);
    res.status(500).json({ message: "Server error while fetching user posts" });
  }
};

// 3. Get all posts based on location entered by user
export const getAllPostsByLocation = async (req, res) => {
  const { location } = req.body;

  try {
    if (!location) {
      return res.status(400).json({ message: "Location query is required" });
    }

    const posts = await CommunityPost.find({
      location: { $regex: location, $options: "i" }, // case-insensitive match
    })
      .populate("user", "name email") // show who posted it
      .sort({ createdAt: -1 });

    if (!posts.length) {
      return res
        .status(404)
        .json({ message: `No posts found for location: ${location}` });
    }

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts by location:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching posts by location" });
  }
};
