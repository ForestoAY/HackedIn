import { Text, TouchableOpacity, View } from "react-native";

export default function ProfilePage() {
  return (
    <View style={{ alignItems: "center" }}>
      <Text
        style={{
          marginVertical: 8,
          fontSize: 20,
        }}
      >
        User 1
      </Text>
      <TouchableOpacity
        style={{
          marginVertical: 25,
          backgroundColor: "#83B4FF",
          width: 100,
          height: 45,
          borderRadius: 5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Follow
        </Text>
      </TouchableOpacity>
    </View>
  );
}
