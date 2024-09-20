import React, { useContext } from "react";
import { deleteItemAsync } from "expo-secure-store";
import { Text, TouchableOpacity, View } from "react-native";
import { useQuery } from "@apollo/client";
import { AuthContext } from "../context/auth";
import { USER } from "../apollo/usersOperation";

export default function ProfilePage({ route }) {
  const authContext = useContext(AuthContext);
  const { id } = route.params;

  const { loading, error, data } = useQuery(USER, {
    variables: { id: id },
  });

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  const { user } = data;

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
        {user.user.username}
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
        <Text style={{ fontSize: 18, fontWeight: "600" }}>
          {user.followers ? user.followers.length : 0}
        </Text>
        <Text style={{ fontSize: 16, fontWeight: "300" }}>followers</Text>
      </View>
      <View
        style={{
          marginHorizontal: 12,
          flexDirection: "row",
          alignItems: "flex-end",
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "600" }}>
          {user.following ? user.following.length : 0}
        </Text>
        <Text style={{ fontSize: 16, fontWeight: "300" }}>following</Text>
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
          <Text style={{ color: "white" }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
