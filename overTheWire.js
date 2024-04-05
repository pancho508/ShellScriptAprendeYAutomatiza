const Client = require('ssh2').Client

function runCmd(usr, pass, command) {
  return new Promise((resolve, reject) => {
    const sshClient = new Client()
    const connectionParams = {
      host: 'bandit.labs.overthewire.org',
      username: usr,
      password: pass,
      port: 2220,
    }
    sshClient.connect(connectionParams)
    sshClient.on('ready', () => {
      sshClient.exec(command, (err, stream) => {
        if (err) throw err
        stream.on('close', (code, signal) => {
          sshClient.end()
        }).on('data', (data) => {
 	  const dataLimpia = String(data).trim()
          console.log(dataLimpia)	 
          resolve(dataLimpia)
        }).stderr.on('data', (data) => {
          console.log('STDERR: ' + data)
          reject(err)
        })
      })
    })
    sshClient.on('error', (err) => {
      reject(err)
    })
  })
}

const solve = (cmds, i=0, prev='bandit0') => {
  if (cmds.length === 0) {
    return;
  }
  runCmd(`bandit${i}`, prev, cmds[0])
    .then(pw => {
      solve(cmds.slice(1), i+1, pw)
    })
}

cmds = [
  'cat readme',
  'cat ./-',
  'ls -a',  
]

solve(cmds);
