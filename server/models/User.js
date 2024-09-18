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
}

module.exports = User;
