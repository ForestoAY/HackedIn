const Follow = require("../models/Follow");

const followTypeDefs = `#graphql
  type Follow {
    _id: String
    followingId: String
    followerId: String
    createdAt: String
    updatedAt: String
  }

  type Mutation {
    followUser(followingId: String!, followerId: String!): Follow
  }
`;

const followResolvers = {
  Mutation: {
    followUser: async (_, args) => {
      const { followingId, followerId } = args;

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
