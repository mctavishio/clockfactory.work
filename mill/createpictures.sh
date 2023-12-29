#!/bin/bash
ts=$(date +"%s")
dt=$(date +"%Y%m%d%H%M%S")
echo $ts
echo $dt

# https://www.princexml.com/doc/command-line/
prince -s css/print.css film.html --raster-dpi=300 --raster-output=frame%04d.png;
cp frame0048.png picture0000_$dt.png
cp frame0098.png picture0001_$dt.png
cp frame0218.png picture0002_$dt.png
cp frame0340.png picture0004_$dt.png
cp frame0480.png picture0005_$dt.png
cp frame0580.png picture0006_$dt.png
cp frame0680.png picture0007_$dt.png
cp frame0780.png picture0008_$dt.png
cp frame0880.png picture0009_$dt.png
cp frame0948.png picture0010_$dt.png
cp frame1098.png picture0011_$dt.png
cp frame1118.png picture0012_$dt.png
cp frame1280.png picture0014_$dt.png
cp frame1380.png picture0015_$dt.png
cp frame1480.png picture0016_$dt.png
cp frame1060.png picture0017_$dt.png
cp frame1160.png picture0018_$dt.png
cp frame1260.png picture0019_$dt.png
rm frame*.png
echo done creating 300dpi pictures 
echo "done"
echo "|:|"
