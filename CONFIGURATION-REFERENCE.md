# FitPulse Configuration Reference

Complete guide to all configuration files in the FitPulse project.

## Frontend Configuration Files

### `frontend/package.json`

Main project metadata and dependencies.

**Key Scripts:**
```json
{
  "dev": "vite",              // Start dev server
  "build": "vite build",      // Production build
  "preview": "vite preview"   // Preview production build
}
```

**Key Dependencies:**
- `react` - UI framework
- `framer-motion` - Animations
- `react-hook-form` - Form validation
- `axios` - HTTP client
- `lucide-react` - Icons

### `frontend/vite.config.js`

Build tool configuration.

**Includes:**
- React plugin
- Dev server proxy for API (`/api` → `http://localhost:5000`)
- Build optimization settings

### `frontend/.env.development`

Development environment variables.

```env
VITE_API_URL=http://localhost:5000/api
```

The `VITE_` prefix makes it available in the frontend code via `import.meta.env.VITE_API_URL`

### `frontend/.env.production`

Production environment variables.

```env
VITE_API_URL=https://your-api-domain.com/api
```

Update this when deploying to production.

### `frontend/index.html`

HTML entry point.

**Key Elements:**
- Meta tags for SEO
- Root div for React
- Script tag for main.jsx

## Backend Configuration Files

### `backend/GymApi.csproj`

Project file with dependencies.

**Key Package References:**
- `MongoDB.Driver` - MongoDB connectivity
- `Microsoft.AspNetCore.Cors` - CORS support

### `backend/Program.cs`

Application startup and configuration.

**Configures:**
- MongoDB context
- CORS policy
- Dependency injection
- API controllers
- Logging
- Swagger/OpenAPI

**Key Section - CORS Configuration:**
```csharp
.WithOrigins(
    "http://localhost:5173",      // Vite dev
    "https://your-domain.vercel.app"  // Production
)
```

### `backend/appsettings.json`

Production configuration.

```json
{
  "ConnectionStrings": {
    "MongoDB": "mongodb://localhost:27017"
  },
  "DatabaseName": "GymDb",
  "Logging": {
    "LogLevel": {
      "Default": "Information"
    }
  }
}
```

### `backend/appsettings.Development.json`

Development configuration (overrides appsettings.json).

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Debug"
    }
  },
  "ConnectionStrings": {
    "MongoDB": "mongodb://localhost:27017"
  },
  "DatabaseName": "GymDb"
}
```

### `backend/Properties/launchSettings.json`

Visual Studio/dotnet run settings.

**Key Profiles:**
- `https` - HTTPS development
- `http` - HTTP development (default)
- `IIS Express` - IIS testing

**Settings:**
- Application URL: `http://localhost:5000`
- Launch target: Swagger UI
- Environment: Development

## Important Configuration Changes

### To Change API URL

**Development:**
1. Edit `frontend/.env.development`
2. Change `VITE_API_URL` to your API URL
3. Restart dev server

**Production:**
1. Edit `frontend/.env.production`
2. Change `VITE_API_URL` to production API URL
3. Rebuild: `npm run build`

### To Change MongoDB Connection

**Local MongoDB:**
```json
// appsettings.Development.json
{
  "ConnectionStrings": {
    "MongoDB": "mongodb://localhost:27017"
  }
}
```

**MongoDB Atlas:**
```json
{
  "ConnectionStrings": {
    "MongoDB": "mongodb+srv://user:password@cluster.mongodb.net/GymDb?retryWrites=true&w=majority"
  }
}
```

### To Change CORS Origins

Edit `Program.cs`:

```csharp
.WithOrigins(
    "http://localhost:5173",           // Dev
    "http://localhost:3000",           // Alt dev
    "https://yourdomain.vercel.app",   // Production
    "https://yourdomain.com"           // Custom domain
)
```

### To Change Database Name

Edit both `appsettings.json` files:

```json
{
  "DatabaseName": "CustomDbName"
}
```

## Environment Variables by Platform

### Local Development

**Frontend:**
```
VITE_API_URL=http://localhost:5000/api
```

**Backend:**
```
ASPNETCORE_ENVIRONMENT=Development
MongoDB_ConnectionString=mongodb://localhost:27017
DatabaseName=GymDb
```

### Vercel (Frontend)

Environment variables in Vercel dashboard:
```
VITE_API_URL=https://your-api.onrender.com/api
```

### Render (Backend)

Environment variables in Render dashboard:
```
ASPNETCORE_ENVIRONMENT=Production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/GymDb?retryWrites=true&w=majority
DatabaseName=GymDb
PORT=5000
```

## Configuration for Different Environments

### Development

**Characteristics:**
- Hot module replacement (HMR)
- Source maps enabled
- Verbose logging
- API proxy to localhost

**Files:**
- `.env.development`
- `appsettings.Development.json`

### Staging

**Characteristics:**
- Same as production
- But on staging servers
- For final testing before release

**Configuration:**
- `VITE_API_URL=https://staging-api.example.com/api`
- Production connection strings
- Production logging levels

### Production

**Characteristics:**
- Optimized bundles
- No source maps
- Minimal logging
- Real URLs and credentials

**Files:**
- `.env.production`
- `appsettings.json`

## Security Sensitive Configuration

### Never Commit These

- Database passwords
- API keys
- JWT secrets
- AWS credentials
- MongoDB Atlas passwords

### Use Environment Variables Instead

```csharp
// Bad - Don't do this:
const connectionString = "mongodb+srv://user:password@...";

// Good - Use environment variables:
const connectionString = process.env.MONGODB_URI;
```

## Build Configuration

### Frontend Build

Edit `vite.config.js` to customize:

```javascript
export default defineConfig({
  build: {
    target: 'es2020',
    minify: 'terser',
    sourcemap: false,  // Disable for production
    outDir: 'dist'
  }
})
```

### Backend Build

Edit `GymApi.csproj`:

```xml
<PropertyGroup>
  <TargetFramework>net8.0</TargetFramework>
  <PublishReadyToRun>true</PublishReadyToRun>
</PropertyGroup>
```

## Deployment Configuration Checklist

- [ ] Frontend: Set production API URL in `.env.production`
- [ ] Backend: Update CORS origins in `Program.cs`
- [ ] Backend: Set MongoDB connection string
- [ ] Backend: Disable debug logging in `appsettings.json`
- [ ] Storage: Setup MongoDB Atlas cluster
- [ ] Secrets: Store passwords in environment variables
- [ ] Domain: Configure custom domain in Vercel
- [ ] SSL: Enable HTTPS everywhere
- [ ] Monitoring: Setup error tracking (Sentry, etc)
- [ ] Backups: Enable MongoDB automatic backups
- [ ] GitHub: Create `.env.production` in `.gitignore`
- [ ] Secrets: Never commit sensitive info

## Performance Configuration

### Frontend Optimization

```javascript
// vite.config.js
{
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom']
        }
      }
    }
  }
}
```

### Backend Optimization

```csharp
// Program.cs
builder.Services.AddResponseCaching();
builder.Services.AddMemoryCache();
```

## Monitoring Configuration

### Application Insights (.NET)

```csharp
builder.Services.AddApplicationInsightsTelemetry();
```

### Error Tracking

```csharp
builder.Services.AddScoped<ExceptionHandlingMiddleware>();
```

## Testing Configuration

### Frontend Test Setup

Create `vitest.config.js`:

```javascript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom'
  }
})
```

### Backend Test Setup

Create `GymApi.Tests/GymApi.Tests.csproj`:

```xml
<ItemGroup>
  <PackageReference Include="xunit" Version="2.6.0" />
  <PackageReference Include="Microsoft.NET.Test.Sdk" Version="17.7.0" />
</ItemGroup>
```

## Docker Configuration (Optional)

### Frontend Dockerfile

```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Backend Dockerfile

```dockerfile
FROM mcr.microsoft.com/dotnet/sdk:8.0 as build
WORKDIR /app
COPY *.csproj .
RUN dotnet restore
COPY . .
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out .
EXPOSE 80
ENTRYPOINT ["dotnet", "GymApi.dll"]
```

## Configuration Validation

### Frontend

```bash
# Check environment variables are loaded
npm run dev
# Open browser console and run:
console.log(import.meta.env.VITE_API_URL)
```

### Backend

```bash
# Check appsettings are loaded
dotnet run
# Should see configuration values in startup logs
```

## Common Configuration Mistakes

### ❌ Don't

```javascript
// Hardcoding URLs
const API_URL = "https://myapi.com/api";
```

```csharp
// Hardcoding passwords
const conn = "mongodb://user:password@...";
```

```bash
# Committing .env files
git add .env.production
```

### ✅ Do

```javascript
// Using environment variables
const API_URL = import.meta.env.VITE_API_URL;
```

```csharp
// Reading from configuration
var conn = configuration.GetConnectionString("MongoDB");
```

```bash
# Ignoring .env files
echo ".env.production" >> .gitignore
```

## Quick Configuration Commands

```bash
# View all environment variables
node -e "console.log(process.env)"

# Test MongoDB connection
mongo "mongodb://localhost:27017"

# Build frontend
npm run build

# Build backend
dotnet build -c Release

# Start in production mode
ASPNETCORE_ENVIRONMENT=Production dotnet run
```

## Reference Links

- [Vite Configuration](https://vitejs.dev/config/)
- [ASP.NET Core Configuration](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/configuration)
- [Environment Variables](https://nodejs.org/en/knowledge/file-system/how-to-use-the-http-module/)
- [MongoDB Connection String](https://docs.mongodb.com/manual/reference/connection-string/)

---

**Questions about configuration?** Check the specific framework documentation or reach out for support.
