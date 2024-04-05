let [_a, _b, x, y] = process.argv;
x = Number(x)
y = Number(y)
while(x < y){
  x = x + 1
  console.log(x)
}
