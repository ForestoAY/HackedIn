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
import { useMutation, useQuery } from "@apollo/client";
import { ADD_LIKE, GET_POSTS } from "../apollo/postsOperation";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth";

export default function HomePage({ navigation }) {
  const authContext = useContext(AuthContext);
  const { loading, error, data } = useQuery(GET_POSTS, {
    fetchPolicy: "no-cache",
  });
  const [likedPosts, setLikedPosts] = useState({});

  const [addLike] = useMutation(ADD_LIKE, {
    refetchQueries: [GET_POSTS],
  });

  useEffect(() => {
    if (data) {
      const newLikedPosts = {};
      data.posts.forEach((post) => {
        const likes = post.likes;
        newLikedPosts[post._id] = likes.some(
          (like) => like._id === authContext.user?._id
        );
      });
      setLikedPosts(newLikedPosts);
    }
  }, [data, authContext.user?._id]);

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
    <View style={styles.posts}>
      <FlatList
        style={{ marginHorizontal: 12 }}
        data={data.posts}
        keyExtractor={(post) => post._id}
        renderItem={({ item }) => {
          return (
            <View style={styles.postContainer}>
              <Text
                style={styles.username}
                onPress={() => {
                  navigation.push("ProfilePage", { id: item.author._id });
                }}
              >
                {item.author.username}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.push("Detail", { postId: item._id });
                }}
              >
                <View>
                  <Text style={styles.content}>{item.content}</Text>
                  <Image source={{ uri: item.imgUrl }} style={styles.image} />
                </View>
              </TouchableOpacity>

              <View style={styles.tagContainer}>
                {item.tags.map((tag, index) => (
                  <TouchableOpacity key={index} style={styles.tagButton}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.infoText}>{item.likes.length} likes</Text>
                <Text style={styles.infoText}>
                  {item.comments.length} comments
                </Text>
              </View>
              <View style={styles.actionContainer}>
                <TouchableOpacity
                  onPress={() => {
                    addLike({
                      variables: { postId: item._id, newLike: {} },
                    })
                      .then(() => {
                        setLikedPosts((prev) => ({
                          ...prev,
                          [item._id]: !prev[item._id],
                        }));
                      })
                      .catch((err) => {
                        console.error("Error adding like:", err);
                      });
                  }}
                >
                  <Icon
                    name={likedPosts[item._id] ? "thumbs-up" : "thumbs-o-up"}
                    size={32}
                    color="black"
                    style={styles.icon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Detail", { postId: item._id });
                  }}
                >
                  <Icon
                    name="comment-o"
                    size={32}
                    color="black"
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  posts: {
    flex: 1,

    backgroundColor: "lightgray",
  },
  postContainer: {
    backgroundColor: "white",
    marginBottom: 32,
    borderRadius: 10,
    padding: 12,
  },
  username: {
    fontSize: 24,
    marginBottom: 8,
    fontWeight: "600",
  },
  content: {
    fontSize: 16,
    marginBottom: 8,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 8,
  },
  tagButton: {
    backgroundColor: "#e0e0e0",
    borderRadius: 20,
    padding: 8,
    margin: 4,
  },
  tagText: {
    color: "black",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  infoText: {
    marginHorizontal: 8,
    fontSize: 16,
    color: "gray",
  },
  actionContainer: {
    flexDirection: "row",
    marginVertical: 4,
    paddingBottom: 8,
  },
  icon: {
    marginHorizontal: 8,
  },
});
