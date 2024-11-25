const { gql } = require('apollo-server-express');

const typeDefs = gql`
 type Post {
  id: ID!
  title: String!
  author: String!
  url: String!
  createdAt: String!
  comments: [Comment!]!
}

type Comment {
  id: ID!
  content: String!
  name: String!
  createdAt: String!
  postId: ID!
}

type Query {
  posts(order: String): [Post!]!
  comments(postId: ID!): [Comment!]!
}

type Mutation {
  createPost(author: String!, url: String!, title: String!): Post!
  createComment(postId: ID!, content: String!, name: String!): Comment!
  deletePost(id: ID!): Boolean!
  deleteComment(id: ID!): Boolean!
}

`;

module.exports = typeDefs;
