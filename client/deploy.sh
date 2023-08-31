#!/usr/bin/env sh

# abort on errors
set -e
yarn build
cd dist

# if you are deploying to a custom domain
# echo www.example.com > CNAME
git init
git switch -c main 
 git add -A 
git commit -m "deploy"

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:ceo-js/vite-app.git main:gh-pages

cd -

