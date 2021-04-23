#!/bin/sh
git pull && cd backend && npm i && NODE_ENV=production npm run build && cd ../frontend && npm i && npm run build && cd ../.. && pm2 start ecosystem.config.js
