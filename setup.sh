#!/bin/bash
# Development setup script for Frontend

echo "🚀 Retail Data Warehouse - Frontend Setup"
echo "=========================================="

# Check Node.js
echo "✓ Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo "✗ Node.js not found. Please install Node.js v16+"
    exit 1
fi

node_version=$(node -v)
echo "  Node.js version: $node_version"

# Check npm
echo "✓ Checking npm..."
if ! command -v npm &> /dev/null; then
    echo "✗ npm not found"
    exit 1
fi

npm_version=$(npm -v)
echo "  npm version: $npm_version"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# Create .env if not exists
if [ ! -f .env ]; then
    echo ""
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "✓ .env file created"
fi

# Check Backend
echo ""
echo "🔍 Checking Backend..."
if nc -z localhost 8000 2>/dev/null; then
    echo "✓ Backend is running on http://localhost:8000"
else
    echo "⚠ Backend is not running on http://localhost:8000"
    echo "  Please start Backend FastAPI first"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "To start development server, run:"
echo "  npm run dev"
echo ""
