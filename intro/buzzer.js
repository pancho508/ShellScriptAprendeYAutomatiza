const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
 });

  
rl.on("line", (line) => {
  if(Number(line.split(' ')[0]) % 5 === 0){
    line = line + ' buzz'
  }
  console.log(line)
});
