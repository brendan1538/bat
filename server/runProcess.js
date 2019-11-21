const { execSync } = require('child_process');
const path = require('path');
const user = require('os').userInfo().username;
const { git, dockerComposeUp } = require('./quickActions');
const { mongodbCRUD } = require('./db_crud');


module.exports = { 
  runProcess: function(bundle) {
    mongodbCRUD({}, 'read', function(allBundles) {
      const selectedBundle = allBundles.find(obj => obj.name === bundle);
      console.log(`*** Running ${bundle} bundle ***\n`);
      selectedBundle.actions.forEach((action, index) => {
        console.log(`Executing action ${index+1} of ${selectedBundle.actions.length}...`);
        
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
    })
  }
}