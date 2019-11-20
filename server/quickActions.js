const { execSync } = require('child_process');

module.exports = {
   git: function(branch, directory) {
    execSync(`git fetch origin ${branch}`, { cwd: directory }, err => err && console.error(err));
    execSync(`git checkout ${branch}`, { cwd: directory }, err => err && console.error(err));
    execSync('git pull', { cwd: directory }, err => err && console.error(err));
  },
  dockerComposeUp: function(brand, directory) {
    execSync(`docker-compose up -d ${brand}`,  { cwd: directory }, err => err && console.err(err))
  }
}