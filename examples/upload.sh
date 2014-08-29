#!/bin/sh

# Shell script written by Aaron Stannard - designed to do a multi-part FORM post with an image and upload it to IFS

FILE="myfile.txt"
TYPE="image/jpeg"

curl -F "token=SECRET" -F "filename=$FILE;$TYPE;" -F "name=$FILE" -F "image=@$FILE" http://fileserver-bparees.rhcloud.com/$FILE
