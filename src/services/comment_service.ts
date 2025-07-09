import mongoose from "mongoose";
import CommentRepository from "../repositories/comment_repository";
import TweetRepository from "../repositories/tweet_repository";

const commentRepository = new CommentRepository();
const tweetRepository = new TweetRepository();

export const createComment = async (
  modelId: string,
  modelType: "Tweet" | "Comment",
  userId: string,
  content: string
) => {
  if (!mongoose.Types.ObjectId.isValid(modelId)) {
    throw new Error("Invalid modelId");
  }

  let commentable: any;

  if (modelType === "Tweet") {
    commentable = await tweetRepository.get(modelId);
  } else if (modelType === "Comment") {
    commentable = await commentRepository.get(modelId);
  } else {
    throw new Error("Invalid modelType");
  }

  if (!commentable) {
    throw new Error(`${modelType} not found`);
  }

  const comment = await commentRepository.create({
    comment: content,
    userId: userId,
    onModel: modelType,
    commentable: modelId,
    comments: [],
  });

  if (!Array.isArray(commentable.comments)) {
    commentable.comments = [];
  }

  commentable.comments.push(comment._id);
  await commentable.save();

  return comment;
};
