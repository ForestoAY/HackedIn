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
        _id
        content
        username
        createdAt
        updatedAt
      }
      likes {
        _id
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

export const GET_POST = gql`
  query Post($id: String!) {
    post(_id: $id) {
      _id
      content
      tags
      imgUrl
      authorId
      comments {
        _id
        content
        username
        createdAt
        updatedAt
      }
      likes {
        _id
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

export const ADD_COMMENT = gql`
  mutation AddComment($postId: String!, $newComment: CommentForm!) {
    addComment(postId: $postId, newComment: $newComment) {
      _id
      content
      imgUrl
      tags
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
    }
  }
`;

export const ADD_LIKE = gql`
  mutation AddLike($postId: String!, $newLike: LikeForm) {
    addLike(postId: $postId, newLike: $newLike) {
      _id
      content
      imgUrl
      tags
      authorId
      comments {
        content
        username
        createdAt
        updatedAt
        _id
      }
      likes {
        username
        createdAt
        updatedAt
        _id
      }
      createdAt
      updatedAt
    }
  }
`;
