const postTypeDefs = `#graphql
  type Post {
    _id: String
    content: String
    tags: String
    imgUrl: String
    authorId: String
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

  type Follow {
    _id: String
    followingId: String
    followerId: String
    createdAt: String
    updatedAt: String
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
    posts: () => posts,
  },
};

module.exports = {
  postTypeDefs,
  postResolvers,
};
