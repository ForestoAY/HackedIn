import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../apollo/postsOperation";

export default function HomePage({ navigation }) {
  const { loading, error, data } = useQuery(GET_POSTS);
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{error.message}</Text>
      </View>
    );
  }
  return (
    <>
      <View style={styles.posts}>
        <FlatList
          data={data.posts}
          keyExtractor={(post) => post._id}
          renderItem={(info) => {
            const { item } = info;
            return (
              <>
                <View style={{ backgroundColor: "white", marginBottom: 32 }}>
                  <Text
                    style={{
                      fontSize: 24,
                      marginBottom: 8,
                      paddingHorizontal: 12,
                      fontWeight: "600",
                    }}
                    onPress={() => {
                      navigation.push("ProfilePage", {
                        id: item.author._id,
                      });
                    }}
                  >
                    {item.author.username}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Detail", {
                        postId: item._id,
                      });
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          fontSize: 16,
                          marginBottom: 8,
                          paddingHorizontal: 12,
                        }}
                      >
                        {item.content}
                      </Text>
                      <Image
                        source={{ uri: item.imgUrl }}
                        style={{ width: "100%", height: 400 }}
                      />
                    </View>
                  </TouchableOpacity>
                  <View>
                    <Text>{item.tags}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      marginVertical: 4,
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        marginHorizontal: 8,
                        fontSize: 16,
                        color: "gray",
                      }}
                    >
                      {item.likes.length} likes
                    </Text>
                    <Text
                      style={{
                        marginHorizontal: 8,
                        fontSize: 16,
                        color: "gray",
                      }}
                    >
                      {item.comments.length} comments
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      marginVertical: 4,
                      paddingBottom: 8,
                    }}
                  >
                    <TouchableOpacity>
                      <Icon
                        name="thumbs-o-up"
                        size={32}
                        color="black"
                        style={{ marginHorizontal: 8 }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("Detail", {
                          postId: item._id,
                        });
                      }}
                    >
                      <Icon
                        name="comment-o"
                        size={32}
                        color="black"
                        style={{ marginHorizontal: 8 }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            );
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  navbar: {
    height: 72,
    backgroundColor: "#83B4FF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  posts: {
    flex: 1,
    backgroundColor: "lightgray",
  },
});
