import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  uri: "http://192.168.1.6:3000/",
  cache: new InMemoryCache(),
});

export default apolloClient;
