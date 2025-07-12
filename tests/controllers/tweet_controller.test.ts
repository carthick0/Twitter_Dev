// tests/resolvers/tweet_resolver.test.ts
import { resolvers } from "../../src/resolvers/resolver";
import * as TweetService from "../../src/services/tweet_service";

jest.mock("../../src/services/tweet_service");

describe("Tweet Resolver - createTweet", () => {
  test("should create tweet via resolver", async () => {
    const input = { content: "Hello" };

    const mockTweet = {
      ...input,
      createdAt: "2024-07-09",
      updatedAt: "2025-07-06",
    };

    (TweetService.createTweet as jest.Mock).mockResolvedValue(mockTweet);

    const result = await resolvers.Mutation.createTweet({}, input, {} as any);

    expect(TweetService.createTweet).toHaveBeenCalledWith(input);
    expect(result.content).toBe("Hello");
    expect(result.createdAt).toBe("2024-07-09");
  });
});
