import { createHashtag, getHashtag, getHashtags } from "../controllers/hashtag_controller";
import { createTweetController } from "../controllers/tweet_controller";
import { createUser, getUser, getUsers, loginUser } from "../controllers/user_controller";
import { toggleLikeController } from "../controllers/like_controller";
import { createComment } from "../controllers/comment_controller";
import User from "../models/user";

export const resolvers = {
  Query: {
    hashtags: () => getHashtags(),

    hashtag: (_: any, args: { id: string }) => {
      return getHashtag(args.id);
    },

    users: () => getUsers(),

    user: (_: any, args: { id: string }) => {
      return getUser(args.id);
    },
     me: (_: any, __: any, context: any) => {
      return context.user; // Comes from passport in Apollo context
    }

  },

  Mutation: {
    createTweet: async (_: any, { content }: { content: string }) => {
      const tweet = await createTweetController(content);
      return tweet;
    },

    signup: async (
      _: any,
      { name, email, password }: { name: string; email: string; password: string }
    ) => {
      const user = await createUser({ name, email, password });
      return { user };
    },

    createHashTag: async (_: any, { data }: { data: string }) => {
      try {
        const hashtag = await createHashtag(data);
        console.log("✅ Created hashtag:", hashtag);
        return hashtag;
      } catch (error) {
        console.error("❌ Error in createHashTag resolver:", error);
        throw new Error("Failed to create hashtag");
      }
    },

    toggleLike: async (
      _: any,
      { tweetId, modelType, userId }: { tweetId: string; modelType: string; userId: string }
    ) => {
      return toggleLikeController(tweetId, modelType as "Tweet" | "Comment", userId);
    },

    addComment: async (
      _: any,
      {
        modelId,
        modelType,
        comment,
        userId,
      }: { modelId: string; modelType: "Tweet" | "Comment"; comment: string; userId: string }
    ) => {
      return await createComment(modelId, modelType, comment, userId);
    },
    
    login:async(_:any,{email,password}:{email:string,password:string})=>{
      return await loginUser({email,password});

    }
  },
    Comment: {
    user: async (parent: any) => {
      return await User.findById(parent.userId);
    },
  },
 
};
