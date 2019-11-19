const { exec } = require('child_process');
const express = require('express');
const axios = require('axios');

const app = express();

const bundles = {
  netfirmsDev: [
    'open http://127.0.0.1:10045/',
    'open https://stash.endurance.com/projects/SAM/repos/mainsite-netfirms/pull-requests',
    'echo Opened all Netfirms dev links'
  ],
  mydomainDev: [
    'open http://127.0.0.1:10048/',
    'open https://stash.endurance.com/projects/SAM/repos/mainsite-mydomain/pull-requests',
    'echo Opened all MyDomain dev links'
  ]
}

function runProcess(bundle) {
  exec(`echo Running ${bundle} bundle`);
  const bundleNames = Object.keys(bundles)
  bundleNames.forEach((bundleName, index) => bundleName === bundle && (
    console.log(bundleName)
  ));

  // exec("ls", { cwd: '' }, (err, stdout, stderr) => {
  //   if (err) {
  //     console.error(`exec ${err}`);
  //     return;
  //   }
  //   console.log(`stdout: ${stdout}`);
  //   console.log(`stderr: ${stderr}`);
  // })
}

const PORT = process.env.PORT || 1538;

app.get('/functions/', (req, res) => {
  runProcess(req.query.bundle);
  res.status(200).send('completed');
});

let server = app.listen(PORT, () => {
  console.log(`Listing on port ${PORT}`);
});
