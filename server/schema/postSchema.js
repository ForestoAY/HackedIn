const Post = require("../models/Post");

const postTypeDefs = `#graphql
  type Post {
    _id: String
    content: String!
    tags: String
    imgUrl: String
    authorId: String!
    comments: [Comment]
    likes: [Like]
    createdAt: String
    updatedAt: String
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
    content: String!, 
    tags: String!, 
    imgUrl: String!, 
    authorId: String!
  }

  input CommentForm {
    content: String!,
    username: String!
  }

  type Mutation {
    addPost(newPost: PostForm): Post
    addComment(postId: String!, newComment: CommentForm!): Post
  }

  type Query {
    posts: [Post],
    post(_id: String!): Post,
  }
`;

const postResolvers = {
  Query: {
    posts: async () => {
      return Post.getPosts();
    },
    post: async (_, args) => {
      const post = await Post.getPostById(args._id);
      return post;
    },
  },
  Mutation: {
    addPost: async (_, args) => {
      const { content, imgUrl, tags, authorId } = args.newPost;

      if (!content) {
        throw new Error("Content is required");
      }

      if (!authorId) {
        throw new Error("AuthorId is required");
      }

      const result = await Post.addPost(content, imgUrl, tags, authorId);

      const newPostId = result.insertedId;

      const newPost = await Post.getPostById(newPostId);
      return newPost;
    },
    addComment: async (_, args) => {
      const { postId } = args;
      const { content, username } = args.newComment;

      if (!content) {
        throw new Error("Content is required");
      }

      if (!username) {
        throw new Error("Username is required");
      }

      await Post.addComment(postId, { content, username });

      const updatedPost = await Post.getPostById(postId);
      return updatedPost;
    },
  },
};

module.exports = {
  postTypeDefs,
  postResolvers,
};
