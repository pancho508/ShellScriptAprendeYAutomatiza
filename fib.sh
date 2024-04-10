n=0
oc=0
nc=1

while [ $n -lt $1 ]; do
  temp=$nc
  nc=$(($oc+$nc))
  oc=$temp
  n=$(($n+1))
done;
echo "este es el resultado wey--> $oc"
exit $oc;
  
  
