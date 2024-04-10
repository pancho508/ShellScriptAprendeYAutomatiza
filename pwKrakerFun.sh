
for i in `cat ./pwTable.txt`; do
  ./pwChecker.sh $i > /dev/null; 
  if [ $? = 0 ]; then
    echo "ESTE ES EL PASSWORD CARNAL --> $i"
    exit 0;
  fi
done;
echo "NO password found, better luck next time kid"
exit 1  
