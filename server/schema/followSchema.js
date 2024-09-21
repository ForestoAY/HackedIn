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
      const { followingId } = args;
      const { _id: followerId } = user;

      if (followerId.toString() === followingId.toString()) {
        throw new Error("You can't follow yourself");
      }

      const isAlreadyFollowing = await Follow.isFollowing(
        followingId,
        followerId
      );

      const followedUser = await User.getUserById(followingId);
      if (!followedUser) throw new Error("User not found");

      if (isAlreadyFollowing) {
        await Follow.removeFollow(followingId, followerId);
        return {};
      } else {
        const result = await Follow.addFollow(followingId, followerId);
        const newFollow = await Follow.getFollowById(result.insertedId);
        return newFollow;
      }
    },
  },
};

module.exports = {
  followTypeDefs,
  followResolvers,
};
