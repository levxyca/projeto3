const MongoClient = require("mongodb").MongoClient;

module.exports = class Posts {
  static async find(busca) {
    const conn = await MongoClient.connect(
      "mongodb+srv://let:123@cluster0.ltkkd.mongodb.net/posts?retryWrites=true&w=majority"
    );
    const db = conn.db();
    let result;
    if (busca)
      result = await db
        .collection("posts")
        .find({ title: new RegExp("^" + busca) })
        .toArray();
    else result = await db.collection("posts").find().toArray();
    return result;
  }

  static async insert(title, description, link) {
    const conn = await MongoClient.connect(
      "mongodb+srv://let:123@cluster0.ltkkd.mongodb.net/posts?retryWrites=true&w=majority"
    );
    const db = conn.db();
    db.collection("posts").insertOne({
      title: title,
      description: description,
      link: link,
    });
  }
};
