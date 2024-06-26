const express = require('express');
const path = require('path');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;

// turn on express to allow serverside function
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

app.use(express.static('public'));

// handles wildcard requests and brings the user back to index.html
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// turn on listening to app
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
