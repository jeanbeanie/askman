/* config.example.js */
/* @flow */

module.exports = {
  /* Default Metadata */
  app: {
    port: 3000,
    devPort: 3001,
    rootUrl: 'http://localhost:3000',
    devRootUrl: 'http://localhost:3001',
  },
  db: {
    name: 'Askman',
    url: 'mongodb://localhost:27017/',
  },
  twilio: {
    accountSid: , // Your account Sid here
    authToken: , // Your auth token here
    from: , // your twilio accepted sending number here
    to: , // a number youre allowed to send to through twilio here // TODO support sending to any number
  },
  metaData: {
    title: 'AskMan',
    metaTitle: 'AskMan',
    metaKeywords: 'ask manager, schedule text messages',
    metaDescription: 'Set it and forget it texts for managing your parner\'s unhandled commitments!',
    metaAuthor: 'Jean',
  },
};
