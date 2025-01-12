import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { SEARCH_USERS } from "../apollo/usersOperation";

export default function SearchPage({ navigation }) {
  const [keyword, setKeyword] = useState("");
  const [debounced, setDebounced] = useState(keyword);
  const [searchUsers, { loading, data }] = useLazyQuery(SEARCH_USERS);

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
          fontSize: 18,
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
          </View>
        )}
      />
    </View>
  );
}
