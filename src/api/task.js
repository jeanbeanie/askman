/* ./src/api/task.js */
/* @flow */

// Twilio configuration
const {
  accountSid,
  authToken,
  from,
  to,
} = require('../config').twilio;
const client = require('twilio')(accountSid, authToken);

// Mongo configuration
const { MongoClient } = require('mongodb');
const { url, name: dbName } = require('../config').db;

// opens MongoDB connection and returns db & collection
const openMongoGetDBCollection = (callback) => {
  // connect to db
  MongoClient.connect(url, (err, db) => {
    if (err != null) { console.log('Error connecting to db', err) }
    // grab 'Askman' database
    const dbo = db.db(dbName);
    // grab and return 'tasks' collection
    dbo.collection('tasks', (err2, collection) => {
      if (err2 != null) { console.log('Error retrieving collection', err2) }
      const obj = { db, collection };
      // pass db and collection to callback
      callback(obj);
    });
  });
};

// close MongoDB connection
const closeMongo = (db) => {
  db.close();
};


/* PUBLIC TASK FUNCTIONS */

module.exports = {
  // Get all tasks from MongoDB tasks collection
  // callback should be a function that takes an array
  getAll: (callback: ([])=>{}) => {
    openMongoGetDBCollection(({ db, collection }) => {
      // grab everything from collection (no filter)
      collection.find().toArray((err, list) => {
        console.log('Retrieved all tasks in DB.');
        // pass tasks to callback func then close DB
        callback(list);
        closeMongo(db);
      });
    });
  },

  // Send task ask through Twilio API
  sendSMS: (body: string) => {
    client.messages
      .create({
        body,
        from,
        to,
      })
      .then(message => console.log('Message sent! sid: ', message.sid))
      .done();
  },
};
