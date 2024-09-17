const followTypeDefs = `#graphql
  type Follow {
    _id: String
    followingId: Int
    followerId: Int
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
