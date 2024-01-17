#!/bin/bash
ts=$(date +"%s")
dt=$(date +"%Y%m%d%H%M%S")
echo $ts
echo $dt
echo "# sound films" > filmFiles$dt.txt
for file in $(ls data/mill2024011*/filmsound.mp4); do 
 echo "file '$file'" >> filmFiles$dt.txt
done
#ffmpeg -f concat -safe 0 -i filmFiles$dt.txt -c copy film$dt.mp4
