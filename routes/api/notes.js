const router = require('express').Router();
const fs = require('fs');
const util = require('util');

const readFromFile = util.promisify(fs.readFile);

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

router.get('/', (req, res) =>
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

router.post('/', (req, res) => {
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text
        }
        
        readAndAppend(newNote, '.db/db.json');

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
