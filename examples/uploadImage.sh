#!/bin/sh

# Shell script written by Aaron Stannard - designed to do a multi-part FORM post with an image and upload it to IFS

FILE="unhappy-cat.jpg"
TYPE="image/jpeg"

curl -H "token: SECRET" -F "filename=$FILE;$TYPE;" -F "name=$FILE" -F "image=@$FILE" http://127.0.0.1:8080/destination-file.jpeg
