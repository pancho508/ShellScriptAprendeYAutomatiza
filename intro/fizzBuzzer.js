const readline = require("readline");


const rl = readline.createInterface({
  input: process.stdin,
 });

  
rl.on("line", (line) => {
  const [number, fizz, buzz] = line.split(' ')
  switch(line.split(' ').length){
    case 1:
      console.log(number)
	break
    case 2:
      console.log(fizz)
	break
    case 3: 
      console.log(fizz + buzz)
	break
  } 
});
