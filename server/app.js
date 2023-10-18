console.clear()
var express = require('express');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
require('dotenv').config();
const Imap = require('node-imap');
const { simpleParser } = require('mailparser');
const fs = require('fs');
var XLSX = require('xlsx');
const app = express();
xls_utils = XLSX.utils;

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

// setInterval(async function () {
//   var filepath1 = './files/INKION_2_21-09-2023_120011_INTRADAY comments 1.xls';
//   var workbook1 = XLSX.readFile(filepath1);
//   var sheet1 = workbook1.Sheets[workbook1.SheetNames[0]];

//   try {
//     var rowNum = 2

//     var c1 = sheet1[xls_utils.encode_cell({ c: 0, r: rowNum })] ? sheet1[xls_utils.encode_cell({ c: 0, r: rowNum })]['v'] : "";
//     var c2 = sheet1[xls_utils.encode_cell({ c: 1, r: rowNum })] ? sheet1[xls_utils.encode_cell({ c: 1, r: rowNum })]['v'] : "";
//     var c3 = sheet1[xls_utils.encode_cell({ c: 2, r: rowNum })] ? sheet1[xls_utils.encode_cell({ c: 2, r: rowNum })]['v'] : "";
//     var c4 = sheet1[xls_utils.encode_cell({ c: 3, r: rowNum })] ? sheet1[xls_utils.encode_cell({ c: 3, r: rowNum })]['v'] : "";
//     var c5 = sheet1[xls_utils.encode_cell({ c: 4, r: rowNum })] ? sheet1[xls_utils.encode_cell({ c: 4, r: rowNum })]['v'] : "";
//     var c6 = sheet1[xls_utils.encode_cell({ c: 5, r: rowNum })] ? sheet1[xls_utils.encode_cell({ c: 5, r: rowNum })]['v'] : "";
//     var c7 = sheet1[xls_utils.encode_cell({ c: 6, r: rowNum })] ? sheet1[xls_utils.encode_cell({ c: 6, r: rowNum })]['v'] : "";
//     var c8 = sheet1[xls_utils.encode_cell({ c: 7, r: rowNum })] ? sheet1[xls_utils.encode_cell({ c: 7, r: rowNum })]['v'] : "";
//     var c9 = sheet1[xls_utils.encode_cell({ c: 8, r: rowNum })] ? sheet1[xls_utils.encode_cell({ c: 8, r: rowNum })]['v'] : "";
//     var c10 = sheet1[xls_utils.encode_cell({ c: 9, r: rowNum })] ? sheet1[xls_utils.encode_cell({ c: 9, r: rowNum })]['v'] : "";;
//     var c11 = sheet1[xls_utils.encode_cell({ c: 10, r: rowNum })] ? sheet1[xls_utils.encode_cell({ c: 10, r: rowNum })]['v'] : "";;
//     var c12 = sheet1[xls_utils.encode_cell({ c: 11, r: rowNum })] ? sheet1[xls_utils.encode_cell({ c: 11, r: rowNum })]['v'] : "";;
//     var c13 = sheet1[xls_utils.encode_cell({ c: 12, r: rowNum })] ? sheet1[xls_utils.encode_cell({ c: 12, r: rowNum })]['v'] : "";;
//     var c14 = sheet1[xls_utils.encode_cell({ c: 13, r: rowNum })] ? sheet1[xls_utils.encode_cell({ c: 13, r: rowNum })]['v'] : "";;
//     var c15 = sheet1[xls_utils.encode_cell({ c: 14, r: rowNum })] ? sheet1[xls_utils.encode_cell({ c: 14, r: rowNum })]['v'] : "";;
//     var c16 = sheet1[xls_utils.encode_cell({ c: 15, r: rowNum })] ? sheet1[xls_utils.encode_cell({ c: 15, r: rowNum })]['v'] : "";;
//     var c17 = sheet1[xls_utils.encode_cell({ c: 16, r: rowNum })] ? sheet1[xls_utils.encode_cell({ c: 16, r: rowNum })]['v'] : "";;
//     var c18 = sheet1[xls_utils.encode_cell({ c: 17, r: rowNum })] ? sheet1[xls_utils.encode_cell({ c: 17, r: rowNum })]['v'] : "";;
//     var c19 = sheet1[xls_utils.encode_cell({ c: 18, r: rowNum })] ? sheet1[xls_utils.encode_cell({ c: 18, r: rowNum })]['v'] : "";;
//     var c20 = sheet1[xls_utils.encode_cell({ c: 19, r: rowNum })] ? sheet1[xls_utils.encode_cell({ c: 19, r: rowNum })]['v'] : "";;
//     var c21 = sheet1[xls_utils.encode_cell({ c: 20, r: rowNum })] ? sheet1[xls_utils.encode_cell({ c: 20, r: rowNum })]['v'] : "";;
//     var c22 = sheet1[xls_utils.encode_cell({ c: 21, r: rowNum })] ? sheet1[xls_utils.encode_cell({ c: 21, r: rowNum })]['v'] : "";;
//     var c23 = sheet1[xls_utils.encode_cell({ c: 22, r: rowNum })] ? sheet1[xls_utils.encode_cell({ c: 22, r: rowNum })]['v'] : "";;
//     var c24 = sheet1[xls_utils.encode_cell({ c: 23, r: rowNum })] ? sheet1[xls_utils.encode_cell({ c: 23, r: rowNum })]['v'] : "";;
//     var c25 = sheet1[xls_utils.encode_cell({ c: 24, r: rowNum })] ? sheet1[xls_utils.encode_cell({ c: 24, r: rowNum })]['v'] : "";;
//     var c26 = sheet1[xls_utils.encode_cell({ c: 25, r: rowNum })] ? sheet1[xls_utils.encode_cell({ c: 25, r: rowNum })]['v'] : "";;
//     var c27 = sheet1[xls_utils.encode_cell({ c: 26, r: rowNum })] ? sheet1[xls_utils.encode_cell({ c: 26, r: rowNum })]['v'] : "";;

//     var finalData = `${c1} \n ${c2} \n ${c3} \n ${c4} \n ${c5} \n ${c6} \n ${c7} \n ${c8} \n ${c9} \n ${c10} \n ${c11} \n ${c12} \n ${c13} \n ${c14} \n ${c15} \n ${c16} \n ${c17} \n ${c18} \n ${c19} \n ${c20} \n ${c21} \n ${c22} \n ${c23} \n ${c24} \n ${c25} \n ${c26} \n ${c27}`

//     console.log("------------------------------------------------------------");
//     console.log(finalData);
//   }
//   catch (ex) {
//     console.log(ex)
//   }
// }, 4000);


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

        if (emailIds.length == 0) {
          return callback(null);
        }

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

          if (emailIds.length == 0) {
            return callback(null);
          }

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
    console.log('Data sent');
    if (data) {
      res.json(data);
    } else {
      res.json("No mail found")
    }
  });
});

app.get("/read-save-email-callback", (req, res) => {
  function fetchEmailData(callback) {
    imap.once('ready', () => {
      imap.openBox('INBOX', false, (err, mailbox) => {
        if (err) throw err;
        const searchCriteria = ['UNSEEN'];

        imap.search(searchCriteria, (err, emailIds) => {
          if (err) throw err;

          if (emailIds.length == 0) {
            return callback(null);
          }

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

                  if (mailData.attachments && mailData.attachments.length > 0) {
                    // Save email attachments to files
                    saveAttachmentsToFiles(mailData.attachments);
                  }

                  // Mark as read in the indox
                  imap.addFlags(emailId, '\Seen', (err) => {
                    if (err) throw err;
                  });


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
  function saveAttachmentsToFiles(attachments) {
    const folderPath = 'files'; // Path to the 'file' folder in the root directory

    // Ensure the 'file' folder exists
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }

    attachments.forEach((attachment, index) => {
      // Generate a unique filename based on the attachment's filename or index
      const fileName = `${folderPath}/${attachment.filename || `attachment_${index}`}`;

      // Write the attachment content to a file
      fs.writeFileSync(fileName, attachment.content, 'utf8', (err) => {
        if (err) {
          console.error(`Error saving attachment ${fileName}:`, err);
        } else {
          console.log(`Attachment saved to ${fileName}`);
        }
      });
    });
  }

  fetchEmailData((data) => {
    console.log('Data sent and attachments saved in files folder');
    if (data) {
      res.json(data);
    } else {
      res.json("No mail found")
    }
  });
});

app.get("/server-read-save-email-callback", (req, res) => {
  function fetchEmailData(callback) {
    imap.once('ready', () => {
      imap.openBox('INBOX', false, (err, mailbox) => {
        if (err) throw err;
        const searchCriteria = ['UNSEEN'];

        imap.search(searchCriteria, (err, emailIds) => {
          if (err) throw err;

          if (emailIds.length == 0) {
            return callback(null);
          }

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

                  if (mailData.attachments && mailData.attachments.length > 0) {
                    // Save email attachments to files
                    saveAttachmentsToFiles(mailData.attachments);
                  }

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
  function saveAttachmentsToFiles(attachments) {
    const folderPath = 'files'; // Path to the 'file' folder in the root directory

    // Ensure the 'file' folder exists
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }

    attachments.forEach((attachment, index) => {
      // Generate a unique filename based on the attachment's filename or index
      const fileName = `${folderPath}/${attachment.filename || `attachment_${index}`}`;

      // Write the attachment content to a file
      fs.writeFileSync(fileName, attachment.content, 'utf8', (err) => {
        if (err) {
          console.error(`Error saving attachment ${fileName}:`, err);
        } else {
          console.log(`Attachment saved to ${fileName}`);
        }
      });
    });
  }

  function formatBankData(data) {
    const formattedData = {};

    data.forEach((item) => {
      for (const key of Object.keys(item)) {
        if (item[key] !== "") {
          if (!formattedData[key]) {
            formattedData[key] = [];
          }
          formattedData[key].push(item[key]);
        }
      }
    });

    return formattedData;
  }

  fetchEmailData((data) => {
    console.log('Data sent and attachments saved in files folder');
    if (data) {

      // var filepath1 = './documents/templates/bulk-upload/RoleAccess.xlsx';
      // var workbook1 = XLSX.readFile(filepath1);
      // var sheet1 = workbook1.Sheets[workbook1.SheetNames[0]];
      // var num_rows1 = xls_utils.decode_range(sheet1['!ref']).e.r;

      const bufferData = data.attachments[0].content; // Extract the 'data' property from the content
      const arrayBuffer = new Uint8Array(bufferData); // Convert buffer data to Uint8Array
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const excelData = XLSX.utils.sheet_to_json(sheet);
      // delete data.attachments
      const formattedOutput = formatBankData(excelData);
      data.attachmentData = formattedOutput
      res.json(data);
    } else {
      res.json("No mail found")
    }
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


