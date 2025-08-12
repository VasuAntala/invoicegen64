# Setup Guide for Invoice Management Backend

## Option 1: Local MongoDB Setup

### Install MongoDB on Ubuntu/Debian
```bash
# Update package list
sudo apt update

# Install MongoDB
sudo apt install mongodb

# Start MongoDB service
sudo systemctl start mongod

# Enable MongoDB to start on boot
sudo systemctl enable mongod

# Check status
sudo systemctl status mongod
```

### Install MongoDB on macOS
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB service
brew services start mongodb-community
```

### Install MongoDB on Windows
1. Download MongoDB Community Server from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
2. Run the installer
3. Start MongoDB service from Services or Command Prompt

## Option 2: MongoDB Atlas (Cloud Database) - Recommended

### 1. Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new cluster (free tier available)

### 2. Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string

### 3. Update Database Connection
Replace the connection string in `src/database/connection/connection.js`:

```javascript
// Replace this line:
await mongoose.connect("mongodb://localhost:27017/invoicegen");

// With your Atlas connection string:
await mongoose.connect("mongodb+srv://username:password@cluster.mongodb.net/invoicegen?retryWrites=true&w=majority");
```

## Option 3: Docker MongoDB (Alternative)

### Using Docker Compose
Create a `docker-compose.yml` file in the backend directory:

```yaml
version: '3.8'
services:
  mongodb:
    image: mongo:latest
    container_name: invoicegen-mongodb
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_DATABASE: invoicegen
    volumes:
      - mongodb_data:/data/db

volumes:
  mongodb_data:
```

Then run:
```bash
docker-compose up -d
```

## Testing the Setup

### 1. Start the Backend Server
```bash
cd backend
npm start
```

### 2. Test Database Connection
```bash
# Test the root endpoint
curl http://localhost:3002/

# Test user registration
curl -X POST http://localhost:3002/auth/registers \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "conPassword": "password123"
  }'
```

### 3. Run Full API Test
```bash
node test_api.js
```

## Environment Variables (Optional)

Create a `.env` file in the backend directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/invoicegen
# or for Atlas: MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/invoicegen

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key

# Server Port
PORT=3002
```

Then update `src/database/connection/connection.js`:

```javascript
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export async function mongooseConnection() {
  mongoose.set('strictQuery', true);

  try {
    const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/invoicegen";
    await mongoose.connect(mongoUri);
    console.log('✅ Database successfully connected to MongoDB');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    console.log('💡 Please check the setup guide in setup.md');
    console.log('🔄 Starting server without database connection...');
  }
}
```

## Troubleshooting

### Common Issues

1. **Port 27017 already in use**
   ```bash
   # Check what's using the port
   sudo lsof -i :27017
   
   # Kill the process
   sudo kill -9 <PID>
   ```

2. **Permission denied**
   ```bash
   # Fix MongoDB data directory permissions
   sudo chown -R mongodb:mongodb /var/lib/mongodb
   sudo chmod 755 /var/lib/mongodb
   ```

3. **Connection timeout**
   - Check if MongoDB service is running
   - Verify firewall settings
   - Check network connectivity

### MongoDB Commands

```bash
# Start MongoDB service
sudo systemctl start mongod

# Stop MongoDB service
sudo systemctl stop mongod

# Restart MongoDB service
sudo systemctl restart mongod

# Check MongoDB status
sudo systemctl status mongod

# View MongoDB logs
sudo journalctl -u mongod -f
```

## Quick Start (Recommended)

1. **Use MongoDB Atlas (Easiest)**:
   - Sign up at [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a free cluster
   - Get connection string
   - Update the connection in the code

2. **Start the server**:
   ```bash
   cd backend
   npm start
   ```

3. **Test the API**:
   ```bash
   node test_api.js
   ```

The server will now work with full database functionality!
