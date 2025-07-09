import { gql } from "apollo-server";

export const typeDefs = gql`
 

  type User {
    id: ID!
    name: String!
    email: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Tweet {
    id: ID!
    content: String!
    createdAt: String!
  }

  type HashTag {
    id: ID!
    title: String!
  }

  type Like {
    id: ID!
    user: User!
    onModel: String!
    likeableId: ID!
    createdAt: String!
  }

  type Comment{
    id:ID!
    user:User!
    onModel:String!
    commentableId:ID!
    comments:[Comment!]!
    
  }

  type AuthPayload{
    token:String!
    user:User!
  }

   type Query {
    hello: String!
    me: User
    hashtags: [HashTag!]!
    hashtag(id: ID!): HashTag
    users: [User!]!
    user(id: ID!): User
    comments:[Comment!]!
    comment(id:ID!):Comment
  }

  type Mutation {
    signup(name: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    createTweet(content: String!): Tweet!
    createHashTag(data: String!): HashTag
    toggleLike(tweetId: ID!, modelType: String!, userId: ID!): Boolean!
    addComment(modelId: ID!, modelType: String!, comment: String!, userId: ID!): Comment!
  }
`;
