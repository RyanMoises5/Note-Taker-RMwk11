const router = require('express').Router();
const fs = require('fs');
const util = require('util');
const { v4: uuidv4 } = require('uuid');

// helper code that gives a promise version of reading a file
const readFromFile = util.promisify(fs.readFile);

// function to read and re-write data with changes
const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedData = JSON.parse(data);
        parsedData.push(content);
        writeToFile(file, parsedData);
      }
    });
  };

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

// retrives all previously entered items and shows them to the user
router.get('/', (req, res) =>
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

// allows the user to enter a title and text for a note and saves it into the server
router.post('/', (req, res) => {
    const { title, text } = req.body;
    const id = uuidv4();

    if (id && title && text) {
        const newNote = {
            id,
            title,
            text
        }
        
        readAndAppend(newNote, 'db/db.json');

        const response = {
            status: "success",
            body: newNote
        };

        res.json(response);
    
    } else {
        res.json('Error in posting note');
    }
});

module.exports = router;
