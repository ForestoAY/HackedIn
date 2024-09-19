import { View, Text, StyleSheet, TextInput } from "react-native";

export default function SearchPage() {
  return (
    <>
      <View>
        <TextInput
          style={{
            marginVertical: 8,
            height: 50,
            marginHorizontal: 12,
            paddingHorizontal: 20,
            borderColor: "#83B4FF",
            borderWidth: 1,
            borderRadius: 7,
          }}
          placeholder="Search users"
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>User here</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 8,
    marginHorizontal: 12,
  },
  text: {
    fontSize: 20,
  },
});
