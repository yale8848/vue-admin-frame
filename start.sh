#!/bin/bash

DIR='/home/server/vue-admin-frame'
NPM=/usr/local/node-v8.15.1-linux-x64/bin/npm
PM2=/usr/local/node/bin/pm2
export NODE_ENV=production

cd $DIR && $NPM i --production --registry=https://registry.npm.taobao.org
cd $DIR && $PM2 stop vue-admin ; $PM2 start server.js -n vue-admin
