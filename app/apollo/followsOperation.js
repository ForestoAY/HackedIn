import { gql } from "@apollo/client";

export const FOLLOW_USER = gql`
  mutation FollowUser($followingId: ID) {
    followUser(followingId: $followingId) {
      _id
      followerId
      followingId
      createdAt
      updatedAt
    }
  }
`;
