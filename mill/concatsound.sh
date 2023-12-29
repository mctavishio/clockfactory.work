ffmpeg -f concat -safe 0 -i soundFiles.txt -c copy sound$(date "+%s").mp3
