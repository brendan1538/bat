const { execSync } = require('child_process');
const path = require('path');
const user = require('os').userInfo().username;
const express = require('express');
const axios = require('axios');



const app = express();

const PORT = process.env.PORT || 1538;

const bundles = require('./bundles.json');

function runProcess(bundle) {
  console.log(`*** Running ${bundle} bundle ***\n`);
  bundles[bundle].actions.forEach((action, index) => {
    console.log(`Executing action ${index+1} of ${bundles[bundle].actions.length}...`);
    
    const workingDir = path.resolve(process.cwd(), action.directory.replace(/__USER__/, user)) || path.resolve(process.cwd());

    const runningProcess = execSync(
      action.command,
      {
        cwd: workingDir,
        stdio: ['pipe', process.stdout, process.stderr],
      },
      (err) => {
        err && console.log(err)
        // TODO: escape synchronous execution when docker outputs '> Ready on http://127.0.0.1:{PORT}'
      });
  });
}

app.get('/runBundle/', (req, res) => {
  runProcess(req.query.bundle);
  res.status(200).send('completed');
});

let server = app.listen(PORT, () => {
  console.log(`Listing on port ${PORT}`);
});
