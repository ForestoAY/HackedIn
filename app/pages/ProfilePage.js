import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useQuery, useMutation } from "@apollo/client";
import { AuthContext } from "../context/auth";
import { USER } from "../apollo/usersOperation";
import { FOLLOW_USER } from "../apollo/followsOperation";

export default function ProfilePage({ route }) {
  const authContext = useContext(AuthContext);
  const { id } = route.params;
  const { loading, error, data, refetch } = useQuery(USER, {
    variables: { id },
    skip: !id,
    fetchPolicy: "network-only",
  });

  const [isFollowing, setIsFollowing] = useState(false);
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

  const user = data.user.user;
  const followers = data.user.followers;
  const followings = data.user.followings;

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
        {user.username}
      </Text>
      <Text
        style={{
          fontSize: 24,
          marginVertical: 4,
          marginHorizontal: 12,
          fontWeight: "300",
        }}
      >
        {user.name}
      </Text>
      {authContext.user._id !== user._id ? (
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
      ) : (
        ""
      )}

      {/* Followers and Followings Section */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 20,
          height: 200,
          alignItems: "center",
        }}
      >
        {/* TouchableOpacity for Followers */}
        <TouchableOpacity style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 28, fontWeight: "600" }}>
            {followers.length}
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "300" }}>Followers</Text>
        </TouchableOpacity>

        {/* TouchableOpacity for Following */}
        <TouchableOpacity style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 28, fontWeight: "600" }}>
            {followings.length}
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "300" }}>Following</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
