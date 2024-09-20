import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "./config/apolloClient";
import Navigation from "./components/Navigation";
import { AuthProvider } from "./context/auth";

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <SafeAreaProvider>
          <SafeAreaView style={{ height: "100%" }}>
            <Navigation />
          </SafeAreaView>
        </SafeAreaProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}
