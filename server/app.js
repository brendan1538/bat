const { execSync } = require('child_process');
const path = require('path');
const user = require('os').userInfo().username;
const express = require('express');
const axios = require('axios');
const { git, dockerComposeUp } = require('./quickActions');


const app = express();

const PORT = process.env.PORT || 1538;

const bundles = require('./bundles.json');

function runProcess(bundle) {
  console.log(`*** Running ${bundle} bundle ***\n`);
  bundles[bundle].actions.forEach((action, index) => {
    console.log(`Executing action ${index+1} of ${bundles[bundle].actions.length}...`);
    
    const workingDir = path.resolve(process.cwd(), action.directory.replace(/__USER__/, user)) || path.resolve(process.cwd());
    const { command, args } = action;
    if (command.includes('docker')) {
      dockerComposeUp(args, workingDir);
    } else if (command.includes('git')) {
      git(args, workingDir);
    } else {
      const runningProcess = execSync(
        `${command} ${args}`,
        {
          cwd: workingDir,
          stdio: ['pipe', process.stdout, process.stderr],
        },
        err => err && console.log(err)
      );
    }
  });
}

app.get('/runBundle/', (req, res) => {
  runProcess(req.query.bundle);
  res.status(200).send('completed');
});

app.get('/createBundle/', (req, res) => {
  let newBundlesObj = { ...bundles, ...req }
});

let server = app.listen(PORT, () => {
  console.log(`Listing on port ${PORT}`);
});
