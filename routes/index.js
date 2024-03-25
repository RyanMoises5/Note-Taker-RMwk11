const router = require('express').Router();
const apiRoute = require('./api');
const notesRoute = require('./notes');

router.use('/api', apiRoute);
router.use('/notes', notesRoute);

module.exports = router;