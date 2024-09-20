import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query Posts {
    posts {
      _id
      content
      tags
      imgUrl
      authorId
      comments {
        content
        username
      }
      likes {
        username
      }
      createdAt
      updatedAt
      author {
        _id
        username
      }
    }
  }
`;

export const GET_POST = gql`
  query Post($id: String!) {
    post(_id: $id) {
      _id
      content
      tags
      imgUrl
      authorId
      comments {
        content
        username
        createdAt
        updatedAt
      }
      likes {
        username
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      author {
        _id
        username
      }
    }
  }
`;

export const CREATE_POST = gql`
  mutation AddPost($newPost: PostForm) {
    addPost(newPost: $newPost) {
      _id
      content
      imgUrl
      tags
      authorId
      createdAt
      updatedAt
    }
  }
`;
