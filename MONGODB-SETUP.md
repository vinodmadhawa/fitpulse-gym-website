# MongoDB Atlas Setup - FitPulse

## Your Connection Details

```
Connection String: mongodb+srv://priyadarshanamadhawa_db_user:56JMyqkM6NXNUSEL@gym.giynjtp.mongodb.net/?appName=Gym
Database: fitpulse
```

## What's Been Configured

✅ **Backend Configuration (Already Updated):**
- `appsettings.json` - Production connection with your MongoDB Atlas credentials
- `appsettings.Development.json` - Development connection (same as production)
- `Program.cs` - Updated to read MongoDB connection from configuration
- All API endpoints ready to use

✅ **Frontend Configuration (Already Ready):**
- API client configured at `frontend/src/services/api.js`
- Environment variables set for local/production
- Contact form connected to backend

## Step-by-Step: Getting It All Running

### Step 1: Verify MongoDB Connection (Optional, but recommended)

Test if your MongoDB connection is accessible:

```bash
# Install MongoDB shell (optional, for testing)
# Download from: https://www.mongodb.com/try/download/shell

# Test connection (replace with your credentials if using new shell)
# Or skip this and test with the application directly
```

### Step 2: Start Backend

```bash
# Navigate to backend folder
cd backend

# Restore dependencies
dotnet restore

# Run backend server
dotnet run
```

**Expected Output:**
```
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://localhost:5000
info: Microsoft.Hosting.Lifetime[0]
      Application started. Press Ctrl+C to stop, restarting due to file change.
```

**Verify Backend is Running:**
- Visit: http://localhost:5000/swagger
- You should see Swagger API documentation

### Step 3: Start Frontend

```bash
# In a NEW terminal, navigate to frontend folder
cd frontend

# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

**Expected Output:**
```
VITE v5.0.0  ready in 456 ms

➜  Local:   http://localhost:5173/
```

### Step 4: Test the Complete Connection

1. **Open Website:** http://localhost:5173

2. **Test Contact Form:**
   - Scroll to "Get In Touch" section
   - Fill in the form:
     ```
     Name: John Test
     Email: john@test.com
     Message: Testing MongoDB connection with Atlas
     ```
   - Click "Send Message"
   - You should see: ✅ "Message sent successfully!"

3. **Verify in Backend:**
   - Check backend terminal - you should see logs like:
   ```
   info: GymApi.Controllers.ContactController[0]
         New contact message created from john@test.com
   ```

4. **Access API Directly:**
   - Open: http://localhost:5000/swagger
   - Click "Try it out" on POST /api/contact
   - Submit test data
   - Should return 201 Created with message ID

5. **View All Messages in MongoDB Atlas:**
   - Go to: https://cloud.mongodb.com
   - Login with your credentials
   - Navigate to "Gym" cluster → "fitpulse" database → "ContactMessages" collection
   - You should see all submitted messages

## API Endpoints (All Working)

### 1. Create Contact Message
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "message": "Interested in premium membership"
  }'
```

**Response (201 Created):**
```json
{
  "id": "65a1b2c3d4e5f6g7h8i9j0k1",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "message": "Interested in premium membership",
  "createdAt": "2024-01-15T10:30:00Z",
  "isRead": false
}
```

### 2. Get All Messages
```bash
curl http://localhost:5000/api/contact
```

**Response (200 OK):**
```json
[
  {
    "id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "message": "Interested in premium membership",
    "createdAt": "2024-01-15T10:30:00Z",
    "isRead": false
  },
  // ... more messages
]
```

### 3. Get Single Message
```bash
curl http://localhost:5000/api/contact/65a1b2c3d4e5f6g7h8i9j0k1
```

### 4. Update Message (Mark as Read)
```bash
curl -X PUT http://localhost:5000/api/contact/65a1b2c3d4e5f6g7h8i9j0k1 \
  -H "Content-Type: application/json" \
  -d '{
    "isRead": true
  }'
```

### 5. Delete Message
```bash
curl -X DELETE http://localhost:5000/api/contact/65a1b2c3d4e5f6g7h8i9j0k1
```

## Configuration Files Modified

### 1. Backend/appsettings.json
```json
{
  "MongoDb": {
    "ConnectionString": "mongodb+srv://priyadarshanamadhawa_db_user:56JMyqkM6NXNUSEL@gym.giynjtp.mongodb.net/?appName=Gym",
    "DatabaseName": "fitpulse"
  }
}
```

### 2. Backend/appsettings.Development.json
```json
{
  "MongoDb": {
    "ConnectionString": "mongodb+srv://priyadarshanamadhawa_db_user:56JMyqkM6NXNUSEL@gym.giynjtp.mongodb.net/?appName=Gym",
    "DatabaseName": "fitpulse"
  }
}
```

### 3. Backend/Program.cs
Updated to read MongoDB configuration:
```csharp
var connectionString = configuration.GetSection("MongoDb")["ConnectionString"];
var databaseName = configuration.GetSection("MongoDb")["DatabaseName"];
```

### 4. Frontend/.env.development
```
VITE_API_URL=http://localhost:5000/api
```

## Troubleshooting

### Issue: Backend won't start
**Problem:** `Error connecting to MongoDB`

**Solution:**
1. Check connection string is correct in `appsettings.Development.json`
2. Verify MongoDB Atlas cluster is active: https://cloud.mongodb.com
3. Check IP whitelist allows your connection: Network Access → IP Whitelist
4. Allow "Access from anywhere": 0.0.0.0/0

### Issue: Contact form submission fails
**Problem:** 400 Bad Request or connection error

**Solution:**
1. Ensure backend is running: `dotnet run`
2. Check CORS is enabled (it is by default)
3. Verify API URL in `.env.development`: `http://localhost:5000/api`
4. Check browser console for error messages

### Issue: Data not appearing in MongoDB Atlas
**Problem:** Messages submitted but can't see them in database

**Solution:**
1. Verify correct database selected: `gym` cluster → `fitpulse` database
2. Check collection name: `ContactMessages`
3. Refresh the MongoDB Atlas page
4. Check backend wasn't using a different database name

### Issue: "Connection string has invalid credentials"
**Problem:** MongoDB rejects connection

**Solution:**
1. Generate new credentials in MongoDB Atlas:
   - Go to Database Access
   - Delete old user
   - Create new user with strong password
   - Copy new connection string
2. Update both appsettings files with new connection string
3. Restart backend

## Full Startup Checklist

- [ ] MongoDB Atlas cluster is created and active
- [ ] IP Whitelist allows your IP (or 0.0.0.0/0)
- [ ] Connection string updated in both appsettings files
- [ ] Backend: `dotnet restore && dotnet run`
- [ ] Frontend: `npm install && npm run dev`
- [ ] Swagger loads at http://localhost:5000/swagger
- [ ] Website loads at http://localhost:5173
- [ ] Contact form submits successfully
- [ ] Message appears in MongoDB Atlas console
- [ ] All 5 API endpoints working (test in Swagger)

## Next Steps

### Ready to Deploy?
See [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md)

### Need to Customize?
1. Edit API endpoints in `backend/Controllers/ContactController.cs`
2. Add new fields to model in `backend/Models/ContactMessage.cs`
3. Update frontend form in `frontend/src/components/ContactForm.jsx`

### Want to Add More Collections?
1. Create new Model (e.g., `backend/Models/Membership.cs`)
2. Add collection property to `MongoDbContext.cs`
3. Create Service and Controller
4. Register service in `Program.cs`

---

**You're all set! Your FitPulse app is now connected to MongoDB Atlas and ready to receive member inquiries.** 🎉
