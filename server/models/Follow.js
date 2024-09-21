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

  static async removeFollow(followingId, followerId) {
    return await db.collection("Follow").deleteOne({
      followingId: new ObjectId(followingId),
      followerId: new ObjectId(followerId),
    });
  }

  static async isFollowing(followingId, followerId) {
    const follow = await db.collection("Follow").findOne({
      followingId: new ObjectId(followingId),
      followerId: new ObjectId(followerId),
    });
    return follow !== null;
  }

  static async getFollows() {
    return await db.collection("Follow").find().toArray();
  }

  static async getFollowById(id) {
    return await db.collection("Follow").findOne({ _id: new ObjectId(id) });
  }
}

module.exports = Follow;
