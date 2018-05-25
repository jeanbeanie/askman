/* ./src/api/task.js */
/* @flow */

/* Twilio configuration */
const {
  accountSid,
  authToken,
  from,
  to,
} = require('../config').twilio;
const client = require('twilio')(accountSid, authToken);

/* Mongo configuration */
const { MongoClient } = require('mongodb');
const { url, name: dbName } = require('../config').db;
// Create empty obj to hold mongo db and collection for use in funcs
const mongo = {};
// connect to db
MongoClient.connect(url, (err, db) => {
  if (err != null) { console.log('Error connecting to db', err) }
  // grab 'Askman' database
  const dbo = db.db(dbName);
  // grab and return 'tasks' collection
  dbo.collection('tasks', (err2, collection) => {
    if (err2 != null) { console.log('Error retrieving collection', err2) }
    mongo.collection = collection;
  });
});


/* PUBLIC TASK FUNCTIONS */
module.exports = {
  // Get all tasks from MongoDB tasks collection
  getAll: (callback: ([])=>{}) => {
    // grab everything from collection (no filter)
    mongo.collection.find().toArray((err, list) => {
      console.log('Retrieved all tasks in DB.');
      // pass tasks to callback func then close DB
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
