#!/bin/sh
git pull && cd backend && npm i && NODE_ENV=production npm run build && cd ../frontend && npm i && NODE_ENV=production npm run build && cd ../.. && pm2 restart ecosystem.config.js
