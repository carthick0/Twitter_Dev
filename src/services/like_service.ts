import CommentRepository from "../repositories/comment_repository";
import LikeRepository from "../repositories/like_repository";
import TweetRepository from "../repositories/tweet_repository";

const likeRepository = new LikeRepository();
const tweetRepository = new TweetRepository();
const commentRepository=new CommentRepository();
export const toggleLike = async (modelId: string,modelType: "Tweet" | "Comment",userId: string): Promise<boolean> => {
  
    let likeable: any;

  // 1. Get the model (Tweet / Comment)
  if (modelType === "Tweet") {
    likeable = await tweetRepository.get(modelId);
    if (!likeable) throw new Error("Tweet not found");
  } if (modelType === "Comment") {
    likeable = await commentRepository.get(modelId);
    if (!likeable) throw new Error("Comment not found");
    }
  else {
    throw new Error("Invalid model type");
  }

  // 2. Check if like already exists
  const existingLike = await likeRepository.findByUserLikeable({
    user: userId,
    onModel: modelType,
    likeable: likeable._id,
  });

  // 3. If already liked → remove it
  if (existingLike) {
    likeable.likes.pull(existingLike._id);
    await likeable.save();
    await existingLike.deleteOne();
    return false;
  }

  // 4. Else → add new like
  const newLike = await likeRepository.create({
    user: userId,
    onModel: modelType,
    likeable: likeable._id,
  });

  likeable.likes.push(newLike._id);
  await likeable.save();

  return true;

};
