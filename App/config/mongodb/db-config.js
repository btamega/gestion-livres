
const MongoClient = require('mongodb').MongoClient;
/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */


async function connectMongoDB()  {
    const filter = {};
    const client = await MongoClient.connect(
      'mongodb://localhost:27017/',
      { useNewUrlParser: true, useUnifiedTopology: true}
    );
    console.log("Successfully connected");
    const coll = client.db('livres').collection('firstCollection');
    const cursor = coll.find(filter);
    const result = await cursor.toArray();
    await client.close();
    console.log(coll);
}
module.exports = connectMongoDB;

