const { ObjectId } = require("mongodb");
const db = require("../config/mongodb");

class Follow {
  static async addFollow(followingId, followerId) {
    return await db.collection("Follow").insertOne({
      followingId: new ObjectId(followingId),
      followerId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static async getFollows() {
    return await db.collection("Follow").find().toArray();
  }

  static async getFollowById(id) {
    return await db.collection("Follow").findOne({ _id: new ObjectId(id) });
  }
}

module.exports = Follow;
