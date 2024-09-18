const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const User = require("../models/User");

const userTypeDefs = `#graphql
  type User {
    _id: ID
    name: String
    username: String!
    email: String!
    password: String!
  }

  type LoginResponse {
    access_token: String!
  }

  input UserForm {
    name: String,
    username: String,
    email: String,
    password: String
  }

  type Query {
    user(_id: String!): User,
    search(keyword: String!): [User]
  }

  type Mutation {
    register(newUser: UserForm): User!
    login(username: String, password: String): LoginResponse!
  }
`;

const userResolvers = {
  Query: {
    user: async (_, args) => {
      const user = await User.getUserById(args._id);
      return user;
    },
    search: async (_, args) => {
      const users = await User.searchUser(args.keyword);
      return users;
    },
  },
  Mutation: {
    register: async (_, args) => {
      const { username, email, password, name } = args.newUser;

      if (!username) {
        throw new Error("Username is required");
      }
      if (!email) {
        throw new Error("Email is required");
      }
      if (!password) {
        throw new Error("Password is required");
      }
      if (password.length < 5) {
        throw new Error("Password must have 5 characters");
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error("Invalid email format");
      }

      const existingUsername = await User.findByUsername(username);
      if (existingUsername) {
        throw new Error("Username is already in use");
      }

      const existingEmail = await User.findByEmail(email);
      if (existingEmail) {
        throw new Error("Email is already in use");
      }
      const result = await User.register(args.newUser);

      const newUserId = result.insertedId;

      const newUser = await User.getUserById(newUserId);
      return newUser;
    },
    login: async (_, args) => {
      const { username, password } = args;
      
      if (!username) {
        throw new Error("Username is required");
      }
      if (!password) {
        throw new Error("Password is required");
      }

      const user = await User.findByUsername(username);
      if (!user) {
        throw new Error("Invalid username/password");
      }
      
      const isValidPassword = await comparePassword(password, user.password);      
      if (!isValidPassword) {
        throw new Error("Invalid username/password");
      }
      
      const access_token = signToken({ _id:user._id });
      
      return { access_token };
    },
  },
};

module.exports = {
  userTypeDefs,
  userResolvers,
};
