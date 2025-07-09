import * as LikeService from "../services/like_service";

export const toggleLikeController = async (
  tweetId: string,
  modelType: string,
  userId: string
) => {
  try {
    const allowedTypes = ["Tweet", "Comment"] as const;
    if (!allowedTypes.includes(modelType as any)) {
      throw new Error(`Invalid modelType: ${modelType}`);
    }
    const isToggled = await LikeService.toggleLike(
      tweetId,
      modelType as "Tweet" | "Comment",
      userId
    );
    return isToggled;
  } catch (error) {
    console.error("❌ Error in toggleLikeController:", error); // This will show the real issue
    throw new Error("Failed to toggle like");
  }
};
