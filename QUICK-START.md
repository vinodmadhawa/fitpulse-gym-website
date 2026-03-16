# FitPulse - Quick Start Guide

Get the FitPulse gym website running in 5 minutes!

## What You'll Build

A modern, responsive gym membership website with:
- 🎨 Beautiful hero section with animations
- 📱 Fully responsive design
- 🌙 Dark mode toggle
- 📝 Contact form with validation
- 💰 Pricing plans showcase
- 👥 Team profiles
- 🔗 Integrated backend API

## Prerequisites

Before you start, make sure you have:

- **Node.js** 16+ (Get from [nodejs.org](https://nodejs.org))
- **.NET 8 SDK** (Get from [dotnet.microsoft.com](https://dotnet.microsoft.com))
- **MongoDB** locally running OR [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
- **Git** installed

## Super Fast Setup (5 minutes)

### 1. Start Frontend (Terminal 1)

```bash
cd frontend
npm install
npm run dev
```

**Open:** http://localhost:5173 in your browser

### 2. Start Backend (Terminal 2)

```bash
cd backend
dotnet restore
dotnet run
```

**Swagger API Docs:** http://localhost:5000/swagger

## That's It! 🎉

Your website is now running! Here's what you can do:

### Test the Contact Form
1. Scroll to "Get In Touch" section
2. Fill in the form:
   - Name: "John Doe"
   - Email: "john@example.com"
   - Message: "I'm interested in joining"
3. Click "Send Message"
4. You should see a success message!

### Try Dark Mode
- Click the moon/sun icon in the top-right corner
- The entire site will switch to dark mode

### Explore the Website
- **Hero:** Landing section with CTA buttons
- **About:** Gym information with highlights
- **Services:** 4 service cards (Personal Training, Strength, Cardio, Groups)
- **Trainers:** Meet the fitness experts
- **Membership:** 3 pricing tiers (Basic, Standard, Premium)
- **Contact:** Contact form
- **Footer:** Links and social media

## Testing the API

Open another terminal and test the API:

```bash
# Submit a contact message
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "message": "Interested in personal training"
  }'

# Get all contact messages
curl http://localhost:5000/api/contact
```

## Project Structure

```
fitpulse-gym-website/
├── frontend/          # React app
│   └── src/
│       ├── components/    # 8 React components
│       ├── services/      # API integration
│       └── styles/        # Global CSS
└── backend/           # .NET API
    ├── Controllers/       # API endpoints
    ├── Models/            # Data models
    ├── Services/          # Business logic
    └── Data/              # Database context
```

## Troubleshooting

### Frontend Won't Start
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
npm run dev
```

### Backend Won't Start
```bash
# Ensure MongoDB is running
# If using local MongoDB:
mongod

# Or update appsettings.Development.json with MongoDB Atlas URL
```

### CORS Errors
- Make sure backend is running on `http://localhost:5000`
- Frontend should be on `http://localhost:5173`
- Check CORS is configured in Program.cs

## Key Features to Try

### 1. Responsive Design
- Resize your browser window
- See how layout adapts to different sizes
- Mobile-first approach

### 2. Form Validation
- Try submitting empty form
- Try invalid email
- See real-time error messages

### 3. Animations
- Scroll down the page
- Watch smooth animations on sections
- Hover over cards to see effects

### 4. Dark Mode
- Toggle the theme button
- Your preference is saved!
- Reload page to see it persists

### 5. Navigation
- Click any navigation link
- Page smoothly scrolls to section
- Works from any page position

## Next Steps

### To Customize

1. **Change Colors:** Edit `frontend/src/styles/global.css`
   - Orange: `#ff6b35`
   - Dark: `#1f1f1f`

2. **Update Content:** Edit component files in `frontend/src/components/`
   - Hero.jsx - Landing section
   - Membership.jsx - Pricing plans
   - Services.jsx - Service offerings

3. **Add Features:** Follow the development guide
   - Add new components
   - Create new API endpoints
   - Extend the database

### To Deploy

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy Frontend:** Use [Vercel](https://vercel.com)
3. **Deploy Backend:** Use [Render](https://render.com)
4. **Database:** Use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

See `DEPLOYMENT-GUIDE.md` for detailed instructions.

## Common Commands

### Frontend
```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm install       # Install dependencies
```

### Backend
```bash
dotnet run                    # Start development server
dotnet build -c Release       # Build for production
dotnet restore                # Restore dependencies
dotnet watch run              # Watch mode (auto-reload)
```

## File Structure at a Glance

```
Frontend has 8 components:
✅ Hero - Landing banner
✅ About - Gym information
✅ Services - Service cards
✅ Trainers - Team profiles
✅ Membership - Pricing plans
✅ ContactForm - Lead capture
✅ Header - Navigation
✅ Footer - Links

Backend has 5 API endpoints:
✅ POST /api/contact - Create message
✅ GET /api/contact - Get all
✅ GET /api/contact/{id} - Get one
✅ PUT /api/contact/{id} - Update
✅ DELETE /api/contact/{id} - Delete
```

## Full Documentation

For detailed information, see:
- **[README.md](./README.md)** - Complete project documentation
- **[DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md)** - How to deploy
- **[DEVELOPMENT-GUIDE.md](./DEVELOPMENT-GUIDE.md)** - How to extend
- **[PROJECT-SUMMARY.md](./PROJECT-SUMMARY.md)** - What was built

## Need Help?

### Common Issues

**Q: Port 5000 already in use**
```bash
# Change port in Properties/launchSettings.json
# Or kill process using the port
```

**Q: MongoDB connection error**
```bash
# Make sure MongoDB is installed and running
mongod

# Or update connection string in appsettings.Development.json
```

**Q: npm install fails**
```bash
npm cache clean --force
rm package-lock.json
npm install
```

**Q: Can't submit contact form**
```bash
# Check backend is running
# Check CORS configuration
# Check browser console for errors
```

## Tech Stack

**Frontend:**
- React 18
- Vite 5
- Framer Motion (animations)
- React Hook Form (validation)
- Axios (HTTP)
- CSS3 (responsive)

**Backend:**
- ASP.NET Core 8
- MongoDB Driver
- C# 12
- .NET 8

## What You're Learning

This project demonstrates:
- ✅ Full-stack development
- ✅ Modern web UI/UX
- ✅ Responsive design
- ✅ API development
- ✅ Database integration
- ✅ Component architecture
- ✅ State management
- ✅ Form handling & validation
- ✅ Dark mode implementation
- ✅ Performance optimization

## Stats

- **Components:** 8 React components
- **API Endpoints:** 5 RESTful endpoints
- **Lines of Code:** 2500+ (frontend), 600+ (backend)
- **Total Files:** 40+
- **Animations:** 15+ smooth transitions
- **Responsive Breakpoints:** 3 (mobile, tablet, desktop)

## Ready to Ship! 🚀

This is a production-ready application that can be deployed immediately.

---

**Questions?** Check the documentation files or the code comments.

**Having fun?** Star the repository and share it with others!

**Want to extend it?** See DEVELOPMENT-GUIDE.md for best practices.

---

**Happy coding! Build something amazing! ✨**
