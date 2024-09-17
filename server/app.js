const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { userTypeDefs, userResolvers } = require("./schema/userSchema");
const { postTypeDefs, postResolvers } = require("./schema/postSchema");
const { followTypeDefs, followResolvers } = require("./schema/followSchema");

const server = new ApolloServer({
  typeDefs: [userTypeDefs, postTypeDefs, followTypeDefs],
  resolvers: [userResolvers, postResolvers, followResolvers],
});

startStandaloneServer(server, {
  listen: { port: 3000 },
}).then(({ url }) => {
  console.log(`Server ready at: ${url}`);
});
