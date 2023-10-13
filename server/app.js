console.clear()
var express = require('express');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
require('dotenv').config();
const Imap = require('node-imap');
const { simpleParser } = require('mailparser');

const app = express();

const imap = new Imap({
  user: process.env.EMAILID,
  password: process.env.PASSWORD,
  host: 'imap.gmail.com',
  port: 993,
  tls: true,
  authTimeout: 30000,
});

app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  next();
});

// parse requests of content-type - application/json
app.use(bodyParser.json({ limit: "1gb" }));

// To display image in frontend
app.use(express.static(__dirname));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/read-email", (req, res) => {
  imap.once('ready', () => {
    imap.openBox('INBOX', false, (err, mailbox) => {
      if (err) throw err;
      const searchCriteria = ['UNSEEN']; // Filter for unread emails

      // ALL, SEEN, UNSEEN, 
      // ['FROM', 'example@example.com'], 
      // ['TO', 'recipient@example.com'], 
      // ['SUBJECT', 'Your Subject'], 
      // ['SENTSINCE', '01-Jan-2023'], 
      // ['SENTBEFORE', '01-Jan-2023'],
      // ['OR', ['FROM', 'example@example.com'], ['SUBJECT', 'Your Subject']],
      // ['FROM', 'example@example.com', 'SUBJECT', 'Your Subject', 'SENTSINCE', '01-Jan-2023']

      imap.search(searchCriteria, (err, emailIds) => {
        if (err) throw err;

        // emailIds = emailIds.sort((a, b) => b - a); // Sort the email IDs in reverse order (most recent first)

        // const recentEmailIds = emailIds.slice(0, 3);  // Take the first 3 email IDs (most recent 3) and use recentEmailIds.forEach

        emailIds.forEach((emailId) => {
          const fetch = imap.fetch(emailId, { bodies: '', struct: true });
          fetch.on('message', (msg) => {
            let attachments = [];

            msg.on('body', (stream) => {
              simpleParser(stream, (err, mail) => {
                if (err) throw err;
                console.log('Subject:', mail.subject);
                console.log('Attachments:', mail.attachments[0].content.toString('utf8'));
                console.log('Body:', mail.text);
              });
            });

            msg.on('end', () => {
              // console.log('Attachments:', attachments);
            });
          });
        });
      });

      res.json("Kindly check server console to view the data");
    });
  });

  imap.connect();
});

app.get("/read-email-callback", (req, res) => {
  function fetchEmailData(callback) {
    imap.once('ready', () => {
      imap.openBox('INBOX', false, (err, mailbox) => {
        if (err) throw err;
        const searchCriteria = ['UNSEEN'];

        imap.search(searchCriteria, (err, emailIds) => {
          if (err) throw err;

          emailIds.forEach((emailId) => {

            const fetch = imap.fetch(emailId, { bodies: '' });
            fetch.on('message', (msg) => {
              let mailData = {};
              let isParsingComplete = false;

              msg.on('body', (stream) => {
                simpleParser(stream, (err, mail) => {
                  if (err) throw err;
                  mailData.attachments = mail.attachments
                  mailData.headers = mail.headers
                  mailData.headerLines = mail.headerLines
                  mailData.html = mail.html
                  mailData.text = mail.text
                  mailData.textAsHtml = mail.textAsHtml
                  mailData.subject = mail.subject
                  mailData.date = mail.date
                  mailData.to = mail.to
                  mailData.from = mail.from
                  mailData.messageId = mail.messageId
                  // attachments.push(mail.attachments[0].content.toString('utf8'));
                  if (isParsingComplete) {
                    callback(mailData);
                  }
                });
              });

              msg.on('end', () => {
                isParsingComplete = true;
                // Log email data after processing all attachments
                if (mailData.length > 0) {
                  callback(mailData);
                }
              });
            });

          });
        });
      });

      // Respond after fetching and processing emails
      // res.json("Kindly check server console to view the data");
    });

    imap.connect();
  }

  fetchEmailData((data) => {
    console.log('All mail data');
    res.json(data);
  });
});

// set port, listen for requests
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}.`);
});

// Socket Layer over Http Server
const socket = require('socket.io')(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // add this line to include winston logging

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err })
});


