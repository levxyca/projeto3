const MongoClient = require("mongodb").MongoClient;

module.exports = class Users {
  static async find(login, password) {
    const conn = await MongoClient.connect(
      "mongodb+srv://let:123@cluster0.ltkkd.mongodb.net/posts?retryWrites=true&w=majority"
    );
    const db = conn.db();
    let result;
    if ((login, password))
      result = await db
        .collection("users")
        .findOne({ user: login, pass: password });
    else result = await db.collection("login").find().toArray();
    return result;
  }

  static async findOne(login) {
    const conn = await MongoClient.connect(
      "mongodb+srv://let:123@cluster0.ltkkd.mongodb.net/posts?retryWrites=true&w=majority"
    );
    const db = conn.db();
    let result;
    if (login) result = await db.collection("users").findOne({ user: login });
    else result = await db.collection("login").find().toArray();
    return result;
  }

  static async insert(user, pass) {
    const conn = await MongoClient.connect(
      "mongodb+srv://let:123@cluster0.ltkkd.mongodb.net/posts?retryWrites=true&w=majority"
    );
    const db = conn.db();
    db.collection("users").insertOne({
      user: user,
      pass: pass,
    });
  }
};
