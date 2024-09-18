const Post = require("../models/Post");
const Redis = require("ioredis");
const redis = new Redis({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PW,
  db: 0,
});

const postTypeDefs = `#graphql
  type Post {
    _id: ID
    content: String!
    tags: [String]
    imgUrl: String
    authorId: ID!
    comments: [Comment]
    likes: [Like]
    createdAt: String
    updatedAt: String
    author: User
  }

  type Comment {
    content: String!
    username: String!
    createdAt: String
    updatedAt: String
  }

  type Like {
    username: String!
    createdAt: String
    updatedAt: String
  }

  input PostForm {
    content: String
    tags: [String]
    imgUrl: String
    authorId: ID
  }

  input CommentForm {
    content: String
    username: String
  }

  input LikeForm {
    username: String
  }

  type Mutation {
    addPost(newPost: PostForm): Post
    addComment(postId: String!, newComment: CommentForm): Post
    addLike(postId: String!, newLike: LikeForm): Post
  }

  type Query {
    posts: [Post],
    post(_id: String!): Post,
  }
`;

const postResolvers = {
  Query: {
    posts: async (_, __, contextValue) => {
      const user = await contextValue.auth();

      const cache = await redis.get("posts");

      if (cache) {
        return JSON.parse(cache);
      }

      const posts = await Post.getPosts();
      await redis.set("posts", JSON.stringify(posts));

      return posts;
    },
    post: async (_, args, contextValue) => {
      const user = await contextValue.auth();
      const post = await Post.getPostById(args._id);
      return post;
    },
  },
  Mutation: {
    addPost: async (_, args, contextValue) => {
      const user = await contextValue.auth();
      let { content, imgUrl, tags, authorId } = args.newPost;

      if (!content) {
        throw new Error("Content is required");
      }

      authorId = user._id;

      const result = await Post.addPost(content, imgUrl, tags, authorId);
      await redis.del("posts");
      const newPostId = result.insertedId;

      const newPost = await Post.getPostById(newPostId);
      return newPost;
    },
    addComment: async (_, args, contextValue) => {
      const user = await contextValue.auth();
      const { postId } = args;
      let { content, username } = args.newComment;

      if (!content) {
        throw new Error("Content is required");
      }

      username = user.username;

      await Post.addComment(postId, { content, username });
      await redis.del("posts");
      const updatedPost = await Post.getPostById(postId);
      return updatedPost;
    },
    addLike: async (_, args, contextValue) => {
      const user = await contextValue.auth();

      const { postId } = args;

      username = user.username;

      await Post.addLike(postId, { username });
      await redis.del("posts");
      const updatedPost = await Post.getPostById(postId);
      return updatedPost;
    },
  },
};

module.exports = {
  postTypeDefs,
  postResolvers,
};
