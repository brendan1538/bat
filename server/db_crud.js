const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'bat';

// Create a new MongoClient
const client = new MongoClient(url, {
    useUnifiedTopology: true
})

module.exports = {
    mongodbCRUD: function(obj, operation, func) {
        MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
            assert.equal(null, err);
            let dbo = db.db('bat');
            switch (operation) {
                case "create":
                    dbo.collection('bundles').insertOne(obj, (err, res) => {
                        if(err) throw err;
                        console.log('Inserted 1 document');
                        db.close();
                    });
                    break;
                case "read":
                    console.log('func');
                    dbo.collection("bundles").find(obj).toArray((err, result) => {
                        if(err) throw err;
                        db.close();
                        return func(result);
                    })
                    break;
                case "update":
                    break;
                case "delete":
                    break;
                default:
                    break;
            }
        }); 
    }
}