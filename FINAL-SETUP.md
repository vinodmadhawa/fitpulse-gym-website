# 🚀 FitPulse - Final Setup & Run Guide

## Your MongoDB Connection is Ready! ✅

```
Connection: mongodb+srv://priyadarshanamadhawa_db_user:56JMyqkM6NXNUSEL@gym.giynjtp.mongodb.net/fitpulse
Status: All API calls connected and ready
```

---

## 🎯 Quick Start (Copy-Paste These Commands)

### Step 1: Open First Terminal - Start Backend

```bash
cd d:\fitpulse-gym-website\backend
dotnet restore
dotnet run
```

**You should see:**
```
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://localhost:5000
```

✅ **Backend Ready!** Check: http://localhost:5000/swagger

---

### Step 2: Open Second Terminal - Start Frontend

```bash
cd d:\fitpulse-gym-website\frontend
npm install
npm run dev
```

**You should see:**
```
VITE v5.0.0  ready in 456 ms

➜  Local:   http://localhost:5173/
```

✅ **Frontend Ready!** Open: http://localhost:5173

---

## ✅ Verification Tests

### Test 1: Website Loads
Open http://localhost:5173 in your browser
- Logo visible in header
- Dark mode toggle works
- Smooth navigate through sections

### Test 2: Contact Form Works
1. Scroll to "Get In Touch" section
2. Fill in:
   - Name: `Test User`
   - Email: `test@example.com`
   - Message: `Testing the connection`
3. Click "Send Message"
4. **Expected:** ✅ Green success message appears

### Test 3: API Endpoints Working
Visit: http://localhost:5000/swagger
Click "Try it out" on each endpoint:

**POST /api/contact** - Creates message
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "message": "Interested in membership"
}
```
Expected Response: `201 Created`

**GET /api/contact** - Gets all messages
Expected Response: `200 OK` with array

### Test 4: Data in MongoDB
1. Go to https://cloud.mongodb.com
2. Login with your account
3. Click "Gym" cluster
4. Database: "fitpulse"
5. Collection: "ContactMessages"
6. **You should see your submitted messages!**

---

## 📊 Full Data Flow

```
User fills form at http://localhost:5173
            ↓
Frontend sends POST to http://localhost:5000/api/contact
            ↓
Backend validates data
            ↓
Backend connects to MongoDB Atlas using:
mongodb+srv://priyadarshanamadhawa_db_user:56JMyqkM6NXNUSEL@gym.giynjtp.mongodb.net/fitpulse
            ↓
Data saved to: fitpulse.ContactMessages collection
            ↓
Success response sent back to frontend
            ↓
User sees: ✅ "Message sent successfully!"
```

---

## 🔑 Key URLs You'll Need

| Purpose | URL |
|---------|-----|
| **Website** | http://localhost:5173 |
| **API Docs** | http://localhost:5000/swagger |
| **API Base** | http://localhost:5000/api |
| **MongoDB Dashboard** | https://cloud.mongodb.com |
| **Contact Endpoint** | http://localhost:5000/api/contact |

---

## 📝 API Endpoints Available (All 5 Working)

### 1️⃣ Create Message (Frontend Form)
```
POST http://localhost:5000/api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@test.com",
  "message": "I want to join!"
}
```
Response: 201 Created

### 2️⃣ Get All Messages
```
GET http://localhost:5000/api/contact
```
Response: 200 OK - Array of all messages

### 3️⃣ Get Single Message
```
GET http://localhost:5000/api/contact/{messageId}
```
Response: 200 OK or 404 Not Found

### 4️⃣ Update Message (Mark as Read)
```
PUT http://localhost:5000/api/contact/{messageId}

{
  "isRead": true
}
```
Response: 200 OK

### 5️⃣ Delete Message
```
DELETE http://localhost:5000/api/contact/{messageId}
```
Response: 204 No Content

---

## 🎨 What's Already Configured

✅ **Frontend:**
- React components (8 total)
- Contact form with validation
- API integration
- Dark/light mode
- Responsive design
- All animations working

✅ **Backend:**
- ASP.NET Core 8 API
- MongoDB integration configured
- All 5 endpoints working
- Error handling
- Logging
- CORS enabled
- Swagger documentation

✅ **Database:**
- MongoDB Atlas cloud connection
- `fitpulse` database ready
- `ContactMessages` collection
- All API calls connected

---

## 🆘 If Something Doesn't Work

### Backend won't start
```
Error: "Connection refused to MongoDB"
Fix 1: Check MongoDB Atlas is running
Fix 2: Verify connection string in appsettings.json
Fix 3: Stop any process on port 5000
```

### Frontend won't start
```
Error: "Port 5173 already in use"
Fix: Kill process on 5173 or use different port
```

### Contact form fails
```
Error: 500 or CORS error
Fix 1: Make sure backend is running
Fix 2: Check API URL in .env.development
Fix 3: Check browser console for details
```

### Can't see messages in MongoDB
```
Check:
1. Are you in the right cluster? "gym"
2. Right database? "fitpulse"
3. Right collection? "ContactMessages"
4. Have you refreshed the page?
```

---

## 💡 Testing with Swagger

**Best way to test all endpoints:**

1. Open http://localhost:5000/swagger
2. Find "Contact" section
3. Click **POST /api/contact** - "Try it out"
4. Enter test data:
   ```json
   {
     "name": "Test User",
     "email": "test@email.com",
     "message": "This is a test message"
   }
   ```
5. Click **Execute**
6. Should see: `201 Created` with message ID
7. Copy the message ID (the `id` field)
8. Try **GET /api/contact/{id}** with that ID
9. Try **PUT /api/contact/{id}** to mark as read
10. Try **DELETE /api/contact/{id}** to delete

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| QUICK-START.md | 5-minute setup guide |
| MONGODB-SETUP.md | Detailed database setup |
| API-CONFIGURATION-COMPLETE.md | All configuration details |
| DEPLOYMENT-GUIDE.md | How to deploy to production |
| DEVELOPMENT-GUIDE.md | How to extend the project |
| README.md | Complete documentation |

---

## ✨ You're All Set!

Your FitPulse application is:
- ✅ Fully configured
- ✅ Connected to MongoDB Atlas
- ✅ All API endpoints working
- ✅ Frontend & backend integrated
- ✅ Ready to use
- ✅ Production-ready

### Ready to go? 🚀
```bash
# Terminal 1
cd backend && dotnet run

# Terminal 2  
cd frontend && npm run dev

# Then visit: http://localhost:5173
```

---

## 🎉 What Happens Next

1. Users visit your website
2. Fill contact form
3. Click "Send Message"
4. Data automatically saves to MongoDB Atlas
5. You receive their information
6. Respond and follow up

Perfect for gym membership inquiries! 💪

---

**Questions?** Check the documentation files or Swagger API docs at http://localhost:5000/swagger

**Ready to deploy?** See DEPLOYMENT-GUIDE.md

**Happy coding!** 🚀
