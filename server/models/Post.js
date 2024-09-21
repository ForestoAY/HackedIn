const { ObjectId } = require("mongodb");
const db = require("../config/mongodb");

class Post {
  static async getPosts() {
    return db
      .collection("Posts")
      .aggregate([
        {
          $lookup: {
            from: "Users",
            localField: "authorId",
            foreignField: "_id",
            as: "author",
          },
        },
        {
          $unwind: {
            path: "$author",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            "author.password": 0,
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
      ])
      .toArray();
  }

  static async addPost(content, imgUrl, tags, authorId) {
    return await db.collection("Posts").insertOne({
      content,
      imgUrl,
      tags,
      authorId,
      comments: [],
      likes: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static async getPostById(id) {
    return await db
      .collection("Posts")
      .aggregate([
        {
          $match: {
            _id: new ObjectId(id),
          },
        },
        {
          $lookup: {
            from: "Users",
            localField: "authorId",
            foreignField: "_id",
            as: "author",
          },
        },
        {
          $unwind: {
            path: "$author",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            "author.password": 0,
          },
        },
      ])
      .next();
  }

  static async addComment(postId, comment) {
    comment.createdAt = new Date();
    comment.updatedAt = new Date();
    return db
      .collection("Posts")
      .updateOne(
        { _id: new ObjectId(postId) },
        { $push: { comments: comment }, $set: { updatedAt: new Date() } }
      );
  }

  static async addLike(postId, like) {
    like.createdAt = new Date();
    like.updatedAt = new Date();
    return db
      .collection("Posts")
      .updateOne(
        { _id: new ObjectId(postId) },
        { $push: { likes: like }, $set: { updatedAt: new Date() } }
      );
  }

  static async removeLike(postId, like) {
    return db.collection("Posts").updateOne(
      { _id: new ObjectId(postId) },
      {
        $pull: { likes: { _id: like._id } },
        $set: { updatedAt: new Date() },
      }
    );
  }
}

module.exports = Post;
