import { Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../context/auth";
import { useContext } from "react";
import { deleteItemAsync } from "expo-secure-store";

export default function LogoutPage() {
  const authContext = useContext(AuthContext);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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
          authContext.setUser(null);
        }}
      >
        <Text style={{ color: "white" }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
