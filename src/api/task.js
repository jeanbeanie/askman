/* ./src/api/task.js */
/* @flow */

/* TWILIO CONFIG */
const {
  accountSid,
  authToken,
  from,
  to,
} = require('../config').twilio;
const client = require('twilio')(accountSid, authToken);

/* MONGODB CONFIG */
const { MongoClient } = require('mongodb');
const { url, name: dbName } = require('../config').db;
// Create empty obj to hold mongo db and collection for use in funcs
const mongo = {};
// connect to db
MongoClient.connect(url, (err, db) => {
  if (err) throw err;
  // grab 'Askman' database
  const dbo = db.db(dbName);
  // grab and return 'tasks' collection
  dbo.collection('tasks', (err0, collection) => {
    if (err0) throw err0;
    mongo.collection = collection;
  });
});


/* PUBLIC TASK FUNCTIONS */
module.exports = {
  // Get all tasks from MongoDB tasks collection
  getAll: (callback: ([])=>{}) => {
    // grab everything from collection (no filter)
    mongo.collection.find().toArray((err, list) => {
      if (err) throw err;
      console.log('Retrieved all tasks in DB.');
      // pass tasks to callback func
      callback(list);
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
