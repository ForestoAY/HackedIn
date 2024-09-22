import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getItemAsync } from "expo-secure-store";

const httpLink = createHttpLink({
  uri: "http://52.65.58.82/",
});

const authLink = setContext(async (_, { headers }) => {
  const token = await getItemAsync("access_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default apolloClient;
