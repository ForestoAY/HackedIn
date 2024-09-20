import React, { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { SEARCH_USERS } from "../apollo/usersOperation";
import { FOLLOW_USER } from "../apollo/followsOperation";

export default function SearchPage({ navigation }) {
  const [keyword, setKeyword] = useState("");
  const [debounced, setDebounced] = useState(keyword);
  const [searchUsers, { loading, data }] = useLazyQuery(SEARCH_USERS);
  const [followUser] = useMutation(FOLLOW_USER);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(keyword);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [keyword]);

  useEffect(() => {
    if (debounced) {
      searchUsers({ variables: { keyword: debounced } });
    }
  }, [debounced, searchUsers]);

  const handleFollow = async (followingId) => {
    try {
      const { data } = await followUser({
        variables: { followingId },
      });
      console.log(`Followed user: ${data.followUser.followingId}`);
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput
        style={{
          height: 50,
          marginVertical: 8,
          paddingHorizontal: 20,
          borderColor: "#83B4FF",
          borderWidth: 1,
          borderRadius: 7,
        }}
        placeholder="Search users"
        autoCorrect={false}
        autoCapitalize="none"
        value={keyword}
        onChangeText={setKeyword}
      />

      {loading && <ActivityIndicator size="large" color="#83B4FF" />}

      <FlatList
        data={data?.search || []}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 8,
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 24,
                  paddingHorizontal: 12,
                  fontWeight: "600",
                }}
                onPress={() => {
                  navigation.push("ProfilePage", {
                    id: item._id,
                  });
                }}
              >
                {item.username}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  marginBottom: 8,
                  color: "gray",
                  paddingHorizontal: 12,
                  fontWeight: "600",
                }}
                onPress={() => {
                  navigation.push("ProfilePage", {
                    id: item._id,
                  });
                }}
              >
                {item.name}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                backgroundColor: "#83B4FF",
                borderRadius: 5,
                height: 30,
                alignItems: "center",
              }}
              onPress={() => handleFollow(item._id)} // Pass the ID of the user to follow
            >
              <Icon
                name="plus"
                size={20}
                color="white"
                style={{ marginHorizontal: 4, marginStart: 4 }}
              />
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  fontWeight: "bold",
                  marginEnd: 8,
                }}
              >
                Follow
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
