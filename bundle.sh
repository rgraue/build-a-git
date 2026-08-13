# !bin/bash

# start from scratch
rm -rf dist/

./build-artifacts.sh

mkdir dist
cp -r ui/packages/electron/out/Build*/Build* ./dist/
cp server/dist/build-a-git-server ./dist/Build*/Contents