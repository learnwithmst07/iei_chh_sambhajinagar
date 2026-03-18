# IEI Website Backend

Basic backend setup for IEI Website Admin Panel using Node.js, Express, and MongoDB.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and update the values:
```bash
cp .env.example .env
```

Edit `.env` file with your configuration:
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: A secure random string for JWT tokens
- `PORT`: Server port (default: 5000)

### 3. Install and Start MongoDB
Make sure MongoDB is installed and running on your system.

**Windows:**
- Download MongoDB from https://www.mongodb.com/try/download/community
- Install and start MongoDB service

**Or use MongoDB Atlas (Cloud):**
- Create free account at https://www.mongodb.com/cloud/atlas
- Get connection string and update `MONGODB_URI` in `.env`

### 4. Start the Server

**Development mode (with auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:5000`

## Project Structure
```
IEI Website Backend/
├── config/
│   └── database.js       # MongoDB connection
├── models/
│   └── Admin.js          # Admin user model
├── controllers/          # Business logic (empty for now)
├── routes/              # API routes (empty for now)
├── server.js            # Main server file
├── package.json         # Dependencies
├── .env.example         # Environment variables template
└── .gitignore          # Git ignore rules
```

## API Endpoints

### Health Check
- **GET** `/api/health` - Check if server is running

## Next Steps
- Add authentication routes (login, register)
- Create controllers for business logic
- Add more models as needed
- Implement JWT authentication middleware
- Create admin panel frontend
