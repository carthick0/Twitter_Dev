import * as CommentService from "../services/comment_service";

export const createComment = async (
  modelId: string,
  modelType: "Tweet" | "Comment",
  comment: string,
  userId: string
) => {
  try {
    const newComment = await CommentService.createComment(
      modelId,
      modelType,
      userId,
      comment
    );
    return newComment;
  } catch (error) {
    console.error("❌ Error in commentController:", error);
    throw new Error("Failed to create comment");
  }
};
