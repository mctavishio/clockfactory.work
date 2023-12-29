ffmpeg -i $1 -f segment -segment_time $2 -c copy out%03d.wav

