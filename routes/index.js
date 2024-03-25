const router = require('express').Router();
const apiRoute = require('./api');
const notesRoute = require('./notes');

// handles http requests with the following format: URL/api
router.use('/api', apiRoute);

// handles http requests with the following format: URL/notes
router.use('/notes', notesRoute);

module.exports = router;