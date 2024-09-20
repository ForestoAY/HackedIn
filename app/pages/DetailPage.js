import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useMutation, useQuery } from "@apollo/client";
import { GET_POST, ADD_COMMENT } from "../apollo/postsOperation";
import { useState } from "react";

export default function DetailPage({ navigation, route }) {
  const { postId } = route.params;
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [newComment, setNewComment] = useState("");

  const { loading, error, data } = useQuery(GET_POST, {
    variables: { id: postId },
  });

  const [addComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [{ query: GET_POST, variables: { id: postId } }],
  });

  const handleAddComment = () => {
    if (newComment.trim() === "") return;

    addComment({
      variables: {
        postId: postId,
        newComment: { content: newComment },
      },
    })
      .then(() => {
        setNewComment("");
        setShowCommentForm(false);
      })
      .catch((err) => {
        console.error("Error menambahkan komentar:", err);
      });
  };

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
      <View style={{ backgroundColor: "white", marginVertical: 16 }}>
        <View>
          <Text
            style={{
              fontSize: 24,
              marginBottom: 8,
              paddingHorizontal: 12,
              fontWeight: "600",
            }}
          >
            {data.post.author.username}
          </Text>
          <Text
            style={{
              fontSize: 16,
              marginBottom: 8,
              paddingHorizontal: 12,
            }}
          >
            {data.post.content}
          </Text>
          <Image
            source={{ uri: data.post.imgUrl }}
            style={{ width: "100%", height: 400 }}
          />
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
            {data.post.likes.length} likes
          </Text>
          <Text
            style={{
              marginHorizontal: 8,
              fontSize: 16,
              color: "gray",
            }}
          >
            {data.post.comments.length} comments
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
            onPress={() => setShowCommentForm(!showCommentForm)}
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

      {showCommentForm && (
        <View style={{ paddingHorizontal: 16, marginVertical: 8 }}>
          <TextInput
            value={newComment}
            onChangeText={(text) => setNewComment(text)}
            placeholder="Add a comment"
            style={{
              borderColor: "gray",
              borderWidth: 1,
              borderRadius: 4,
              padding: 8,
              marginBottom: 8,
            }}
          />
          <TouchableOpacity
            onPress={handleAddComment}
            style={{
              backgroundColor: "#83B4FF",
              height: 45,
              borderRadius: 5,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
              Submit Comment
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={data.post.comments}
        renderItem={(info) => {
          const { item } = info;
          return (
            <View style={{ marginVertical: 8 }}>
              <Text
                style={{
                  fontSize: 20,
                  marginBottom: 8,
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
                  fontSize: 16,
                  marginBottom: 8,
                  paddingHorizontal: 12,
                  fontWeight: "300",
                }}
              >
                {item.content}
              </Text>
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No comments yet
          </Text>
        }
      />
    </>
  );
}
