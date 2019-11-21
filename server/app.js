const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const { runProcess } = require('./runProcess');

const { mongodbCRUD } = require('./db_crud');

const app = express();
const PORT = process.env.PORT || 1538;

app.use(bodyParser.json());
app.use(cors())

var corsOptions = {
  origin: 'http://localhost:',
}

let server = app.listen(PORT, () => {
  console.log(`Listing on port ${PORT}`);
});

app.get('/runBundle', cors(), (req, res) => {
  runProcess(req.query.bundle);
  res.status(200).send('completed');
});

app.get('/getBundles', cors(), async function(req, res) {
  mongodbCRUD({}, 'read', function(bundles) {
    res.status(200).send(bundles);
  });
});

app.post('/createBundle', cors(), (req, res) => {
  mongodbCRUD(req.body, "create");
  res.send({ status: "SUCCESS" });
});
