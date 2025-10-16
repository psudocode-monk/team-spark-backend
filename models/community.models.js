import mongoose from "mongoose"

const communityPostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    userIcon: {
      type: String,
      required: false, // changed from true → false
      default: "",     // optional default
    },
    userName: {
      type: String,
      required: false, // changed from true → false
      default: "Anonymous", // optional default
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    location: {
      type: String, 
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
)

export default mongoose.model("CommunityPost", communityPostSchema)
