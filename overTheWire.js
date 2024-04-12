cmds = [
  'cat readme',
  'cat ./-',
  "cat 'spaces in this filename'",
  'cat ./inhere/.hidden',	
  "file ./inhere/* | grep  ASCII | sed 's/:.*//i' | xargs cat",
  "find . -size 1033c -exec cat {} \\; | grep . -m 1",
  "find . -size 1033c | xargs cat | xargs",
  "find / -size 33c -user bandit7 -group bandit6 -type f 2> /dev/null | xargs cat",
  `while IFS= read -r line; do
    if [[ $line == *"millionth"* ]]\\; then 
      echo $line
    fi
  done < data.txt | xargs`
]

const Client = require('ssh2').Client
const fs = require('fs')
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

if (fs.existsSync('./resultados.txt')) {
  const pws = fs.readFileSync('./resultados.txt')
  .toString()
  .trim()
  .split('\n')
  .filter(e=>e!=='')
  
  solve(cmds.slice(pws.length), pws.length, pws[pws.length-1]);
} else {
  fs.writeFileSync('./resultados.txt', '')
  const pws = []
  solve(cmds.slice(pws.length), pws.length, pws[pws.length-1]);
}
