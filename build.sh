#!/usr/bin/env bash

baseDir=$PWD

rm -rf dist/
mkdir dist/

zip \
  dist/package.zip \
  icon.png \
  index.css \
  index.html \
  index.js \
  manifest.json