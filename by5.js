const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
 });


rl.on("line", (line) => {
  if(Number(line) % 5 === 0){
    console.log(line)
  }
});
