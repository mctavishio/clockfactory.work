#! /bin/bash
for file in *.wav 
do
filename=$file
fileid=${filename%.*}
fileext=${filename##*.}

echo $filename
echo $fileid
echo $fileext

WAV_OUT=$fileid.mp3

sox $filename $WAV_OUT silence 1 0.05 0.1% reverse silence 1 0.4 0.1% reverse norm -1

done
