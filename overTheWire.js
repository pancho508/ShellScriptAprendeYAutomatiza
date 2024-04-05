const Client = require('ssh2').Client
const fs = require('fs')
function hit(usr, pass, command) {
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

hit('bandit0', 'bandit0', 'cat readme')
  .then((pw) => {
    return hit('bandit1', pw, 'cat ./-')
  })
  .then((pw) => {
    return hit('bandit2', pw, 'ls -a')
  })
  .catch((err) => {
    console.log('ERROR  ', err)
  })

