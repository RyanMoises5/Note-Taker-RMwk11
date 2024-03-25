const router = require('express').Router();
const notesRoute = require('./notes');

// handles http requests with the following format: URL/api/notes
router.use('/notes', notesRoute);

module.exports = router;
