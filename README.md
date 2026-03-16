# FitPulse - Gym Website

A modern, responsive promotional website for a local fitness brand built with React and ASP.NET Core.

![FitPulse Website Preview](https://via.placeholder.com/1200x600?text=FitPulse+Gym+Website)

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Git Workflow](#git-workflow)
- [Contributing](#contributing)

## 🎯 Project Overview

FitPulse is a full-stack web application designed to help a local gym attract new members. The website showcases the gym's services, membership plans, featured trainers, and provides a contact form for interested customers.

**Live Demo:** (To be deployed)
**Assignment:** Web Development Internship at Koncepthive

## 💻 Tech Stack

### Frontend
- **Framework:** React 18.2
- **Build Tool:** Vite 5.0
- **Styling:** CSS3 (Flexbox/Grid)
- **Animations:** Framer Motion
- **Form Management:** React Hook Form
- **HTTP Client:** Axios
- **Icons:** Lucide React

### Backend
- **Framework:** ASP.NET Core 8.0
- **Language:** C#
- **Database:** MongoDB
- **API Documentation:** Swagger/OpenAPI

### DevOps & Deployment
- **Frontend Deployment:** Vercel/Netlify
- **Backend Deployment:** Render/Railway/Azure
- **Version Control:** Git

## ✨ Features

### Frontend
- ✅ Responsive design (Mobile, Tablet, Desktop)
- ✅ Dark mode toggle
- ✅ Smooth scroll animations
- ✅ Form validation with React Hook Form
- ✅ Loading states and error handling
- ✅ Mobile-first CSS approach
- ✅ SEO-friendly structure
- ✅ Accessibility features

### Sections
1. **Hero Section** - Attractive banner with call-to-action
2. **About Us** - Gym description with key highlights
3. **Services** - 4 service cards with icons and descriptions
4. **Trainers** - Featured trainer profiles with overlay effects
5. **Membership Plans** - 3 pricing tiers (Basic, Standard, Premium)
6. **Contact Form** - Validated form with success/error messages
7. **Footer** - Links and social media connections

### Backend API
- ✅ RESTful API endpoints
- ✅ Input validation
- ✅ Error handling
- ✅ CORS enabled
- ✅ Dependency injection
- ✅ Logging
- ✅ Swagger documentation

## 📁 Project Structure

```
fitpulse-gym-website/
├── frontend/                          # React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Trainers.jsx
│   │   │   ├── Membership.jsx
│   │   │   ├── ContactForm.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── *.css (Component styles)
│   │   ├── services/
│   │   │   └── api.js                # API integration
│   │   ├── styles/
│   │   │   └── global.css            # Global styles
│   │   ├── App.jsx                   # Main component
│   │   └── main.jsx                  # Entry point
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   ├── .env.development
│   ├── .env.production
│   └── .gitignore
│
├── backend/                           # .NET Core API
│   ├── Controllers/
│   │   └── ContactController.cs      # API endpoints
│   ├── Models/
│   │   └── ContactMessage.cs         # Data model
│   ├── Services/
│   │   └── ContactService.cs         # Business logic
│   ├── Data/
│   │   └── MongoDbContext.cs         # Database context
│   ├── Properties/
│   │   └── launchSettings.json
│   ├── Program.cs                    # Application setup
│   ├── appsettings.json
│   ├── appsettings.Development.json
│   ├── GymApi.csproj
│   └── .gitignore
│
└── README.md                          # This file
```

## 🚀 Setup Instructions

### Prerequisites

- **Node.js** 16+ with npm/yarn/pnpm
- **.NET 8 SDK**
- **MongoDB** (local or Atlas)
- **Git**

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Create environment file:**
   ```bash
   # .env.development (already provided)
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The app will be available at `http://localhost:5173`

5. **Build for production:**
   ```bash
   npm run build
   npm run preview
   ```

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Ensure MongoDB is running:**
   ```bash
   # If using local MongoDB
   mongod
   
   # Or use MongoDB Atlas connection string in appsettings.json
   ```

3. **Update connection string (if needed):**
   
   Edit `appsettings.Development.json`:
   ```json
   {
     "ConnectionStrings": {
       "MongoDB": "mongodb://localhost:27017"
     },
     "DatabaseName": "GymDb"
   }
   ```

4. **Restore dependencies and run:**
   ```bash
   dotnet restore
   dotnet run
   ```

   The API will be available at `http://localhost:5000`
   
   Swagger UI at `http://localhost:5000/swagger`

5. **Build for production:**
   ```bash
   dotnet build -c Release
   ```

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Create Contact Message
```http
POST /contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I'm interested in joining the gym"
}
```

**Response (201 Created):**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I'm interested in joining the gym",
  "createdAt": "2024-03-17T10:30:00Z",
  "isRead": false
}
```

#### Get All Contact Messages (Admin)
```http
GET /contact
```

**Response (200 OK):**
```json
[
  {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "message": "I'm interested in joining",
    "createdAt": "2024-03-17T10:30:00Z",
    "isRead": false
  }
]
```

#### Get Contact Message by ID
```http
GET /contact/{id}
```

#### Update Contact Message
```http
PUT /contact/{id}
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Updated message",
  "isRead": true
}
```

#### Delete Contact Message
```http
DELETE /contact/{id}
```

### Error Responses

**400 Bad Request:**
```json
{
  "message": "Name is required"
}
```

**404 Not Found:**
```json
{
  "message": "Contact message not found"
}
```

**500 Internal Server Error:**
```json
{
  "message": "An error occurred while processing your request"
}
```

## 🧪 Testing API with cURL

```bash
# Test POST request
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "message": "Interested in personal training sessions"
  }'

# Get all messages
curl http://localhost:5000/api/contact

# Get specific message
curl http://localhost:5000/api/contact/{id}

# Delete message
curl -X DELETE http://localhost:5000/api/contact/{id}
```

## 🌐 Deployment

### Frontend Deployment (Vercel)

1. **Create Vercel account:** https://vercel.com

2. **Push code to GitHub**

3. **Deploy on Vercel:**
   ```bash
   npm install -g vercel
   vercel
   ```

4. **Update environment variables:**
   - Go to Vercel Dashboard
   - Set `VITE_API_URL` to production API URL

### Backend Deployment (Render)

1. **Create Render account:** https://render.com

2. **Create new Web Service**

3. **Configure settings:**
   - Runtime: .NET
   - Build Command: `dotnet build -c Release`
   - Start Command: `dotnet GymApi.dll`

4. **Set environment variables:**
   ```
   ASPNETCORE_ENVIRONMENT=Production
   ConnectionStrings:MongoDB=<your-mongodb-atlas-url>
   DatabaseName=GymDb
   ```

### CORS Configuration for Production

Update `Program.cs`:
```csharp
.WithOrigins(
    "https://your-frontend-domain.vercel.app",
    "https://your-custom-domain.com"
)
```

## 📝 Git Workflow & Commit History

Sample commit history demonstrating development progression:

```
1. Initial project setup
   - Create React and .NET projects
   - Install dependencies
   - Configure build tools

2. Add hero section
   - Create Hero component
   - Add responsive styles
   - Implement animations

3. Add about section
   - Create About component
   - Add gym highlights
   - Style responsive layout

4. Add services component
   - Create 4 service cards
   - Add icons and descriptions
   - Implement card animations

5. Add trainers section
   - Create trainer profiles
   - Add image overlays
   - Responsive grid

6. Add membership plans
   - Create 3 pricing tiers
   - Highlight featured plan
   - Add CTA buttons

7. Implement contact form
   - Create form component
   - Add React Hook Form validation
   - Implement error messages
   - Add success notification

8. Connect frontend to API
   - Configure API client
   - Add axios integration
   - Handle form submission
   - Implement error handling

9. Add dark mode toggle
   - Implement theme switching
   - Add CSS variables
   - Save preference to localStorage

10. Add animations and polish
    - Implement scroll animations
    - Add smooth transitions
    - Refine responsive design

11. Create .NET backend
    - Set up ASP.NET Core project
    - Create data models
    - Implement services

12. Implement API endpoints
    - Create ContactController
    - Add CRUD operations
    - Implement validation
    - Add error handling

13. Configure CORS and deployment
    - Enable CORS for frontend
    - Add Swagger documentation
    - Create deployment configs

14. Deploy frontend and backend
    - Deploy to Vercel
    - Deploy to Render
    - Verify CORS works
```

## 🎨 Design Features

### Dark Mode
- Toggle button in header
- Smooth color transitions
- Preference saved to localStorage
- Applied across all components

### Responsive Design Breakpoints
- **Desktop:** 1024px and above
- **Tablet:** 768px - 1023px
- **Mobile:** Below 768px

### Animations
- Page load animations
- Scroll-triggered reveals
- Hover effects on cards
- Smooth button transitions
- Icon animations

### Color Scheme
- **Primary:** #ff6b35 (Orange)
- **Dark Background:** #1f1f1f
- **Light Background:** #ffffff
- **Text:** #333333 / #f5f5f5

## 🔒 Security Considerations

- ✅ Input validation on frontend and backend
- ✅ Email format validation
- ✅ CORS enabled for specific origins
- ✅ Environment variables for sensitive data
- ✅ Error messages don't expose system details
- ✅ SQL injection prevention (using MongoDB driver)

## 📦 Dependencies

### Frontend
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "framer-motion": "^10.16.4",
  "react-hook-form": "^7.48.0",
  "axios": "^1.6.0",
  "lucide-react": "^0.292.0"
}
```

### Backend
```xml
<PackageReference Include="MongoDB.Driver" Version="2.23.1" />
<PackageReference Include="Microsoft.AspNetCore.Cors" Version="2.2.0" />
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📧 Support

For support, email support@fitpulse.com or open an issue on GitHub.

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [ASP.NET Core Docs](https://learn.microsoft.com/en-us/aspnet/core)
- [MongoDB Driver](https://www.mongodb.com/docs/drivers/csharp/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Hook Form](https://react-hook-form.com/)

---

**Built with ❤️ for the FitPulse Gym Community**

Last Updated: March 17, 2024
