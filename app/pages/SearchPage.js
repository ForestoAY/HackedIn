import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
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

export default function SearchPage({ navigation }) {
  const [keyword, setKeyword] = useState("");
  const [debounced, setDebounced] = useState(keyword);
  const [searchUsers, { loading, error, data }] = useLazyQuery(SEARCH_USERS);

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
        }}
        placeholder="Search users"
        autoCorrect={false}
        autoCapitalize="none"
        value={keyword}
        onChangeText={setKeyword}
      />

      {loading && <ActivityIndicator size="large" color="#83B4FF" />}

      {/* List of users */}
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
                    username: item.username,
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
                    username: item.username,
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
              onPress={() => {
                console.log(`Follow ${item.name}`);
              }}
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
