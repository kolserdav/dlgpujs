const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://user:1234@localhost:27017/new';


const dbName = 'new';

function mongoConnect(){
  return new Promise(resolve => {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
      assert.equal(null, err);
      resolve(client);
    });
  });
}

module.exports = { mongoConnect };