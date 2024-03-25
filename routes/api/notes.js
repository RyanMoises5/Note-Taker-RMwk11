const router = require('express').Router();
const fs = require('fs');
const util = require('util');

const readFromFile = util.promisify(fs.readFile);

router.get('/', (req, res) =>
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

router.post('/', (req, res) => {
    console.log("filler")
});

module.exports = router;
