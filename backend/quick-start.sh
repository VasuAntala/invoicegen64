#!/bin/bash

echo "🚀 Invoice Management Backend - Quick Start"
echo "=========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js is installed (version: $(node --version))"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm is installed (version: $(npm --version))"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Check if MongoDB is running
echo ""
echo "🔍 Checking MongoDB connection..."

# Try to connect to MongoDB
if command -v mongosh &> /dev/null; then
    if mongosh --eval "db.runCommand('ping')" > /dev/null 2>&1; then
        echo "✅ MongoDB is running locally"
        MONGODB_RUNNING=true
    else
        echo "⚠️  MongoDB is not running locally"
        MONGODB_RUNNING=false
    fi
else
    echo "⚠️  MongoDB client not found. Checking if service is running..."
    if systemctl is-active --quiet mongod 2>/dev/null; then
        echo "✅ MongoDB service is running"
        MONGODB_RUNNING=true
    else
        echo "⚠️  MongoDB service is not running"
        MONGODB_RUNNING=false
    fi
fi

if [ "$MONGODB_RUNNING" = false ]; then
    echo ""
    echo "💡 MongoDB Setup Options:"
    echo "   1. Install and start local MongoDB (see setup.md)"
    echo "   2. Use MongoDB Atlas (cloud) - Recommended"
    echo "   3. Continue without database (for testing)"
    echo ""
    read -p "Choose an option (1-3): " choice
    
    case $choice in
        1)
            echo "📖 Please follow the local MongoDB setup guide in setup.md"
            echo "   Then run this script again."
            exit 0
            ;;
        2)
            echo "🌐 Please set up MongoDB Atlas:"
            echo "   1. Go to https://www.mongodb.com/atlas"
            echo "   2. Create a free account and cluster"
            echo "   3. Get your connection string"
            echo "   4. Update src/database/connection/connection.js"
            echo "   5. Run this script again."
            exit 0
            ;;
        3)
            echo "🔄 Continuing without database connection..."
            ;;
        *)
            echo "❌ Invalid option. Exiting."
            exit 1
            ;;
    esac
fi

# Start the server
echo ""
echo "🚀 Starting the server..."
echo "   Server will be available at: http://localhost:3002"
echo "   Press Ctrl+C to stop the server"
echo ""

npm start
