#! /bin/bash
for file in *.wav 
do
filename=$file
fileid=${filename%.*}
fileext=${filename##*.}

echo $filename
echo $fileid
echo $fileext

WAV_IN=$fileid_temp.wav
WAV_OUT=$fileid.mp3

sox $filename $WAV_IN silence 1 0.1 0.5% reverse silence 1 0.1 0.4% reverse

echo $WAV_IN
echo $WAV_OUT

FADE_IN_L="0.1"
FADE_OUT_L="0.5"

LENGTH=`soxi -d $WAV_IN`
echo $LENGTH

sox $WAV_IN $WAV_OUT fade $FADE_IN_L $LENGTH $FADE_OUT_L

done
