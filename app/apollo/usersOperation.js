import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      access_token
    }
  }
`;

export const REGISTER = gql`
  mutation Register($newUser: UserForm) {
    register(newUser: $newUser) {
      _id
      username
      email
      name
    }
  }
`;

export const SEARCH_USERS = gql`
  query Search($keyword: String!) {
    search(keyword: $keyword) {
      _id
      email
      name
      username
    }
  }
`;

export const FIND_BY_USERNAME = gql`
  query findByUsername($username: String!) {
    findByUsername(username: $username) {
      _id
      name
      username
      email
      password
      following {
        _id
        followingId
        followerId
        createdAt
        updatedAt
      }
      followers {
        _id
        followingId
        followerId
        createdAt
        updatedAt
      }
    }
  }
`;
