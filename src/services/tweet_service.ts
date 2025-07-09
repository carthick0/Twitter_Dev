import HashTagRepository from "../repositories/hastag-repository";
import TweetRepository from "../repositories/tweet_repository";

const tweetRepository=new TweetRepository();
const hashtagRepository=new HashTagRepository();

export const createTweet = async (data: any) => {
  const content = data.content;
  const tags = (content.match(/#[a-zA-Z0-9_]+/g) || []).map((tag: string) =>
    tag.substring(1).toLowerCase()
  );

  const tweet = await tweetRepository.create(data);

  const existingTags = await hashtagRepository.findByTitles(tags);
  
  const existingTagTitles = existingTags.map((tag: any) => tag.title);
  const newTags = tags
    .filter((tag: string) => !existingTagTitles.includes(tag))
    .map((tag: string) => ({
      title: tag,
      tweets: [tweet._id],
    }));

  // Insert new tags
  const createdTags = newTags.length > 0 ? await hashtagRepository.bulkCreate(newTags) : [];

  // Ensure createdTags is always an array
  const safeCreatedTags = Array.isArray(createdTags) ? createdTags : [];

  // Update existing tags with this tweet ID
  for (const tag of existingTags) {
    tag.tweets.push(tweet._id);
    await tag.save();
  }

  // Collect all tag IDs (new + existing)
  const allTagIds = [...existingTags, ...safeCreatedTags].map((tag) => tag._id);

  // Update tweet with hashtag references
  tweet.hashtags = allTagIds;
  await tweet.save();

  return tweet;
};
