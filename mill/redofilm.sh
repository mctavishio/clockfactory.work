#!/bin/bash
node inputMill.js
echo done running inputMill

node Bmill.js
echo done running Bmill
node poemMill
echo done running poemMill

node bookMill
echo done running bookMill

prince -s css/print.css print.html -o printbook_temp.pdf
echo done making print book
pdfseparate printbook_temp.pdf page%03d.pdf
rm page001.pdf
rm page002.pdf
pdfunite page*.pdf printbook.pdf
rm page*.pdf
rm printbook_temp.pdf
echo done removing front matter from printbook.pdf

sed "s/illustratedbook/broadsides/" print.html > printbroadsides.html
prince -s css/print.css printbroadsides.html -o printbroadsides_temp.pdf
echo done making broadside book
pdfseparate printbroadsides_temp.pdf page%03d.pdf
rm page001.pdf
rm page002.pdf
pdfunite page*.pdf printbroadsides.pdf
rm page*.pdf
rm printbroadsides_temp.pdf
echo done removing front matter from printbroadsides.pdf

node filmMill
echo done running filmMill
prince -s css/print.css film.html -o film.pdf
echo done making film book

#sed "s/notext/withtext/" film.html > filmtext.html
#prince -s css/print.css filmtext.html -o filmtext.pdf
#echo done making word film book

# https://www.princexml.com/doc/command-line/
#prince -s css/print.css film.html --raster-dpi=300 --raster-output=frame%04d.png;
#cp frame0048.png picture0000_$dt.png
#cp frame0098.png picture0001_$dt.png
#cp frame0218.png picture0002_$dt.png
#cp frame0340.png picture0004_$dt.png
#cp frame0480.png picture0005_$dt.png
#cp frame0580.png picture0006_$dt.png
#cp frame0680.png picture0007_$dt.png
#cp frame0780.png picture0008_$dt.png
#cp frame0880.png picture0009_$dt.png
#cp frame0948.png picture0010_$dt.png
#cp frame1098.png picture0011_$dt.png
#cp frame1118.png picture0012_$dt.png
#cp frame1280.png picture0014_$dt.png
#cp frame1380.png picture0015_$dt.png
#cp frame1480.png picture0016_$dt.png
#cp frame1060.png picture0017_$dt.png
#cp frame1160.png picture0018_$dt.png
#cp frame1260.png picture0019_$dt.png
#rm frame*.png
#echo done creating 300dpi pictures 

prince -s css/print.css film.html --raster-dpi=150 --raster-output=frame%04d.png;
rm frame0000.png
rm frame0001.png
rm frame0002.png
rm frame0003.png
cp frame0048.png poster0000_$dt.png
cp frame0298.png poster0001_$dt.png
cp frame0418.png poster0002_$dt.png
cp frame0618.png poster0003_$dt.png
cp frame0818.png poster0004_$dt.png
ffmpeg -framerate 24 -i frame%04d.png -c:v libx264 -r 24 -pix_fmt yuv420p film.mp4
rm frame*.png
echo done making film.mp4
ffmpeg -i film.mp4 -i line_all_thread_all_echo_reverb.mp3 -map 0:v:0 -map 1:a:0  -c:v copy -c:a aac -b:a 192k filmsound.mp4
echo done making filmsound 

# with text film
#prince -s css/print.css filmtext.html --raster-dpi=150 --raster-output=frame%04d_text.png;
#rm frame0000_text.png
#rm frame0001_withtext.png
#ffmpeg -framerate 24 -i frame%04d_text.png -c:v libx264 -r 24 -pix_fmt yuv420p filmtext.mp4
#cp frame0048_withtext.png poster_withtext.png
#cp frame0098_withtext.png poster0001_withtext.png
#cp frame0218_withtext.png poster0002_withtext.png
#cp frame0480_withtext.png poster0003_withtext.png
#rm frame*_withtext.png
#echo done making filmtext.mp4
#ffmpeg -i filmtext.mp4 -i line_all_thread_all_echo.mp3 -map 0:v:0 -map 1:a:0  -c:v copy -c:a aac -b:a 192k filmtextsound.mp4
#echo done making filmtextsound 

open filmsound.mp4
echo "done"
echo "|:|"
cd ../..
echo gsutil -m cp -r filmsound.mp4 gs://clockfactory/

echo "|:|"
