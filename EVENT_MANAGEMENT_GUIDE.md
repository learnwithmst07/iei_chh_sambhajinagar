# 🎉 Dynamic Event Management System - Complete Guide

## ✅ What's Been Created

### Backend (Node.js + MongoDB)

1. **Event Model** (`models/Event.js`)
   - Schema for storing event data
   - Fields: title, date, time, location, attendees, category, color, description
   - Auto-updates timestamps

2. **Event Controller** (`controllers/eventController.js`)
   - `getAllEvents()` - Get all active events
   - `getEventById()` - Get single event
   - `createEvent()` - Create new event
   - `updateEvent()` - Update existing event
   - `deleteEvent()` - Delete event

3. **Event Routes** (`routes/eventRoutes.js`)
   - GET `/api/events` - Fetch all events
   - GET `/api/events/:id` - Fetch single event
   - POST `/api/events` - Create event
   - PUT `/api/events/:id` - Update event
   - DELETE `/api/events/:id` - Delete event

4. **Server Updated** (`server.js`)
   - Event routes integrated

### Frontend (React)

1. **EventManagement Component** (`admin/EventManagement.jsx`)
   - Full CRUD interface for events
   - Add, Edit, Delete events
   - Beautiful modal form
   - Real-time updates

2. **AdminDashboard Updated** (`admin/AdminDashboard.jsx`)
   - Tab navigation (Overview / Events)
   - Integrated EventManagement
   - Quick action buttons

3. **UpcomingEvents Updated** (`components/UpcomingEvents.jsx`)
   - Fetches events from API
   - Displays dynamic events on website
   - Fallback to default events if API fails

## 🚀 How to Use

### Step 1: Start Backend Server

```bash
cd "c:\Users\Mahesh Thombare\Desktop\IEI Website\IEI Website Backend"
npm run dev
```

**Expected Output:**
```
Server is running on port 5000
MongoDB Connected: localhost
```

### Step 2: Start Frontend

```bash
cd "c:\Users\Mahesh Thombare\Desktop\IEI Website\IEI Website Frontend"
npm run dev
```

### Step 3: Access Admin Panel

1. Open your website (usually `http://localhost:5173`)
2. Click the **"Admin"** button in the top navigation
3. Login with:
   - Email: `admin@iei.com`
   - Password: `admin123`

### Step 4: Manage Events

1. Click on **"Events"** tab in admin dashboard
2. Click **"Add New Event"** button
3. Fill in the form:
   - **Title**: Event name
   - **Date**: Event date (e.g., "15-17 December 2024")
   - **Time**: Event time (e.g., "09:00 AM - 05:00 PM")
   - **Location**: Venue
   - **Attendees**: Expected count (e.g., "100+ Expected")
   - **Category**: Select from dropdown
   - **Color Theme**: Choose color
   - **Description**: Optional details
4. Click **"Create Event"**

### Step 5: Edit/Delete Events

- **Edit**: Click the blue edit icon on any event card
- **Delete**: Click the red trash icon (confirms before deleting)

## 📊 API Endpoints

### Get All Events
```http
GET http://localhost:5000/api/events
```

**Response:**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "...",
      "title": "National Engineering Congress 2024",
      "date": "15-17 December 2024",
      "time": "09:00 AM - 05:00 PM",
      "location": "IEI HQ, Kolkata",
      "attendees": "500+ Expected",
      "category": "Conference",
      "color": "from-blue-500 to-blue-600",
      "description": "",
      "isActive": true,
      "createdAt": "2024-11-09T...",
      "updatedAt": "2024-11-09T..."
    }
  ]
}
```

### Create Event
```http
POST http://localhost:5000/api/events
Content-Type: application/json

{
  "title": "Technical Workshop",
  "date": "20 December 2024",
  "time": "10:00 AM - 04:00 PM",
  "location": "IEI Sambhajinagar",
  "attendees": "50+ Expected",
  "category": "Workshop",
  "color": "from-green-500 to-green-600"
}
```

### Update Event
```http
PUT http://localhost:5000/api/events/:id
Content-Type: application/json

{
  "title": "Updated Event Title",
  "attendees": "200+ Expected"
}
```

### Delete Event
```http
DELETE http://localhost:5000/api/events/:id
```

## 🎨 Available Color Themes

- Blue: `from-blue-500 to-blue-600`
- Green: `from-green-500 to-green-600`
- Orange: `from-orange-500 to-orange-600`
- Purple: `from-purple-500 to-purple-600`
- Red: `from-red-500 to-red-600`
- Cyan: `from-cyan-500 to-cyan-600`

## 📋 Event Categories

- Conference
- Seminar
- Workshop
- Networking
- Ceremony
- Competition
- Other

## 🔄 How It Works

1. **Admin adds event** → Saved to MongoDB
2. **Frontend fetches events** → GET /api/events
3. **Website displays** → UpcomingEvents component shows all events
4. **Real-time updates** → Changes reflect immediately

## 🛠️ Troubleshooting

### Backend not connecting to MongoDB?
- Make sure MongoDB is running
- Check `.env` file has correct `MONGODB_URI`
- Default: `mongodb://localhost:27017/iei_website`

### Events not showing on website?
- Check if backend is running on port 5000
- Open browser console for errors
- Verify API URL in components: `http://localhost:5000/api/events`

### CORS errors?
- Backend already has CORS enabled
- Make sure both frontend and backend are running

## 📁 File Structure

```
IEI Website Backend/
├── models/
│   ├── Admin.js
│   └── Event.js          ✨ NEW
├── controllers/
│   └── eventController.js ✨ NEW
├── routes/
│   └── eventRoutes.js     ✨ NEW
├── config/
│   └── database.js
├── server.js              📝 UPDATED
└── package.json

IEI Website Frontend/
├── src/
│   ├── admin/
│   │   ├── AdminLogin.jsx
│   │   ├── AdminDashboard.jsx    📝 UPDATED
│   │   └── EventManagement.jsx   ✨ NEW
│   ├── components/
│   │   └── UpcomingEvents.jsx    📝 UPDATED
│   └── App.jsx
```

## 🎯 Next Steps (Optional)

1. **Add Authentication**: Protect admin routes with JWT
2. **Image Upload**: Add event images
3. **Date Picker**: Use proper date picker instead of text
4. **Pagination**: For many events
5. **Search & Filter**: Find events easily
6. **Event Registration**: Allow users to register
7. **Email Notifications**: Send event reminders

## ✨ Features Implemented

✅ Full CRUD operations (Create, Read, Update, Delete)
✅ Beautiful admin interface
✅ Real-time updates
✅ Form validation
✅ Responsive design
✅ Color-coded categories
✅ Confirmation dialogs
✅ Error handling
✅ Loading states
✅ Fallback data

---

**🎉 Your event management system is now fully functional!**

Admin can add, edit, and delete events from the admin panel, and they will automatically appear on the website's "Upcoming Events" section.
