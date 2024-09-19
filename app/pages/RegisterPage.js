import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
const logo = require("../assets/hacktiv8.png");

export default function RegisterPage() {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>Register</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          autoCorrect={false}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCorrect={false}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Name"
          autoCorrect={false}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>REGISTER</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.footerText}>
        Have Account?<Text style={styles.signup}> Login</Text>
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
