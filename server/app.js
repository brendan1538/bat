const { execSync } = require('child_process');
const path = require('path');
const user = require('os').userInfo().username;
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { git, dockerComposeUp } = require('./quickActions');

const app = express();
const PORT = process.env.PORT || 1538;

let bundles = require('./bundles.json');

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
  console.log('Finished running bundle:', bundle);
}

app.use(bodyParser.json());

let server = app.listen(PORT, () => {
  console.log(`Listing on port ${PORT}`);
});

app.get('/runBundle', (req, res) => {
  runProcess(req.query.bundle);
  res.status(200).send('completed');
});

app.post('/createBundle', (req, res) => {
  bundles = { ...bundles, ...req.body };
  res.send(bundles);
});
