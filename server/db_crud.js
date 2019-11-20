const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const insertBundle = function(db, bundle, callback) {
  // Get the documents collection
  const collection = db.collection('bundles');
  // Insert a bundle
  collection.insertOne(bundle, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    assert.equal(1, result.ops.length);
    console.log("Inserted 1 bundle into the collection");
    callback(result);
  });
}

const findBundle = function(db, bundle, callback) {
  // Get the documents collection
  const collection = db.collection('bundles');
  // Find a bundle
  collection.find(bundle).toArray(function(err, docs) {
    assert.equal(err, null);
    callback(docs);
  });
}

// const updateBundle = function(db, bundle, callback) {
//   // Get the documents collection
//   const collection = db.collection('bundles');
//   // Update document where a is 2, set b equal to 1
//   collection.updateOne({ a : 2 }
//     , { $set: { b : 1 } }, function(err, result) {
//     assert.equal(err, null);
//     assert.equal(1, result.result.n);
//     console.log("Updated the document with the field a equal to 2");
//     callback(result);
//   });
// }

const removeDocument = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('bundles');
  // Delete bundle
  collection.deleteOne(bundle, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    callback(result);
  });    
}

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'bat';

// Create a new MongoClient
const client = new MongoClient(url, {
        useUnifiedTopology: true
    });

var dbConnect = ( dbName, callback ) => {
    // Use connect method to connect to the Server
    client.connect(function(err);
    assert.equal(null, err);
    console.log("Connected correctly to server");

    const db = client.db(dbName);

    callback(db);
}

var dbClose = ( client ) => {
    client.close();
}