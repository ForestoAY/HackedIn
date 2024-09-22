require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { userTypeDefs, userResolvers } = require("./schema/userSchema");
const { postTypeDefs, postResolvers } = require("./schema/postSchema");
const { followTypeDefs, followResolvers } = require("./schema/followSchema");
const auth = require("./middlewares/auth");

const server = new ApolloServer({
  typeDefs: [userTypeDefs, postTypeDefs, followTypeDefs],
  resolvers: [userResolvers, postResolvers, followResolvers],
  introspection: true,
});

async function run() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: process.env.PORT || 3000 },
    context: ({ req, res }) => {
      return {
        auth: async () => await auth(req),
      };
    },
  });
  console.log(`Server ready at: ${url}`);
}

run();
