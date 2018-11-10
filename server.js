const express = require('express');
const data = require('./challenge-details/data/data.json');
const path = require('path')

const app = express();

app.get('/data', (req, res) => {
  res.json(data);
});

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))
// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

// heroku will recognize these changes!
app.listen(process.env.PORT || 5000, () => {
  console.log('json server listening on port 5000');
});
