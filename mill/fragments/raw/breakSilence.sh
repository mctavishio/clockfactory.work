#! /bin/bash
echo $1

#origfilename=$(basename "$1")
origfilename=$1
origfileid=${origfilename%.*}
origfileext=${origfilename##*.}

echo $origfilename
echo $origfileid
echo $origfileext

sox -V3 $origfilename $origfileid_part.mp3 silence 1 0.5 0.1% 1 0.5 0.1% : newfile : restart

for file in $origfileid_part*0*.mp3
do
filename=$(basename "$file")
fileid=${filename%.*}
fileext=${filename##*.}

echo $filename
echo $fileid
echo $fileext

WAV_IN=$filename
WAV_OUT=$fileid.mp3

echo $WAV_IN
echo $WAV_OUT

FADE_IN_L="0.3"
FADE_OUT_L="0.3"

LENGTH=`soxi -d $WAV_IN`
echo $LENGTH

sox $WAV_IN $WAV_OUT fade $FADE_IN_L $LENGTH $FADE_OUT_L

done
