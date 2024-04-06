const { exec } = require('child_process'),
  { platform } = require('process'),
  url = 'https://raw.githubusercontent.com/Yash-Handa/The_Constitution_Of_India/master/COI.json';

if (platform === 'win32') {
  exec(`Invoke-WebRequest ${url} -O COI.json`, (err, stdout, stderr) => {
    if (err) throw err
  });
} else if (platform === 'darwin') {
  exec(`curl ${url} -o COI.json`, (err, stdout, stderr) => {
    if (err) throw err;
  });
} else {
  exec(`wget ${url} -O COI.json`, (err, stdout, stderr) => {
    if (err) throw err;
  });
}