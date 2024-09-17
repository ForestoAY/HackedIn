const db = require("../config/mongodb");

class Post {
  static async getPosts(){
    return db.collection("Posts").find().toArray();
  }

  static async addPost(){
    
  }
}

module.exports = Post;
