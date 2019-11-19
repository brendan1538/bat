const { exec, execSync } = require('child_process');
const path = require('path');
const express = require('express');
const axios = require('axios');

const app = express();

const PORT = process.env.PORT || 1538;

const bundles = {
  netfirms: {
    directory: "/Users/blaughlin/capvm/coldstone",
    actions: [
      "docker-compose up netfirms",
      'open http://127.0.0.1:10045/',
      'open https://stash.endurance.com/projects/SAM/repos/mainsite-netfirms/pull-requests'
    ],
  },
  mydomain: {
    directory: "/Users/blaughlin/capvm/coldstone",
    actions: [
      { async: true, action: "docker-compose up mydomain" },
      { async: true, action: 'open http://127.0.0.1:10048/' },
      { async: true, action: 'open https://stash.endurance.com/projects/SAM/repos/mainsite-mydomain/pull-requests' }
    ],
  },
}

function runProcess(bundle) {
  const workingDir = path.resolve(process.cwd(), bundles[bundle].directory)
  console.log(`Running ${bundle} bundle`);
  bundles[bundle].actions.forEach((command, index) => {
    if (command.async) {
      execSync(command.action, { cwd: workingDir }, (err, stdout, stderr) => {
        console.log(`Running action ${index} ...`)
        if (err) {
          console.error(err)
          return;
        }
        console.log(stdout);
      });
    } else {
      exec(command.action, { cwd: workingDir }, (err, stdout, stderr) => {
        if (err) {
          console.error(err)
          return;
        }
        console.log(stdout);
      });
    }
  });
}

app.get('/functions/', (req, res) => {
  runProcess(req.query.bundle);
  res.status(200).send('completed');
});

let server = app.listen(PORT, () => {
  console.log(`Listing on port ${PORT}`);
});
