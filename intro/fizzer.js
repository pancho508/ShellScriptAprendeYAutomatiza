const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
 });

  
rl.on("line", (line) => {
  if(Number(line) % 3 === 0){
    line = line + ' fizz'
  }
  console.log(line)
});
