import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AddPost() {
  return (
    <>
      <View></View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="Content"
          autoCorrect={false}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Image URL"
          autoCorrect={false}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Tags"
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </>
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
    paddingVertical: 40,
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
    color: "#83B4FF",
    fontSize: 16,
  },
});
