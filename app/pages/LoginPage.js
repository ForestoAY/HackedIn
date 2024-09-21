import { useContext, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AuthContext } from "../context/auth";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../apollo/usersOperation";
import * as SecureStore from "expo-secure-store";
const logo = require("../assets/hacktiv8.png");

export default function LoginPage({ navigation }) {
  const authContext = useContext(AuthContext);
  const [username, setUsername] = useState("foresto");
  const [password, setPassword] = useState("12121212");
  const [login, { loading }] = useMutation(LOGIN);

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          autoCorrect={false}
          autoCapitalize="none"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          autoCorrect={false}
          autoCapitalize="none"
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            try {
              const { data } = await login({
                variables: {
                  username,
                  password,
                },
              });
              await SecureStore.setItemAsync(
                "access_token",
                data.login.access_token
              );
              const userData = {
                _id: data.login.user._id,
                username: data.login.user.username,
                email: data.login.user.email,
                name: data.login.user.name,
              };
              authContext.setUser(userData);
              authContext.setIsSignedIn(true);
            } catch (error) {
              Alert.alert("error", error.message);
            }
          }}
        >
          <Text style={styles.buttonText}>
            {loading ? "LOGIN..." : "LOGIN"}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.footerText}>
        Don't Have Account?
        <Text
          style={styles.signup}
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          {" "}
          Sign Up
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "cente",
    paddingTop: 70,
    backgroundColor: "#5A72A0",
  },
  image: {
    height: 160,
    width: 170,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
    paddingVertical: 40,
    color: "#1A2130",
  },
  inputView: {
    gap: 15,
    width: "100%",
    paddingHorizontal: 40,
    marginBottom: 5,
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderColor: "#83B4FF",
    borderWidth: 1,
    borderRadius: 7,
  },
  button: {
    marginVertical: 25,
    backgroundColor: "#83B4FF",
    height: 45,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonView: {
    width: "100%",
    paddingHorizontal: 40,
  },
  footerText: {
    textAlign: "center",
    color: "#1A2130",
    fontSize: 16,
  },
  signup: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
