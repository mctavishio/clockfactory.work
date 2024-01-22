#!/bin/bash
ts=$(date +"%s")
dt=$(date +"%Y%m%d%H%M%S")
echo $ts
echo $dt

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

echo "|:|"
