#!/bin/bash
set -e

echo "🚀 Starting deployment..."


if ! command -v node &> /dev/null
then
  echo "❌ Node.js is not installed"
  exit 1
fi

echo "✅ Node version:"
node -v


echo "📦 Installing dependencies..."
npm install


if ! npx tsc --version &> /dev/null
then
  echo "📥 Installing TypeScript locally..."
  npm install -g typescript
fi


echo "🛠️ Building TypeScript..."
npx tsc


PORT=8080
PID=$(lsof -ti tcp:$PORT || true)
if [ ! -z "$PID" ]; then
  echo "🧹 Killing process on port $PORT"
  kill -9 $PID
fi

# 6️⃣ Start service
echo "▶️ Starting service..."
nohup node dist/index.js > app.log 2>&1 &

echo "✅ Deployment successful!"
echo "🌐 Service running on port 8080"