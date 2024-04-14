@ echo off

npm config set registry https://registry.npmmirror.com && ^
npm config set electron_mirror https://cdn.npmmirror.com/binaries/electron/ && ^
npm config set electron_builder_binaries_mirror https://npmmirror.com/mirrors/electron-builder-binaries/ && ^
npm install