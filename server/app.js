const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const { runProcess } = require('./runProcess');
const redisClient = require('./redis-client');

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

app.get('/runBundle', cors(), async (req, res) => {
  // runProcess(req.query.bundle);
  var redisData = await redisClient.getAsync("1", req.query);
  console.log(redisData);
  res.status(200).send('completed');
});

app.get('/getBundles', cors(), async (req, res) => {
  // mongodbCRUD({}, 'read', function(bundles) {
  //   res.status(200).send(bundles);
  // });
  var data = await redisClient.setAsync(JSON.stringify(req.query));
  return res.json(JSON.parse(data));
});

app.post('/createBundle', cors(), (req, res) => {
  mongodbCRUD(req.body, "create");
  res.send({ status: "SUCCESS" });
});
