const userTypeDefs = `#graphql
  type User {
    _id: String
    name: String
    username: String!
    email: String!
    password: String!
  }

  type Query {
    users: [User],
    search(username: String!): [User]
  }
`;

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

const userResolvers = {
  Query: {
    users: () => users,
    search: (_, args) => {
      return users.filter((user) =>
        user.username.toLowerCase().includes(args.username.toLowerCase())
      );
    },
  },
};

module.exports = {
  userTypeDefs,
  userResolvers,
};
