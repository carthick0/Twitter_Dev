import TweetRepository from "../../src/repositories/tweet_repository";
import Tweet from "../../src/models/tweet";

jest.mock("../../src/models/tweet");

test("should create a new tweet", async () => {
  const data = {
    content: "Testing Tweet",
  };

  (Tweet.create as jest.Mock).mockResolvedValue({
    ...data,
    createdAt: "2022-02-12",
    updatedAt: "2002-02-28",
  });

  const tweetRepository = new TweetRepository();
  const tweet = await tweetRepository.create(data);

  expect(Tweet.create).toHaveBeenCalled(); 
  expect(tweet.content).toBe(data.content);
  expect(tweet.content).toBeDefined();
});


test("should get all tweets", async () => {
  const data = {
    content: "Testing Tweet",
  };

  const mockTweets = [
    {
      ...data,
      createdAt: "2022-02-12",
      updatedAt: "2002-02-28",
    },
    {
      ...data,
      createdAt: "2022-02-13",
      updatedAt: "2002-02-29",
    },
    {
      ...data,
      createdAt: "2022-02-14",
      updatedAt: "2002-03-01",
    }
  ];

  (Tweet.find as jest.Mock).mockResolvedValue(mockTweets);

  const tweetRepository = new TweetRepository();
  
  const tweets = await tweetRepository.getAll();
  console.log(tweets);
  expect(Tweet.find).toHaveBeenCalledWith({});
  expect(tweets.length).toBe(3);
  expect(tweets[0].content).toBe("Testing Tweet");
});
