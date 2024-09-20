import { deleteItemAsync } from "expo-secure-store";
import { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../context/auth";

export default function ProfilePage() {
  const authContext = useContext(AuthContext);
  return (
    <View>
      <Text
        style={{
          fontSize: 28,
          marginVertical: 8,
          marginHorizontal: 12,
          fontWeight: "600",
        }}
      >
        User 2358
      </Text>
      <TouchableOpacity
        style={{
          marginVertical: 8,
          backgroundColor: "#83B4FF",
          width: 100,
          height: 45,
          borderRadius: 5,
          marginHorizontal: 12,
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
      <View
        style={{
          marginHorizontal: 12,
          flexDirection: "row",
          alignItems: "flex-end",
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "600" }}>999 </Text>
        <Text style={{ fontSize: 16, fontWeight: "300" }}>connections</Text>
      </View>
      <View>
        <TouchableOpacity
          style={{
            marginVertical: 8,
            backgroundColor: "red",
            width: 100,
            height: 45,
            borderRadius: 5,
            marginHorizontal: 12,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={async () => {
            await deleteItemAsync("access_token");
            authContext.setIsSignedIn(false);
          }}
        >
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
