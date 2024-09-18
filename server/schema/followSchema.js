const Follow = require("../models/Follow");
const User = require("../models/User");

const followTypeDefs = `#graphql
  type Follow {
    _id: String
    followingId: ID
    followerId: ID
    createdAt: String
    updatedAt: String
  }

  type Mutation {
    followUser(followingId: ID, followerId: ID): Follow
  }
`;

const followResolvers = {
  Mutation: {
    followUser: async (_, args, contextValue) => {
      const user = await contextValue.auth();
      let { followingId, followerId } = args;
      followerId = user._id;

      const followedUser = await User.getUserById(followingId);
      if (!followedUser) throw new Error("User not found");

      const result = await Follow.addFollow(followingId, followerId);

      const newFollowId = result.insertedId;

      const newFollow = await Follow.getFollowById(newFollowId);
      return newFollow;
    },
  },
};

module.exports = {
  followTypeDefs,
  followResolvers,
};
