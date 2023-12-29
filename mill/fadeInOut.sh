#! /bin/bash
echo $1
echo $2

origfilename=$(basename "$1")
origfileid=${origfilename%.*}
origfileext=${origfilename##*.}

echo $origfilename
echo $origfileid
echo $origfileext

ffmpeg -i $1 -f segment -segment_time $2 -c copy $origfileid%03d.wav

for file in $origfileid*00*.wav
do
#	filepath="/home/john/run.sh"
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

sox $WAV_IN $WAV_OUT fade $FADE_IN_L $LENGTH $FADE_OUT_L

done
