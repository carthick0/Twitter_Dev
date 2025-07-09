import * as TweetService from "../services/tweet_service";

export const createTweetController = async (content: string) => {
  try {
    const tweet = await TweetService.createTweet({ content });
    return tweet;
  } catch (error) {
    console.error("Error in createTweetController:", error);
    throw new Error("Failed to create tweet");
  }
};
