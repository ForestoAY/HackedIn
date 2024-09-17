require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://forestoay:${process.env.PASSWORD_DB}@gc01.o3iiv.mongodb.net/?retryWrites=true&w=majority&appName=GC01`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const database = client.db("gc1p3");
module.exports = database;
