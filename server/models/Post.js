const { ObjectId } = require("mongodb");
const db = require("../config/mongodb");

class Post {
  static async getPosts() {
    return db.collection("Posts").find().toArray();
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
    return await db.collection("Posts").findOne({ _id: new ObjectId(id) });
  }
}

module.exports = Post;
