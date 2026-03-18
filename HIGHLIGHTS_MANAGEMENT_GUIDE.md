# 🎨 Dynamic IEI Highlights System - Complete Guide

## ✅ What's Been Created

### Backend (Node.js + MongoDB + Multer)

1. **Highlight Model** (`models/Highlight.js`)
   - Schema for storing highlight data
   - Fields: title, description, images (array), fullContent, order
   - Auto-updates timestamps

2. **Upload Configuration** (`config/upload.js`)
   - Multer setup for image uploads
   - Stores images in `/uploads` folder
   - File validation (only images, max 5MB)
   - Auto-generates unique filenames

3. **Highlight Controller** (`controllers/highlightController.js`)
   - `getAllHighlights()` - Get all active highlights
   - `getHighlightById()` - Get single highlight
   - `createHighlight()` - Create with image upload
   - `updateHighlight()` - Update with new images
   - `deleteHighlight()` - Delete with image cleanup
   - `deleteImage()` - Remove single image

4. **Highlight Routes** (`routes/highlightRoutes.js`)
   - GET `/api/highlights` - Fetch all highlights
   - GET `/api/highlights/:id` - Fetch single highlight
   - POST `/api/highlights` - Create with images
   - PUT `/api/highlights/:id` - Update with images
   - DELETE `/api/highlights/:id` - Delete highlight
   - DELETE `/api/highlights/:id/images` - Delete single image

5. **Server Updated** (`server.js`)
   - Highlight routes integrated
   - Static file serving for `/uploads` folder

### Frontend (React)

1. **HighlightManagement Component** (`admin/HighlightManagement.jsx`)
   - Full CRUD interface
   - Image upload with preview
   - Multiple image support (up to 10)
   - Edit existing images
   - Delete individual images

2. **Content Component Updated** (`components/Content.jsx`)
   - Fetches highlights from API
   - **Auto-sliding carousel** (3 seconds per image)
   - Manual navigation (arrows + dots)
   - Responsive design
   - Click "more..." to view details

3. **HighlightDetail Component** (`components/HighlightDetail.jsx`)
   - Full-page modal view
   - Large image carousel
   - Complete content display
   - Thumbnail gallery
   - Auto-slide + manual controls

4. **AdminDashboard Updated** (`admin/AdminDashboard.jsx`)
   - Added "Highlights" tab
   - Quick action button

5. **App.jsx Updated**
   - Highlight detail modal integration
   - State management for selected highlight

## 🚀 How to Use

### Step 1: Install New Dependency

```bash
cd "c:\Users\Mahesh Thombare\Desktop\IEI Website\IEI Website Backend"
npm install
```

This will install `multer` for file uploads.

### Step 2: Start Backend Server

```bash
npm run dev
```

**Expected Output:**
```
Server is running on port 5000
MongoDB Connected: localhost
```

The `uploads` folder will be created automatically.

### Step 3: Start Frontend

```bash
cd "c:\Users\Mahesh Thombare\Desktop\IEI Website\IEI Website Frontend"
npm run dev
```

### Step 4: Access Admin Panel

1. Click **"Admin"** button
2. Login: `admin@iei.com` / `admin123`
3. Go to **"Highlights"** tab

### Step 5: Add New Highlight

1. Click **"Add New Highlight"**
2. Fill in the form:
   - **Title**: Highlight title
   - **Short Description**: Brief text for card
   - **Full Content**: Detailed information
   - **Display Order**: Sort order (0 = first)
   - **Images**: Upload 3 images (recommended for carousel)
3. Click **"Create Highlight"**

### Step 6: View on Website

1. Go back to home page
2. Scroll to **"IEI Highlights"** section
3. See your highlights with **auto-sliding carousel**
4. Click **"more..."** to view full details

## 🎯 Features

### Auto-Sliding Carousel
- ✅ Images automatically change every 3 seconds
- ✅ Manual navigation with arrow buttons
- ✅ Dot indicators for image position
- ✅ Smooth transitions

### Image Management
- ✅ Upload multiple images (up to 10)
- ✅ Preview before upload
- ✅ Delete individual images
- ✅ Stored in `/uploads` folder
- ✅ Max 5MB per image
- ✅ Supports: JPG, PNG, GIF, WEBP

### Detail View
- ✅ Full-screen modal
- ✅ Large image carousel
- ✅ Complete content display
- ✅ Thumbnail gallery
- ✅ Auto-slide (4 seconds)
- ✅ Image counter (1/3)

## 📊 API Endpoints

### Get All Highlights
```http
GET http://localhost:5000/api/highlights
```

### Create Highlight with Images
```http
POST http://localhost:5000/api/highlights
Content-Type: multipart/form-data

Form Data:
- title: "40th Engineering Congress"
- description: "Join us for the congress"
- fullContent: "Detailed information..."
- order: 0
- images: [file1.jpg, file2.jpg, file3.jpg]
```

### Update Highlight
```http
PUT http://localhost:5000/api/highlights/:id
Content-Type: multipart/form-data

Form Data:
- title: "Updated Title"
- existingImages: ["path1", "path2"]
- images: [newFile.jpg]
```

### Delete Highlight
```http
DELETE http://localhost:5000/api/highlights/:id
```

### Delete Single Image
```http
DELETE http://localhost:5000/api/highlights/:id/images
Content-Type: application/json

{
  "imagePath": "/uploads/highlight-123456.jpg"
}
```

## 📁 File Structure

```
IEI Website Backend/
├── models/
│   ├── Admin.js
│   ├── Event.js
│   └── Highlight.js         ✨ NEW
├── controllers/
│   ├── eventController.js
│   └── highlightController.js ✨ NEW
├── routes/
│   ├── eventRoutes.js
│   └── highlightRoutes.js    ✨ NEW
├── config/
│   ├── database.js
│   └── upload.js             ✨ NEW
├── uploads/                  ✨ NEW (auto-created)
│   └── highlight-*.jpg
├── server.js                 📝 UPDATED
└── package.json              📝 UPDATED

IEI Website Frontend/
├── src/
│   ├── admin/
│   │   ├── AdminLogin.jsx
│   │   ├── AdminDashboard.jsx      📝 UPDATED
│   │   ├── EventManagement.jsx
│   │   └── HighlightManagement.jsx ✨ NEW
│   ├── components/
│   │   ├── Content.jsx             📝 UPDATED
│   │   └── HighlightDetail.jsx     ✨ NEW
│   └── App.jsx                     📝 UPDATED
```

## 🎨 Carousel Settings

### Card Carousel (Content.jsx)
- **Auto-slide**: 3 seconds
- **Images**: 3 recommended
- **Controls**: Arrows + Dots
- **Size**: 192px height

### Detail Carousel (HighlightDetail.jsx)
- **Auto-slide**: 4 seconds
- **Images**: Unlimited
- **Controls**: Arrows + Dots + Thumbnails
- **Size**: 384px height
- **Counter**: Shows current/total

## 🛠️ Customization

### Change Auto-Slide Speed

**In Content.jsx (Line 100):**
```javascript
}, 3000); // Change to 5000 for 5 seconds
```

**In HighlightDetail.jsx (Line 14):**
```javascript
}, 4000); // Change to 6000 for 6 seconds
```

### Change Image Size Limit

**In config/upload.js (Line 34):**
```javascript
fileSize: 5 * 1024 * 1024 // Change to 10 * 1024 * 1024 for 10MB
```

### Change Upload Folder

**In config/upload.js (Line 6):**
```javascript
const uploadDir = path.join(__dirname, '../uploads');
// Change to: path.join(__dirname, '../public/images')
```

## 🔄 How It Works

1. **Admin uploads images** → Saved to `/uploads` folder
2. **Data saved to MongoDB** → With image paths
3. **Frontend fetches highlights** → GET /api/highlights
4. **Carousel displays images** → Auto-slides every 3 seconds
5. **User clicks "more..."** → Opens detail modal
6. **Detail page shows** → Full content + large carousel

## 🛡️ Image Storage

- **Location**: `IEI Website Backend/uploads/`
- **Format**: `highlight-[timestamp]-[random].jpg`
- **Example**: `highlight-1699567890123-456789012.jpg`
- **Access**: `http://localhost:5000/uploads/[filename]`

## 📝 Best Practices

1. **Upload 3 images per highlight** for best carousel effect
2. **Use high-quality images** (at least 800x600)
3. **Keep file sizes under 2MB** for faster loading
4. **Write descriptive titles** (max 100 characters)
5. **Add full content** for detail page
6. **Set display order** to control sequence

## 🐛 Troubleshooting

### Images not uploading?
- Check if `uploads` folder exists
- Verify file size is under 5MB
- Ensure file format is JPG/PNG/GIF/WEBP

### Carousel not auto-sliding?
- Check browser console for errors
- Verify images array has multiple items
- Refresh the page

### Images not displaying?
- Check if backend is running
- Verify image paths in database
- Check browser console for 404 errors

## ✨ Features Summary

✅ **Image Upload**: Multiple images per highlight
✅ **Auto-Sliding Carousel**: 3-second intervals
✅ **Manual Navigation**: Arrows + dot indicators
✅ **Detail Modal**: Full-screen view with large carousel
✅ **CRUD Operations**: Create, Read, Update, Delete
✅ **Image Management**: Add/remove individual images
✅ **Responsive Design**: Works on all devices
✅ **Fallback Data**: Shows default if API fails
✅ **Loading States**: User-friendly loading indicators

---

**🎉 Your IEI Highlights system is now fully dynamic with image carousel!**

Admin can upload multiple images, and they will automatically slide on the website. Users can click "more..." to view full details in a beautiful modal.
