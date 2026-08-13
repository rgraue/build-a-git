# !bin/bash

./build-artifacts.sh

mkdir dist
cp server/dist/build-a-git-server ./dist/
cp -r ui/packages/electron/out/Build*/Build* ./dist/