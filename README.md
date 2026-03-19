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
- [License](#license)
- [Support & Troubleshooting](#support--troubleshooting)
- [Learning Resources](#learning-resources)
- [Roadmap](#roadmap)

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

#### Core Features
- ✅ Responsive design (Mobile, Tablet, Desktop)
- ✅ Dark mode toggle with localStorage persistence
- ✅ Smooth scroll animations with Framer Motion
- ✅ Advanced form validation with React Hook Form
- ✅ Loading states and error handling
- ✅ Mobile-first CSS approach
- ✅ SEO-friendly structure
- ✅ Accessibility features

#### Navigation & Routing
- ✅ Universal navigation from any page (home or detail pages)
- ✅ Smart header navigation with useLocation hook
- ✅ Hash-based scrolling on home page sections
- ✅ Smooth scroll animations to sections
- ✅ Back buttons on detail pages with proper routing
- ✅ Contact buttons navigate consistently across all pages

#### Homepage Sections
1. **Hero Section** - Attractive banner with call-to-action
2. **About Us** - Gym description with key highlights
3. **Services** - 4 service cards with icons and descriptions
4. **Trainers** - Featured trainer profiles with overlay effects
5. **Membership Plans** - 3 pricing tiers (Basic/Pro/Premium)
6. **Contact Form** - Validated form with success/error messages
7. **Footer** - Links and social media connections

#### Detail Pages & Booking System
- ✅ **Service Detail Pages** (`/service/:id`)
  - Detailed service information with features, benefits, pricing
  - Trainer assignments for each service
  - Equipment list
  - "Book Now" and "Contact Us" buttons with proper navigation

- ✅ **Trainer Detail Pages** (`/trainer/:id`)
  - Individual trainer profiles with bio
  - Certifications and specialties
  - Achievements section
  - "Book Session" and "Send Message" buttons
  - Profile images with overlay effects

- ✅ **Booking System** (`/booking`)
  - Multi-field booking form with validation
  - Trainer selection dropdown
  - Date picker with **past date prevention** ⭐
  - Time slot selection
  - Session duration options (30/45/60 minutes)
  - Fitness goal and experience level inputs
  - Success/error feedback modals with animations
  - All required fields must be filled before submission ⭐

- ✅ **Membership Pages**
  - **/membership/:planName** - Membership detail with comparison table
  - **/membership/checkout/:planName** - Professional multi-step payment checkout ⭐
  - **/membership/confirmation/:planName** - Success page with booking details

#### Professional Payment Checkout ⭐ NEW
- ✅ **5-Step Payment Flow**
  1. Billing Information (personal & address details)
  2. Payment Method (card with auto-detection)
  3. Review Order (verify before payment)
  4. Processing (secure transaction)
  5. Success confirmation

- ✅ **Advanced Card Validation**
  - Luhn algorithm for card number validation
  - Auto-detect Visa/Mastercard/Amex/Discover
  - Smart auto-formatting (1234 5678 9012 3456)
  - Expiry date validation preventing past dates
  - CVV validation (3 or 4 digits based on card type)
  - Card type badge display

- ✅ **Billing & Tax Features**
  - Automatic 8% tax calculation
  - Subtotal + tax breakdown
  - Complete order summary in sidebar
  - Currency formatting

- ✅ **Professional UX**
  - Visual progress indicator (Step 1/2/3)
  - Animated step transitions
  - Sticky order summary (desktop)
  - Real-time field validation
  - Error clearing as user types
  - Loading spinner during processing
  - Order ID generation
  - Success page with confirmation details

- ✅ **Security Features**
  - SSL encryption indicators
  - Card number masking in display
  - Terms & conditions agreement required
  - Auto-renewal policy acceptance required
  - Front-end + backend validation

#### Form Validation Features ⭐ NEW
- ✅ **Pre-Submission Validation**
  - All required fields must be filled
  - Field-specific error messages
  - Real-time error clearing
  - Visual error indicators

- ✅ **Date Validation**
  - Booking dates: Past dates disabled
  - Credit card expiry: Past dates rejected
  - Prevents users from selecting invalid dates

- ✅ **Payment Step Validation**
  - Card number validation with Luhn algorithm
  - Expiry format and date check
  - CVV length validation
  - Name and address validation

### Backend API
- ✅ RESTful API endpoints
- ✅ Input validation
- ✅ Error handling
- ✅ CORS enabled
- ✅ Dependency injection
- ✅ Logging
- ✅ Swagger documentation
- ✅ Contact message management
- ✅ Payment processing endpoints (ready for integration)
- ✅ Receipt generation and retrieval

## 📁 Project Structure

```
fitpulse-gym-website/
├── frontend/                          # React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx            # Navigation with universal routing
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Services.jsx          # Service cards
│   │   │   ├── ServiceDetail.jsx     # Service detail page
│   │   │   ├── Trainers.jsx          # Trainer list
│   │   │   ├── TrainerDetail.jsx     # Trainer detail page
│   │   │   ├── Membership.jsx        # Membership plans
│   │   │   ├── MembershipDetail.jsx  # Plan details page
│   │   │   ├── MembershipCheckout.jsx # Multi-step payment checkout ⭐
│   │   │   ├── MembershipConfirmation.jsx
│   │   │   ├── Booking.jsx           # Booking form with date validation ⭐
│   │   │   ├── ContactForm.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── *.css (Component styles)
│   │   ├── services/
│   │   │   └── api.js                # API integration with payment endpoints
│   │   ├── utils/
│   │   │   └── paymentUtils.js       # Payment validation utilities ⭐
│   │   │       ├── validateCardNumber(Luhn algorithm)
│   │   │       ├── getCardType()
│   │   │       ├── validateCVV()
│   │   │       ├── calculateBillingAmount()
│   │   │       └── formatCurrency()
│   │   ├── data/
│   │   │   ├── servicesData.js
│   │   │   └── trainersData.js
│   │   ├── styles/
│   │   │   └── global.css            # Global styles
│   │   ├── App.jsx                   # Main component with routing
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
├── PAYMENT-GATEWAY-DOCUMENTATION.md   # Payment integration guide ⭐
├── README.md                          # This file
├── PROJECT-SUMMARY.md
├── QUICK-START.md
├── DEVELOPMENT-GUIDE.md
└── API-EXAMPLES.rest
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

#### Contact Messages

##### Create Contact Message
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

##### Get All Contact Messages (Admin)
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

##### Get Contact Message by ID
```http
GET /contact/{id}
```

##### Update Contact Message
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

##### Delete Contact Message
```http
DELETE /contact/{id}
```

#### Payment Processing ⭐ NEW

##### Create Payment Intent
```http
POST /payments/create-intent
Content-Type: application/json

{
  "amount": 63.1,
  "planName": "Pro",
  "currency": "USD"
}
```

**Response (200 OK):**
```json
{
  "paymentIntentId": "pi_1234567890",
  "clientSecret": "pi_1234567890_secret_..."
}
```

##### Process Payment
```http
POST /payments/process
Content-Type: application/json

{
  "amount": 63.1,
  "cardholderName": "John Doe",
  "cardLast4": "4242",
  "cardType": "visa",
  "billingEmail": "john@example.com",
  "billingAddress": "123 Main St",
  "billingCity": "New York",
  "billingZipCode": "10001",
  "planId": "pro",
  "planName": "Pro"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "paymentIntentId": "pi_1234567890",
  "transactionId": "txn_1234567890",
  "message": "Payment processed successfully"
}
```

##### Validate Payment Method
```http
POST /payments/validate
Content-Type: application/json

{
  "cardholderName": "John Doe",
  "cardNumber": "4242424242424242",
  "expiryDate": "12/25",
  "cvv": "123",
  "billingEmail": "john@example.com"
}
```

**Response (200 OK):**
```json
{
  "valid": true,
  "cardType": "visa",
  "last4": "4242"
}
```

##### Confirm Payment
```http
POST /payments/confirm
Content-Type: application/json

{
  "paymentIntentId": "pi_1234567890",
  "cardholderName": "John Doe",
  "cardLast4": "4242",
  "cardType": "visa",
  "email": "john@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1 (555) 123-4567"
}
```

**Response (200 OK):**
```json
{
  "orderId": "ORD-1710740400000",
  "status": "completed",
  "message": "Payment confirmed. Confirmation email sent.",
  "confirmation_email_sent": true
}
```

##### Get Payment Receipt
```http
GET /payments/receipt/{orderId}
```

**Response (200 OK):**
```json
{
  "orderId": "ORD-1710740400000",
  "date": "2024-03-17T10:30:00Z",
  "plan": {
    "name": "Pro",
    "price": 59.0
  },
  "billing": {
    "subtotal": 59.0,
    "tax": 4.72,
    "total": 63.72
  },
  "paymentMethod": {
    "type": "visa",
    "last4": "4242",
    "expiryDate": "12/25"
  },
  "status": "completed"
}
```

### Error Responses

**400 Bad Request:**
```json
{
  "message": "Name is required"
}
```

**401 Unauthorized:**
```json
{
  "message": "Invalid payment intent or authentication required"
}
```

**404 Not Found:**
```json
{
  "message": "Contact message not found"
}
```

**422 Unprocessable Entity:**
```json
{
  "message": "Invalid card number"
}
```

**500 Internal Server Error:**
```json
{
  "message": "An error occurred while processing your request"
}
```

## 🧪 Testing

### Test API with cURL

#### Contact Messages
```bash
# Create contact message
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

#### Payment Processing
```bash
# Create payment intent
curl -X POST http://localhost:5000/api/payments/create-intent \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 63.72,
    "planName": "Pro",
    "currency": "USD"
  }'

# Validate card
curl -X POST http://localhost:5000/api/payments/validate \
  -H "Content-Type: application/json" \
  -d '{
    "cardholderName": "John Doe",
    "cardNumber": "4242424242424242",
    "expiryDate": "12/25",
    "cvv": "123",
    "billingEmail": "john@example.com"
  }'

# Get receipt
curl http://localhost:5000/api/payments/receipt/ORD-1710740400000
```

### Test Card Numbers

| Card Type | Number | Notes |
|-----------|--------|-------|
| Visa | 4242 4242 4242 4242 | Valid |
| Mastercard | 5555 5555 5555 4444 | Valid |
| American Express | 3782 822463 10005 | Valid (4-digit CVV) |
| Visa | 4000 0000 0000 0002 | Declined |

**Use any future expiry date and any 3-digit CVV (4-digit for Amex)**

### Front-End Feature Testing

#### Booking Form
- ✅ Past dates should be disabled/rejected
- ✅ Cannot submit without filling all fields
- ✅ Error messages display for each field
- ✅ Success modal shows after submission

#### Payment Checkout
- ✅ Card numbers auto-format with spaces
- ✅ Card type badge shows on input
- ✅ Expiry date auto-formats (12/25)
- ✅ CVV field changes placeholder based on card type
- ✅ Can navigate back through steps
- ✅ Review page shows masked card
- ✅ Success page displays order ID
- ✅ All required checkboxes must be accepted

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

### Recent Development Commits (Latest)

```
✨ Professional Payment Gateway Integration                          [CURRENT]
   - Multi-step payment checkout (5-step flow)
   - Card validation with Luhn algorithm
   - Card type auto-detection (Visa/MC/Amex/Discover)
   - Tax calculation (8% with full breakdown)
   - Order summary & receipt generation
   - Payment processing endpoints ready for integration
   - New: paymentUtils.js with validation functions
   - Professional UI with animations & progress indicators

🔐 Enhanced Form Validation & Date Security                          [CURRENT]
   - Past date prevention in booking system
   - Required field validation before submission
   - Field-specific error messages with clearing
   - CVV length validation based on card type
   - Expiry date past-date rejection
   - Real-time error feedback

🧭 Universal Navigation Improvements
   - Header navigation works from any page
   - Smart location detection with useLocation hook
   - Hash-based scrolling on home page
   - Proper back button navigation
   - Contact buttons navigate consistently everywhere

📄 Detail Pages & Enhanced Routing
   - Service detail pages (/service/:id)
   - Trainer detail pages (/trainer/:id)
   - Booking detail page (/booking)
   - Membership detail pages (/membership/:planName)
   - Membership checkout flow
   - Membership confirmation page
   - All pages integrate with main navigation

📋 Booking System Implementation
   - Multi-field booking form with validation
   - Trainer selection
   - Date/time selection with past-date prevention
   - Session duration options
   - Fitness goal & experience tracking
   - Success/error modals with animations

💳 Membership System Enhancement
   - Plan comparison table
   - Multi-step checkout process
   - Payment method validation
   - Order review before confirmation
   - Confirmation page with booking details

### Earlier Development Commits

```
11. Create .NET backend
    - Set up ASP.NET Core project
    - Configure MongoDB integration
    - Create API endpoints
    - Add Swagger documentation
    - CORS setup
    - Dependency injection

10. Add animations and polish
    - Implement scroll animations
    - Add smooth transitions
    - Refine responsive design
    - Optimize performance

9. Add dark mode toggle
   - Implement theme switching
   - Add CSS variables
   - Save preference to localStorage

8. Connect frontend to API
   - Configure API client with axios
   - Add axios interceptors
   - Handle form submission
   - Implement error handling

7. Implement contact form
   - Create form component with React Hook Form
   - Add validation rules
   - Implement error messages
   - Add success notification
   - Submit to MongoDB backend

6. Add membership plans
   - Create 3 pricing tiers (Basic/Pro/Premium)
   - Highlight featured plan
   - Add CTA buttons
   - Responsive layout

5. Add trainers section
   - Create trainer profile cards
   - Add image overlays
   - Responsive grid layout
   - Trainer data management

4. Add services component
   - Create 4 service cards
   - Add feature icons
   - Descriptions and details
   - Implement card animations

3. Add about section
   - Create About component
   - Add gym highlights
   - Professional styling
   - Responsive layout

2. Add hero section
   - Create Hero component
   - Add responsive styles
   - Implement animations with Framer Motion
   - Call-to-action button

1. Initial project setup
   - Create React and .NET projects
   - Install dependencies
   - Configure build tools (Vite)
   - Set up Git repository
```
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

We welcome contributions! Please follow these steps:

### Development Setup
1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/fitpulse-gym-website.git`
3. Install dependencies:
   - Backend: Open `fitpulse-gym-website.sln` in Visual Studio
   - Frontend: `cd frontend && npm install`

### Making Changes
1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Make your changes and test thoroughly:
   - Frontend: `npm run dev` for development, `npm run build` for production
   - Backend: Build and run from Visual Studio
3. Commit with clear messages: `git commit -m 'Add: Amazing feature description'`
4. Push to your branch: `git push origin feature/amazing-feature`

### Submission Guidelines
- Open a Pull Request with:
  - Clear description of changes
  - Link to related issues
  - Screenshots for UI changes
  - Test results for payment features
- Ensure no breaking changes to existing functionality
- Update documentation if applicable
- Code should follow project style guidelines

### Areas for Contribution
- **Backend**: Payment endpoint implementation, email notifications, subscription management
- **Frontend**: UI/UX improvements, component optimization, accessibility enhancements
- **DevOps**: Docker containerization, CI/CD pipeline, automated testing
- **Testing**: Unit tests, integration tests, payment flow testing
- **Documentation**: API documentation, deployment guides, troubleshooting guides

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📧 Support & Troubleshooting

### Getting Help
- **Email**: support@fitpulse.com
- **GitHub Issues**: [Open an issue](https://github.com/yourusername/fitpulse-gym-website/issues) for bugs and feature requests
- **Documentation**: Check [DEVELOPMENT-GUIDE.md](./DEVELOPMENT-GUIDE.md) and [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md)

### Common Issues

**Frontend Build Issues**
```bash
# Clear cache and reinstall dependencies
rm -r node_modules package-lock.json
npm install
npm run build
```

**Date Validation Not Working**
- Ensure browser supports HTML5 `<input type="date">`
- Check that system timezone is set correctly
- Clear browser cache if using older version

**Payment Form Validation**
- All required fields must be filled before proceeding
- Card number must pass Luhn algorithm validation
- Expiry date must be in MM/YY format and future date
- CVV must be 3-4 digits depending on card type

**Backend Connection Issues**
- Verify MongoDB Atlas connection string in `appsettings.json`
- Check CORS settings allow frontend origin
- Ensure backend API is running on correct port (typically 5000)
- Test endpoints with provided cURL examples in API documentation

**Payment Endpoint Issues**
- Validate test card numbers are correct (see Test Cards section)
- Check that payment processor (Stripe/PayPal) account is properly configured
- Review payment error codes in Error Responses section
- Ensure HTTPS is enabled for production payments

## 🎓 Learning Resources

### Frontend Stack
- [React 18 Documentation](https://react.dev) - Component-based UI development
- [React Router v6](https://reactrouter.com/) - Client-side routing
- [Vite Guide](https://vitejs.dev) - Fast build tool and development server
- [Framer Motion](https://www.framer.com/motion/) - Animation library used in project
- [CSS Modules](https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/) - Component scoped styling

### Backend Stack
- [ASP.NET Core 8 Docs](https://learn.microsoft.com/en-us/aspnet/core) - .NET framework
- [MongoDB Documentation](https://www.mongodb.com/docs/) - NoSQL database
- [MongoDB C# Driver](https://www.mongodb.com/docs/drivers/csharp/) - Database integration
- [Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/) - ORM for data access

### Payment & Security
- [Luhn Algorithm](https://en.wikipedia.org/wiki/Luhn_algorithm) - Credit card validation
- [Stripe Documentation](https://stripe.com/docs) - Payment processor (recommended)
- [PCI Compliance Guide](https://www.pcisecuritystandards.org/) - Payment card security standards
- [OWASP Security](https://owasp.org/www-project-top-ten/) - Web application security

### Development Tools
- [Visual Studio Code](https://code.visualstudio.com/) - Code editor
- [Visual Studio 2022](https://visualstudio.microsoft.com/) - IDE for .NET development
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Cloud database hosting
- [Postman](https://www.postman.com/) - API testing tool
- [Git & GitHub](https://github.com/) - Version control

### Project-Specific Guides
- [QUICK-START.md](./QUICK-START.md) - Get started in 10 minutes
- [DEVELOPMENT-GUIDE.md](./DEVELOPMENT-GUIDE.md) - Local development setup
- [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md) - Production deployment
- [MONGODB-SETUP.md](./MONGODB-SETUP.md) - Database configuration
- [API-CONFIGURATION-COMPLETE.md](./API-CONFIGURATION-COMPLETE.md) - API setup reference

## 🚀 Roadmap

### Phase 1: Backend Integration (Current)
- ✅ Frontend: Professional payment checkout UI complete
- ⏳ Backend: Implement payment processing endpoints
- ⏳ Integration: Connect Stripe/PayPal payment processor
- ⏳ Security: Implement webhook handlers for payment updates

### Phase 2: Enhanced Payment Features
- Email notifications for payment confirmations and receipts
- Payment history dashboard in user account
- Subscription management for auto-renewal billing
- Invoice generation and PDF download
- Refund processing and management

### Phase 3: User Features
- User account management system
- Profile customization
- Membership status dashboard
- Attendance tracking
- Progress tracking tools

### Phase 4: Admin Dashboard
- Gym management interface
- Member management system
- Payment analytics and reporting
- Trainer schedule management
- Service administration

### Phase 5: Mobile & Optimization
- Mobile app development
- Progressive Web App (PWA) support
- Performance optimization
- Accessibility improvements (WCAG 2.1 AA)
- Multi-language support

### Phase 6: Advanced Features
- Trainer booking system with availability
- Virtual class synchronization
- Community features and challenges
- Nutrition tracking integration
- Fitness tracker sync (Apple Health, Google Fit)

---

**Built with ❤️ for the FitPulse Gym Community**

Last Updated: December 2024
