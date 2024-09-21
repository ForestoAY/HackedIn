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
  const [newComment, setNewComment] = useState({ content: "" });
  const [isLiked, setIsLiked] = useState(false);

  const { loading, error, data } = useQuery(GET_POST, {
    variables: { id: postId },
  });

  const handleCommentChange = (name, value) => {
    setNewComment({ ...newComment, [name]: value });
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
      variables: { postId: postId, newLike: {} },
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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>{error.message}</Text>
      </View>
    );
  }

  return (
    <>
      <View style={styles.postContainer}>
        <Text
          style={styles.username}
          onPress={() => {
            navigation.push("ProfilePage", { id: data.post.author._id });
          }}
        >
          {data.post.author.username}
        </Text>
        <Text style={styles.content}>{data.post.content}</Text>
        <Image source={{ uri: data.post.imgUrl }} style={styles.image} />

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>{data.post.likes.length} likes</Text>
          <Text style={styles.infoText}>
            {data.post.comments.length} comments
          </Text>
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity onPress={handleAddLike}>
            <Icon
              name={isLiked ? "thumbs-up" : "thumbs-o-up"}
              size={32}
              color="black"
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowCommentForm(!showCommentForm)}
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

      {showCommentForm && (
        <View style={styles.commentFormContainer}>
          <TextInput
            value={newComment.content}
            onChangeText={(value) => handleCommentChange("content", value)}
            placeholder="Add a comment"
            style={styles.commentInput}
          />
          <TouchableOpacity
            onPress={handleAddComment}
            style={styles.submitButton}
          >
            <Text style={styles.submitButtonText}>Submit Comment</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={data.post.comments}
        renderItem={({ item }) => (
          <View style={styles.commentContainer}>
            <Text
              style={styles.commentUsername}
              onPress={() => {
                navigation.push("ProfilePage", { id: item._id });
              }}
            >
              {item.username}
            </Text>
            <Text style={styles.commentContent}>{item.content}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.flatListContainer}
        ListEmptyComponent={
          <Text style={styles.emptyCommentsText}>No comments yet</Text>
        }
      />
    </>
  );
}

const styles = {
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  postContainer: {
    backgroundColor: "white",
    marginVertical: 16,
    padding: 12,
    borderRadius: 10,
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
    height: 400,
    borderRadius: 10,
  },
  infoContainer: {
    flexDirection: "row",
    marginVertical: 4,
    justifyContent: "space-between",
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
  commentFormContainer: {
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  commentInput: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  submitButton: {
    backgroundColor: "#83B4FF",
    height: 45,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  commentContainer: {
    marginVertical: 8,
  },
  commentUsername: {
    fontSize: 20,
    marginBottom: 8,
    fontWeight: "600",
  },
  commentContent: {
    fontSize: 16,
    fontWeight: "300",
  },
  flatListContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  emptyCommentsText: {
    textAlign: "center",
    marginTop: 20,
  },
};
