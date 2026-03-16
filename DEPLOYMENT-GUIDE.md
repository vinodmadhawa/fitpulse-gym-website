# Deployment Guide for FitPulse

This guide provides step-by-step instructions for deploying FitPulse to production.

## Prerequisites

- GitHub account for storing code
- Vercel account for frontend deployment
- Render account (or similar) for backend deployment
- MongoDB Atlas account for managed database

## Table of Contents

1. [Prepare Code for Production](#prepare-code-for-production)
2. [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
3. [Backend Deployment (Render)](#backend-deployment-render)
4. [Environment Configuration](#environment-configuration)
5. [Testing Production](#testing-production)
6. [Troubleshooting](#troubleshooting)

## Prepare Code for Production

### Frontend

1. **Build the project:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Test production build locally:**
   ```bash
   npm run preview
   ```

3. **Check for console errors and warnings**

### Backend

1. **Build the project:**
   ```bash
   cd backend
   dotnet build -c Release
   ```

2. **Run tests (if available):**
   ```bash
   dotnet test
   ```

## Frontend Deployment (Vercel)

### Step 1: Push Code to GitHub

```bash
git init
git add .
git commit -m "Initial commit: FitPulse gym website"
git branch -M main
git remote add origin https://github.com/yourusername/fitpulse-gym-website.git
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Visit [https://vercel.com](https://vercel.com) and sign up
2. Click "New Project"
3. Import your GitHub repository
4. Configure project settings:
   - **Framework Preset:** Vite
   - **Root Directory:** ./frontend
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

5. Set environment variables:
   ```
   VITE_API_URL=https://your-api-domain.com/api
   ```

6. Click "Deploy"

### Step 3: Configure Custom Domain (Optional)

1. In Vercel dashboard, go to project settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed

## Backend Deployment (Render)

### Step 1: Prepare Backend for Deployment

1. **Create .dockerignore** (if using Docker):
   ```
   bin/
   obj/
   .git/
   .vs/
   .idea/
   ```

2. **Update appsettings.json for production:**
   ```json
   {
     "ConnectionStrings": {
       "MongoDB": "${MONGODB_URI}"
     },
     "DatabaseName": "GymDb",
     "Logging": {
       "LogLevel": {
         "Default": "Information"
       }
     }
   }
   ```

### Step 2: Create MongoDB Atlas Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create database user with username and password
4. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/GymDb?retryWrites=true&w=majority`
5. Whitelist Render IP (get from Render dashboard)

### Step 3: Deploy to Render

1. Visit [Render.com](https://render.com)
2. Click "New+" and select "Web Service"
3. Connect your GitHub repository
4. Configure settings:
   - **Name:** fitpulse-api
   - **Environment:** .NET
   - **Region:** Closest to your users
   - **Branch:** main
   - **Build Command:** `dotnet build -c Release`
   - **Start Command:** `dotnet GymApi.dll --urls="http://0.0.0.0:${PORT}"`

5. Set environment variables:
   ```
   ASPNETCORE_ENVIRONMENT=Production
   ASPNETCORE_URLS=http://0.0.0.0:${PORT}
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/GymDb?retryWrites=true&w=majority
   DatabaseName=GymDb
   ```

6. Click "Create Web Service"

### Step 4: Get Render API URL

- Copy the URL from Render dashboard (e.g., `https://fitpulse-api.onrender.com`)
- Update frontend environment variable with this URL

## Environment Configuration

### Frontend Environment Variables

**File:** `frontend/.env.production`

```env
VITE_API_URL=https://your-api-domain.com/api
```

### Backend Environment Variables

Set these in your deployment platform:

```
ASPNETCORE_ENVIRONMENT=Production
ConnectionStrings:MongoDB=mongodb+srv://user:password@cluster.mongodb.net/GymDb?retryWrites=true&w=majority
DatabaseName=GymDb
```

## Update CORS Configuration

### Backend (Program.cs)

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policyBuilder =>
    {
        policyBuilder
            .WithOrigins(
                "https://www.yourdomain.com",
                "https://yourdomain.com",
                "https://yourapp.vercel.app"
            )
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});
```

## Testing Production

### Frontend Testing

1. Visit your Vercel URL
2. Test all sections load correctly
3. Check responsive design on mobile
4. Test dark mode toggle

### Backend Testing

```bash
# Test API endpoint
curl https://your-api-domain.com/api/contact

# Test form submission
curl -X POST https://your-api-domain.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Testing production deployment"
  }'
```

### End-to-End Testing

1. Navigate to frontend URL
2. Scroll through all sections
3. Fill and submit contact form
4. Check email for confirmation (if setup)
5. Log in to backend to verify message was saved

## Troubleshooting

### CORS Errors

**Problem:** "Access to XMLHttpRequest blocked by CORS policy"

**Solution:**
1. Check frontend URL matches CORS whitelist in backend
2. Ensure `program.cs` has CORS configured
3. Clear browser cache and reload
4. Check browser console for actual error message

### Form Submission Fails

**Problem:** Form submission returns 500 error

**Solution:**
1. Check MongoDB connection string
2. Verify database is running
3. Check backend logs in deployment platform
4. Ensure all environment variables are set

### API Not Responding

**Problem:** API endpoint returns 404 or timeout

**Solution:**
1. Verify backend is deployed and running
2. Check deployment logs for errors
3. Test API directly with postman or curl
4. Check firewall and network settings

### Dark Mode Not Working

**Problem:** Dark mode toggle doesn't persist

**Solution:**
1. Check browser localStorage is enabled
2. Clear browser cache
3. Check browser developer tools for JavaScript errors

## Monitoring

### Set Up Alerts

**Vercel:**
- Enable email notifications for deployment failures
- Monitor analytics dashboard

**Render:**
- Set up email notifications for application crashes
- Monitor error logs

**MongoDB:**
- Set up connection alerts
- Monitor storage usage

## Rollback Procedure

### Frontend (Vercel)

1. Go to Deployments tab
2. Find previous successful deployment
3. Click "Rollback" button

### Backend (Render)

1. Go to Events tab
2. Find previous successful deployment
3. Click deployment and select "Rollback"

## Performance Optimization

### Frontend

```bash
npm run build
# Check bundle size
npm install -g webpack-bundle-analyzer
```

### Backend

1. Enable response compression in Program.cs
2. Implement caching headers
3. Monitor database query performance

## Security Checklist

- [ ] Remove debug logging in production
- [ ] Update CORS to specific domains only
- [ ] Use HTTPS everywhere
- [ ] Enable MongoDB IP whitelist
- [ ] Set strong database passwords
- [ ] Implement API rate limiting
- [ ] Add request logging and monitoring
- [ ] Regular security updates for dependencies

## Maintenance

### Regular Updates

```bash
# Frontend
npm update
npm audit fix

# Backend
dotnet list package --outdated
```

### Database Maintenance

1. Regular backups (MongoDB Atlas does this automatically)
2. Monitor storage usage
3. Clean old/test data periodically
4. Optimize indexes for frequent queries

## Support & Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Guide](https://docs.atlas.mongodb.com/)
- [ASP.NET Core Deployment](https://learn.microsoft.com/en-us/aspnet/core/deployment/)

---

**Deployment completed! Your FitPulse website is now live.** 🚀
