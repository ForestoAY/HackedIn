const followTypeDefs = `#graphql
  type Follow {
    _id: Int
    followingId: String
    followerId: String
    createdAt: String
    updatedAt: String
  }

  type Query {

  }
`;

const followResolvers = {
  Query: {},
};

module.exports = {
  followTypeDefs,
  followResolvers,
};
