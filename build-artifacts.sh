# !/bin/bash

APP_NAME="Build\ A\ Git"

echo "---- building server ----"
cd server
uv sync
uvx pyinstaller --path=./.venv/lib/python3.14/site-packages --hidden-import=_cffi_backend --onefile src/main.py -n build-a-git-server
echo "---- finsihed building server ----"

# back to root
cd ..


echo "--- building ui ----"
cd ui
npm i
npm run build --workspaces

cd packages/electron 
npm run make

cd ./out/Build*
cd Build*
cd Contents
mkdir react

# LOL
cp -r ../../../../../../packages/react/public ./react/
echo "--- finished building ui ----"