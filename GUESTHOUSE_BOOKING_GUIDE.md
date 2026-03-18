# 🏠 Guest House Booking System - Complete Guide

## ✅ What's Been Created

### Backend (Node.js + MongoDB)

1. **GuestHouseRequest Model** (`models/GuestHouseRequest.js`)
   - Schema for storing booking requests
   - Fields: membershipId, name, mobile, fromDate, toDate, checkInTime, checkOutTime, status
   - Status: pending, approved, rejected

2. **Guest House Controller** (`controllers/guestHouseController.js`)
   - `getAllRequests()` - Get all booking requests
   - `getRequestById()` - Get single request
   - `createRequest()` - Create new booking request
   - `updateRequestStatus()` - Approve/Reject requests
   - `deleteRequest()` - Delete request
   - `sendWhatsAppMessage()` - Generate WhatsApp message URL

3. **Guest House Routes** (`routes/guestHouseRoutes.js`)
   - POST `/api/guesthouse` - Submit booking request (Public)
   - GET `/api/guesthouse` - Get all requests (Admin)
   - PUT `/api/guesthouse/:id/status` - Update status (Admin)
   - POST `/api/guesthouse/:id/whatsapp` - Send WhatsApp (Admin)
   - DELETE `/api/guesthouse/:id` - Delete request (Admin)

4. **Server Updated** (`server.js`)
   - Guest house routes integrated

### Frontend (React)

1. **GuestHouse Component** (`components/GuestHouse.jsx`)
   - Beautiful booking form
   - Form validation
   - Success message
   - Mobile number validation (10 digits)
   - Date/time pickers

2. **GuestHouseManagement Component** (`admin/GuestHouseManagement.jsx`)
   - View all booking requests
   - Filter by status (All, Pending, Approved, Rejected)
   - Approve/Reject buttons
   - WhatsApp integration
   - Delete requests
   - Status badges with colors

3. **AdminDashboard Updated** (`admin/AdminDashboard.jsx`)
   - Added "Guest House" tab

4. **Header Updated** (`components/Header.jsx`)
   - "IEI GUEST HOUSE" link now functional

5. **App.jsx Updated**
   - Guest House page route added

## 🚀 How to Use

### For Users (Booking)

1. **Navigate to Guest House Page:**
   - Click "IEI GUEST HOUSE" in the navigation bar
   - Or visit the page directly

2. **Fill the Booking Form:**
   - **Membership ID / Email**: Your IEI membership ID or email
   - **Full Name**: Your complete name
   - **Mobile Number**: 10-digit mobile number (e.g., 9876543210)
   - **From Date**: Check-in date
   - **To Date**: Check-out date
   - **Check-in Time**: Arrival time
   - **Check-out Time**: Departure time

3. **Submit Request:**
   - Click "Submit Request" button
   - You'll see a success message
   - Admin will review your request

4. **Receive Confirmation:**
   - You'll receive a WhatsApp message when approved/rejected
   - Message includes booking details

### For Admin (Managing Requests)

1. **Access Admin Panel:**
   - Login to admin panel
   - Go to "Guest House" tab

2. **View Requests:**
   - See all booking requests
   - Filter by status: All, Pending, Approved, Rejected
   - Each card shows complete booking details

3. **Approve Request:**
   - Click "Approve" button on pending request
   - Confirmation dialog appears
   - WhatsApp message automatically opens in new tab
   - Send the pre-filled message to user

4. **Reject Request:**
   - Click "Reject" button on pending request
   - Enter reason for rejection (optional)
   - WhatsApp message automatically opens
   - Send rejection message to user

5. **Send WhatsApp Again:**
   - For approved/rejected requests
   - Click "Send WhatsApp" button
   - Message opens in new tab

6. **Delete Request:**
   - Click "Delete" button
   - Confirmation dialog appears
   - Request is permanently deleted

## 📱 WhatsApp Integration

### How It Works

1. **Automatic Message Generation:**
   - When admin approves/rejects, WhatsApp URL is generated
   - Opens in new browser tab
   - Pre-filled message with booking details

2. **Approval Message Format:**
```
Dear [Name],

Your IEI Guest House booking request has been APPROVED!

Booking Details:
Membership ID: [ID]
Check-in: [Date] at [Time]
Check-out: [Date] at [Time]

Please carry your membership card and valid ID proof.

Thank you,
IEI Chh. Sambhajinagar
```

3. **Rejection Message Format:**
```
Dear [Name],

We regret to inform you that your IEI Guest House booking request has been REJECTED.

Reason: [Admin Notes]

Please contact us for alternative dates.

Thank you,
IEI Chh. Sambhajinagar
```

### WhatsApp URL Format
```
https://wa.me/91[mobile]?text=[encoded_message]
```

**Note:** Mobile number is automatically formatted (removes spaces, dashes, etc.)

## 📊 API Endpoints

### Submit Booking Request (Public)
```http
POST http://localhost:5000/api/guesthouse
Content-Type: application/json

{
  "membershipId": "IEI12345",
  "name": "John Doe",
  "mobile": "9876543210",
  "fromDate": "2024-12-15",
  "toDate": "2024-12-17",
  "checkInTime": "14:00",
  "checkOutTime": "11:00"
}
```

### Get All Requests (Admin)
```http
GET http://localhost:5000/api/guesthouse
```

### Approve/Reject Request (Admin)
```http
PUT http://localhost:5000/api/guesthouse/:id/status
Content-Type: application/json

{
  "status": "approved",
  "adminNotes": "Optional notes"
}
```

### Send WhatsApp Message (Admin)
```http
POST http://localhost:5000/api/guesthouse/:id/whatsapp
```

**Response:**
```json
{
  "success": true,
  "message": "WhatsApp URL generated",
  "whatsappUrl": "https://wa.me/919876543210?text=...",
  "mobile": "9876543210"
}
```

### Delete Request (Admin)
```http
DELETE http://localhost:5000/api/guesthouse/:id
```

## 📁 File Structure

```
IEI Website Backend/
├── models/
│   ├── Admin.js
│   ├── Event.js
│   ├── Highlight.js
│   └── GuestHouseRequest.js    ✨ NEW
├── controllers/
│   ├── eventController.js
│   ├── highlightController.js
│   └── guestHouseController.js ✨ NEW
├── routes/
│   ├── eventRoutes.js
│   ├── highlightRoutes.js
│   └── guestHouseRoutes.js     ✨ NEW
├── server.js                    📝 UPDATED
└── package.json

IEI Website Frontend/
├── src/
│   ├── admin/
│   │   ├── AdminLogin.jsx
│   │   ├── AdminDashboard.jsx        📝 UPDATED
│   │   ├── EventManagement.jsx
│   │   ├── HighlightManagement.jsx
│   │   └── GuestHouseManagement.jsx  ✨ NEW
│   ├── components/
│   │   ├── Header.jsx                📝 UPDATED
│   │   ├── GuestHouse.jsx            ✨ NEW
│   │   └── ...
│   └── App.jsx                       📝 UPDATED
```

## 🎨 Status Colors

- **Pending**: Yellow badge
- **Approved**: Green badge
- **Rejected**: Red badge

## 📋 Form Validation

### Mobile Number
- Must be exactly 10 digits
- Only numbers allowed
- Format: 9876543210

### Dates
- From Date: Cannot be in the past
- To Date: Must be after From Date
- Both dates required

### Times
- Check-in Time: Required
- Check-out Time: Required
- Standard time format (HH:MM)

## 🔔 Important Information

### For Users
- ✅ Carry membership card and valid ID proof
- ✅ Standard check-in: After 12:00 PM
- ✅ Standard check-out: Before 11:00 AM
- ✅ Booking subject to availability
- ✅ Confirmation via WhatsApp

### For Admin
- ✅ Review requests promptly
- ✅ Provide reason when rejecting
- ✅ Send WhatsApp message after approval/rejection
- ✅ Keep mobile number format correct (10 digits)

## 🛠️ Customization

### Change WhatsApp Message Template

**Edit:** `controllers/guestHouseController.js` (Line 130-150)

```javascript
// Approval message
message = `Your custom approval message here...`;

// Rejection message
message = `Your custom rejection message here...`;
```

### Change Form Fields

**Edit:** `components/GuestHouse.jsx`

Add new fields to `formData` state and form JSX.

### Change Status Options

**Edit:** `models/GuestHouseRequest.js` (Line 38)

```javascript
enum: ['pending', 'approved', 'rejected', 'cancelled']
```

## 🔄 Workflow

1. **User submits booking request** → Saved to MongoDB with status "pending"
2. **Admin views in admin panel** → All requests visible with filters
3. **Admin approves/rejects** → Status updated in database
4. **WhatsApp opens automatically** → Pre-filled message ready to send
5. **Admin sends message** → User receives confirmation
6. **User receives notification** → Booking confirmed or alternative suggested

## 🐛 Troubleshooting

### WhatsApp not opening?
- Check if mobile number is 10 digits
- Verify browser allows pop-ups
- Check console for errors

### Requests not showing?
- Verify backend is running
- Check MongoDB connection
- Check API URL in frontend

### Form validation errors?
- Mobile: Must be exactly 10 digits
- Dates: Cannot be in past
- All fields are required

## ✨ Features Summary

✅ **User Booking Form**: Beautiful, validated form
✅ **Admin Management**: Complete CRUD operations
✅ **Status Tracking**: Pending, Approved, Rejected
✅ **WhatsApp Integration**: Auto-generated messages
✅ **Filter System**: View by status
✅ **Mobile Validation**: 10-digit format
✅ **Date Validation**: No past dates
✅ **Success Messages**: User feedback
✅ **Responsive Design**: Works on all devices
✅ **Real-time Updates**: Instant status changes

---

**🎉 Your Guest House booking system is now fully functional!**

Users can submit booking requests through the website, and admin can approve/reject them with automatic WhatsApp notifications sent to users' mobile numbers.
