const Post = require("../models/Post");

const postTypeDefs = `#graphql
  type Post {
    _id: String
    content: String!
    tags: String
    imgUrl: String
    authorId: Int!
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
    authorId: Int!
  }

  type Mutation {
    addPost(newPost: PostForm): Post
  }

  type Query {
    posts: [Post],
  }
`;

const posts = [
  {
    _id: 1,
    content: "Hahahehe",
    tags: "welcome",
    imgUrl: "https://gambar.com",
    authorId: 1,
    comments: [
      {
        content: "hahahehe juga",
        username: "user2username",
      },
    ],
    likes: [
      {
        username: "user2username",
      },
    ],
  },
];

const postResolvers = {
  Query: {
    posts: async () => {
      return Post.getPosts();
    },
  },
  Mutation: {
    addPost: (_, args) => {
      const newPost = {
        ...args.newPost,
        _id: posts.length + 1,
      };
      posts.push(newPost);

      return newPost;
    },
  },
};

module.exports = {
  postTypeDefs,
  postResolvers,
};
