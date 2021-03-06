#!/bin/bash

echo "---------------------------------------------"
echo "            Rebuid ilos && app               "
echo "---------------------------------------------"

if [ ${PWD##*/} != "api" ]; then
  echo 'Error: run me from "api" folder';
  exit 1;
fi

find . -type d -name node_modules -exec rm -rf {} \;  2>/dev/null
find . -type d -name dist -exec rm -rf {} \;  2>/dev/null

PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=yes yarn
yarn build:all
find . -type d -name node_modules -exec rm -rf {} \;  2>/dev/null

unset PUPPETEER_SKIP_CHROMIUM_DOWNLOAD
yarn
