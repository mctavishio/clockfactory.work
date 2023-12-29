#!/bin/bash
##usage recordSound.sh instrument seconds
ts=$(date +"%s")
dt=$(date +"%Y%m%d%H%M%S")
echo $ts
echo $dt
echo $1
echo $2
rec -r 41000 -c 2 raw$1$dt trim 0 $2 
