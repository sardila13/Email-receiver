var MailListener = require("mail-listener-next");
 
var mailListener = new MailListener({
  username: "sardila9623@gmail.com",
  password: "Mechitas1",
  host: "imap.gmail.com",
  port: 993, // imap port
  tls: true,
  ssl: true,
  connTimeout: 10000, // Default by node-imap
  authTimeout: 5000, // Default by node-imap,
  debug: console.log, // Or your custom function with only one incoming argument. Default: null
  tlsOptions: { rejectUnauthorized: false },
  mailbox: "INBOX", // mailbox to monitor
  searchFilter: ["UNSEEN", "FLAGGED"], // the search filter being used after an IDLE notification has been retrieved
  fetchUnreadOnStart: true, // use it only if you want to get all unread email on lib start. Default is `false`,
  mailParserOptions: {streamAttachments: true}, // options to be passed to mailParser lib.
  attachments: true, // download attachments as they are encountered to the project directory
  attachmentOptions: { directory: "attachments/" }, // specify a download directory for attachments
  // to make server respond to other requests you may want
  // to pause for 'fetchingPauseTime' fetching of the email, because it 'hangs' your app
  fetchingPauseThreshold: null, // amount bytes
  fetchingPauseTime: 5000 // ms to pause fetching and process other requests
});
 
mailListener.start(); // start listening
 
// stop listening
//mailListener.stop();
 
mailListener.on("server:connected", function(){
  console.log("imapConnected");
});
 
mailListener.on("server:disconnected", function(){
  console.log("imapDisconnected");
});
 
mailListener.on("error", function(err){
  console.log(err);
});
 
mailListener.on("mail", function(mail, seqno, attributes){
  // do something with mail object including attachments
  console.log("emailParsed", mail);
  // mail processing code goes here
});
 
mailListener.on("attachment", function(attachment, email){
  console.log(attachment.path);
});
 
// it's possible to access imap object from node-imap library for performing additional actions. E.x.
//mailListener.imap.move(msguids, mailboxes, function(){})