const { ObjectId } = require("mongodb");
const db = require("../config/mongodb");
const { hashPassword } = require("../helpers/bcrypt");

class User {
  static async register(newUser) {
    const objNewUser = {
      ...newUser,
      password: await hashPassword(newUser.password),
    };
    return await db.collection("Users").insertOne(objNewUser);
  }

  static async findByEmail(email) {
    return await db.collection("Users").findOne({ email });
  }

  static async findByUsername(username) {
    return await db.collection("Users").findOne({ username });
  }

  static async searchUser(keyword) {
    const searchRegex = new RegExp(keyword, "i");
    return await db
      .collection("Users")
      .find({
        $or: [
          { username: { $regex: searchRegex } },
          { name: { $regex: searchRegex } },
        ],
      })
      .toArray();
  }

  static async getUserById(id) {
    return await db.collection("Users").findOne({ _id: new ObjectId(id) });
  }

  static async getUserWithFollow(id) {
    const [user, followers, followings] = await Promise.all([
      this.getUserById(id),
      db
        .collection("Follow")
        .aggregate([
          {
            $match: {
              followingId: new ObjectId(id),
            },
          },
          {
            $lookup: {
              from: "Follow",
              localField: "_id",
              foreignField: "followingId",
              as: "follower",
            },
          },
          {
            $unwind: {
              path: "$follower",
              preserveNullAndEmptyArrays: true,
            },
          },
        ])
        .toArray(),
      db
        .collection("Follow")
        .aggregate([
          {
            $match: {
              followerId: new ObjectId(id),
            },
          },
          {
            $lookup: {
              from: "Follow",
              localField: "_id",
              foreignField: "followerId",
              as: "following",
            },
          },
          {
            $unwind: {
              path: "$following",
              preserveNullAndEmptyArrays: true,
            },
          },
        ])
        .toArray(),
    ]);
    return {
      user,
      followers,
      followings,
    };
  }
}

module.exports = User;
