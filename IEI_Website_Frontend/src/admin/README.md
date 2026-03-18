# Admin Panel

## Access Admin Panel

1. Click the **Admin** button in the top navigation bar
2. Use the default credentials to login:
   - **Email:** admin@iei.com
   - **Password:** admin123

## Features

### Current Features
- ✅ Admin Login Page
- ✅ Admin Dashboard
- ✅ Authentication with localStorage
- ✅ Logout functionality

### Planned Features (To be added step by step)
- 🔄 Event Management (Add/Edit/Delete events)
- 🔄 Content Management (Update website content)
- 🔄 Member Management
- 🔄 Settings & Configuration
- 🔄 Backend API Integration

## File Structure

```
admin/
├── AdminLogin.jsx       # Login page with form validation
├── AdminDashboard.jsx   # Main dashboard after login
└── README.md           # This file
```

## How It Works

1. **Login:** User enters credentials on AdminLogin page
2. **Validation:** Credentials are checked against default values
3. **Storage:** Login status is saved in localStorage
4. **Dashboard:** User is redirected to AdminDashboard
5. **Logout:** Clears localStorage and returns to login

## Security Note

⚠️ **Important:** This is a basic setup with hardcoded credentials for development only.
In production, you should:
- Connect to backend API for authentication
- Use JWT tokens for session management
- Implement proper password hashing
- Add role-based access control
- Remove the default credentials display

## Next Steps

When ready to make it dynamic:
1. Create backend API endpoints for authentication
2. Replace hardcoded credentials with API calls
3. Implement JWT token management
4. Add protected routes
5. Create CRUD operations for events/content
