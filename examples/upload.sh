#!/bin/sh

# Shell script written by Aaron Stannard - designed to do a multi-part FORM post with an image and upload it to IFS

HOST=$1
FILE=$2

curl -k -F "token=secret" -F "filename=$FILE" -F "name=$FILE" -F "image=@$FILE" https://$HOST/
