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
import { GET_POST, ADD_COMMENT, ADD_LIKE } from "../apollo/postsOperation";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth";

export default function DetailPage({ navigation, route }) {
  const { postId } = route.params;
  const authContext = useContext(AuthContext);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [newComment, setNewComment] = useState({
    content: "",
  });
  const [isLiked, setIsLiked] = useState(false);

  const { loading, error, data } = useQuery(GET_POST, {
    variables: { id: postId },
  });

  const handleCommentChange = (name, value) => {
    setNewComment({
      ...newComment,
      [name]: value,
    });
  };

  const [addComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [{ query: GET_POST, variables: { id: postId } }],
  });

  const [addLike] = useMutation(ADD_LIKE, {
    refetchQueries: [{ query: GET_POST, variables: { id: postId } }],
  });

  useEffect(() => {
    if (data) {
      const likes = data.post.likes;
      setIsLiked(likes.some((like) => like._id === authContext.user?._id));
    }
  }, [data]);

  const handleAddComment = async () => {
    await addComment({
      variables: {
        postId: postId,
        newComment: { content: newComment.content },
      },
    });
    setNewComment({ content: "" });
    setShowCommentForm(false);
  };

  const handleAddLike = () => {
    addLike({
      variables: {
        postId: postId,
        newLike: {},
      },
    })
      .then(() => {
        setIsLiked(!isLiked);
      })
      .catch((err) => {
        console.error("Error adding like:", err);
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
            onPress={() => {
              navigation.push("ProfilePage", {
                id: data.post.author._id,
              });
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
          <Text style={{ marginHorizontal: 8, fontSize: 16, color: "gray" }}>
            {data.post.likes.length} likes
          </Text>
          <Text style={{ marginHorizontal: 8, fontSize: 16, color: "gray" }}>
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
          <TouchableOpacity onPress={handleAddLike}>
            <Icon
              name={isLiked ? "thumbs-up" : "thumbs-o-up"}
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
            value={newComment.content}
            onChangeText={(value) => handleCommentChange("content", value)}
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
        renderItem={({ item }) => (
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
                  id: item._id,
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
        )}
        keyExtractor={(item, index) => index.toString()} // Use unique ID as key
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
