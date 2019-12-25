#!/usr/bin/env bash

set -xeu

baseDir=$PWD

rm -rf dist/
mkdir dist/

zip \
  dist/package.zip \
      icon.png \
      icon-128.png \
      index.css \
      index.html \
      index.js \
      manifest.json
