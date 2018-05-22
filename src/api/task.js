/* ./src/api/task.js */
/* @flow */

const {
  accountSid, authToken, from, to,
} = require('../config').twilio;
const client = require('twilio')(accountSid, authToken);

class Task {
  // Send task ask through Twilio API
  sendSMS() {
    client.messages
      .create({
        body: 'The SMS body would be here',
        from,
        to,
      })
      .then(message => console.log(message.sid))
      .done();
  }
}

export default Task;
