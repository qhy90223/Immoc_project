#!/bin/sh
cd /Users/qinhuanyu/Desktop/Immoc_project/blog-1/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "">access.log