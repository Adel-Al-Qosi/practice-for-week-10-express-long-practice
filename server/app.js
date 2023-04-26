const express = require('express');
require('express-async-errors')
const logger = require('./routes/logger')
const router = require('./routes/dogs')

const app = express();



app.use(express.json())

app.use(logger)

app.use('/dogs', router)

// For testing purposes, GET /
app.get('/', (req, res) => {
  res.json("Express server running. No content provided at root level. Please use another route.");
});

// For testing express.json middleware
app.post('/test-json', (req, res, next) => {
  // send the body as JSON with a Content-Type header of "application/json"
  // finishes the response, res.end()
  res.json(req.body);
  next();
});

// For testing express-async-errors
app.get('/test-error', async (req, res, next) => {
  throw new Error("Hello World!")
});

app.use((err, req, res, next) => {
    res.status(403);
    res.send({ error: err.message });
  next(err);
});

app.get('*', (req, res) => {
  const error = new Error("The requested resource couldn't be found.")
  error.statusCode = 404
  throw error
})


const port = 5001;
app.listen(port, () => console.log('Server is listening on port', port));