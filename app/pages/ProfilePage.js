import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
  Modal,
  FlatList,
  StyleSheet,
  Pressable,
} from "react-native";
import { useQuery, useMutation } from "@apollo/client";
import { AuthContext } from "../context/auth";
import { USER } from "../apollo/usersOperation";
import { FOLLOW_USER } from "../apollo/followsOperation";

export default function ProfilePage({ navigation, route }) {
  const authContext = useContext(AuthContext);
  const { id } = route.params;
  const { loading, error, data, refetch } = useQuery(USER, {
    variables: { id },
    skip: !id,
    fetchPolicy: "network-only",
  });

  const [isFollowing, setIsFollowing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);

  const [followUser] = useMutation(FOLLOW_USER, {
    onCompleted: () => {
      refetch();
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });

  useEffect(() => {
    if (data) {
      const followers = data.user.followers;
      setIsFollowing(
        followers.some(
          (follower) => follower.followerId === authContext.user?._id
        )
      );
    }
  }, [data, authContext.user]);

  const handleFollow = async () => {
    try {
      const { data: followData } = await followUser({
        variables: { followingId: id },
      });

      if (followData?.followUser) {
        setIsFollowing(true);
        refetch();
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const openModal = (type) => {
    setModalType(type);
    const listIds =
      type === "followers"
        ? data.user.followers.map((follower) => follower.followerId)
        : data.user.followings.map((following) => following.followingId);
    setSelectedIds(listIds);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const navigateToUserProfile = (userId) => {
    navigation.push("ProfilePage", { id: userId });
  };

  const renderModalContent = () => {
    const title = modalType === "followers" ? "Followers" : "Following";

    return (
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>{title}</Text>
        <FlatList
          data={selectedIds}
          keyExtractor={(id) => id}
          renderItem={({ item: userId }) => (
            <Pressable onPress={() => navigateToUserProfile(userId)}>
              <UserDetail userId={userId} />
            </Pressable>
          )}
        />
        <Pressable style={styles.closeButton} onPress={closeModal}>
          <Text style={styles.closeButtonText}>Close</Text>
        </Pressable>
      </View>
    );
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
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View>
      <Text
        style={{
          fontSize: 32,
          marginVertical: 4,
          marginHorizontal: 12,
          fontWeight: "600",
        }}
      >
        {data?.user?.user?.username}
      </Text>
      <Text
        style={{
          fontSize: 24,
          marginVertical: 4,
          marginHorizontal: 12,
          fontWeight: "300",
        }}
      >
        {data?.user?.user?.name}
      </Text>
      {authContext.user._id !== data?.user?.user?._id ? (
        <TouchableOpacity
          style={{
            marginVertical: 8,
            backgroundColor: isFollowing ? "green" : "#83B4FF",
            width: 100,
            height: 45,
            borderRadius: 5,
            marginHorizontal: 12,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={handleFollow}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
            {isFollowing ? "Followed" : "Follow"}
          </Text>
        </TouchableOpacity>
      ) : null}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 20,
          height: 200,
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => openModal("followers")}
        >
          <Text style={{ fontSize: 28, fontWeight: "600" }}>
            {data?.user?.followers?.length}
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "300" }}>Followers</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => openModal("following")}
        >
          <Text style={{ fontSize: 28, fontWeight: "600" }}>
            {data?.user?.followings?.length}
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "300" }}>Following</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>{renderModalContent()}</View>
      </Modal>
    </View>
  );
}

function UserDetail({ userId }) {
  const { loading, error, data } = useQuery(USER, {
    variables: { id: userId },
  });

  if (loading) {
    return <ActivityIndicator size="small" />;
  }

  if (error) {
    return <Text>Error loading user</Text>;
  }

  return (
    <View style={styles.modalItem}>
      <Text style={{ fontSize: 20 }}>{data.user.user.username}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    height: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 28,
    marginBottom: 10,
    fontWeight: "bold",
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#ff5c5c",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "500",
  },
});
