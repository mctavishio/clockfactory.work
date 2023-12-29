echo $1
sox -V3 $1.wav $1_part.mp3 silence 1 0.5 0.1% 1 0.5 0.1% : newfile : restart
