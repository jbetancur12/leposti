#!/bin/sh
cd .. && pm2 stop ecosystem.config.js && cd leposti && git pull && cd backend && npm i && NODE_ENV=production npm run build && cd ../frontend && npm i && npm run build && cd ../.. && pm2 start ecosystem.config.js
