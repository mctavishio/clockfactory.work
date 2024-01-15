#!/bin/bash
ts=$(date +"%s")
dt=$(date +"%Y%m%d%H%M%S")
echo $ts
echo $dt
echo "// mill folders" > tempmills$dt.js
echo "module.exports = [" > tempmills$dt.js
for file in $(ls -d data/mill202312*); do 
 echo "'$file'," >> tempmills$dt.js
done
echo "] " >> tempmills$dt.js
sed "s/data\///" tempmills$dt.js > mills$dt.js
rm tempmills$dt.js
