const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const typeDefs = `#graphql
  type User {
    _id: String
    name: String
    username: String!
    email: String!
    password: String!
  }

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
    users: [User],
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

const users = [
  {
    _id: 1,
    name: "user1",
    username: "user1username",
    email: "user1@mail.com",
    password: "12121212",
  },
  {
    _id: 2,
    name: "user2",
    username: "user2username",
    email: "user2@mail.com",
    password: "12121212",
  },
];

const resolvers = {
  Query: {
    users: () => users,
    posts: () => posts,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 3000 },
}).then(({ url }) => {
  console.log(`Server ready at: ${url}`);
});
