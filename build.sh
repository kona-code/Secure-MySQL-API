#!/bin/bash

echo "Installing dependencies..."
npm install express mysql2 dotenv
npm install express-rate-limit
npm install --save-dev typescript @types/node @types/express ts-node
echo "Dependencies installed successfully, compiling source code..."
npx tsc
echo "All Done!"

