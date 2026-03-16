# FitPulse Development Guide

A comprehensive guide for developing and extending the FitPulse gym website.

## Table of Contents

1. [Development Setup](#development-setup)
2. [Project Architecture](#project-architecture)
3. [Frontend Development](#frontend-development)
4. [Backend Development](#backend-development)
5. [Working with APIs](#working-with-apis)
6. [Styling Guidelines](#styling-guidelines)
7. [Component Best Practices](#component-best-practices)
8. [Testing](#testing)
9. [Git Workflow](#git-workflow)
10. [Common Tasks](#common-tasks)

## Development Setup

### Initial Setup

```bash
# Clone repository
git clone https://github.com/yourusername/fitpulse-gym-website.git
cd fitpulse-gym-website

# Setup frontend
cd frontend
npm install
npm run dev

# In another terminal, setup backend
cd ../backend
dotnet restore
dotnet run
```

### Environment Setup

**Frontend (.env.development):**
```env
VITE_API_URL=http://localhost:5000/api
```

**Backend (appsettings.Development.json):**
```json
{
  "ConnectionStrings": {
    "MongoDB": "mongodb://localhost:27017"
  },
  "DatabaseName": "GymDb"
}
```

## Project Architecture

### Frontend Architecture

```
React
  └── components/
      ├── Hero (Landing banner)
      ├── About (Gym information)
      ├── Services (Service cards)
      ├── Trainers (Trainer profiles)
      ├── Membership (Pricing plans)
      ├── ContactForm (Lead capture)
      ├── Header (Navigation)
      └── Footer (Links & info)
  └── services/
      └── api.js (HTTP client)
  └── App.jsx (Root component)
```

### Backend Architecture

```
ASP.NET Core
  ├── Controllers/
  │   └── ContactController (API endpoints)
  ├── Models/
  │   └── ContactMessage (Data model)
  ├── Services/
  │   └── ContactService (Business logic)
  ├── Data/
  │   └── MongoDbContext (Database context)
  └── Program.cs (Configuration)
```

## Frontend Development

### Component Structure

Each component should follow this structure:

```jsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './ComponentName.css';

export default function ComponentName() {
  const [state, setState] = useState(null);

  useEffect(() => {
    // Setup code
    return () => {
      // Cleanup code
    };
  }, []);

  return (
    <section className="component-name">
      {/* JSX content */}
    </section>
  );
}
```

### Styling Guidelines

1. **Mobile-First Approach:**
   ```css
   /* Mobile styles first */
   .component {
     padding: 20px;
   }

   /* Tablet and up */
   @media (min-width: 768px) {
     .component {
       padding: 40px;
     }
   }

   /* Desktop and up */
   @media (min-width: 1024px) {
     .component {
       padding: 60px;
     }
   }
   ```

2. **Dark Mode Support:**
   ```css
   .component {
     background: white;
     color: #333;
   }

   .dark-mode .component {
     background: #2a2a2a;
     color: #f5f5f5;
   }

   .light-mode .component {
     background: white;
     color: #333;
   }
   ```

3. **Color Variables:**
   - Primary: `#ff6b35` (Orange)
   - Dark: `#1f1f1f` (Text)
   - Light: `#ffffff` (Background)
   - Gray: `#aaa` (Secondary text)

### Adding New Components

1. **Create component file:**
   ```bash
   touch src/components/NewComponent.jsx
   touch src/components/NewComponent.css
   ```

2. **Import in App.jsx:**
   ```jsx
   import NewComponent from './components/NewComponent';
   ```

3. **Add to JSX:**
   ```jsx
   <NewComponent />
   ```

### Using Framer Motion

```jsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="element"
>
  Content
</motion.div>
```

### Form Validation

```jsx
import { useForm } from 'react-hook-form';

const { register, handleSubmit, formState: { errors } } = useForm();

<input
  {...register('fieldName', {
    required: 'Field is required',
    pattern: { value: /pattern/, message: 'Invalid' }
  })}
/>

{errors.fieldName && <span>{errors.fieldName.message}</span>}
```

## Backend Development

### Adding New Endpoints

1. **Create Model (if needed):**
   ```csharp
   public class NewModel
   {
       public string? Property { get; set; }
   }
   ```

2. **Create Service:**
   ```csharp
   public interface INewService
   {
       Task<NewModel> GetAsync(string id);
   }

   public class NewService : INewService
   {
       public async Task<NewModel> GetAsync(string id)
       {
           // Implementation
       }
   }
   ```

3. **Create Controller:**
   ```csharp
   [ApiController]
   [Route("api/[controller]")]
   public class NewController : ControllerBase
   {
       private readonly INewService _service;

       public NewController(INewService service)
       {
           _service = service;
       }

       [HttpGet("{id}")]
       public async Task<ActionResult<NewModel>> Get(string id)
       {
           var result = await _service.GetAsync(id);
           return Ok(result);
       }
   }
   ```

4. **Register in Program.cs:**
   ```csharp
   builder.Services.AddScoped<INewService, NewService>();
   ```

### Error Handling Pattern

```csharp
try
{
    var result = await _service.DoSomethingAsync();
    return Ok(result);
}
catch (ArgumentException ex)
{
    _logger.LogWarning($"Validation error: {ex.Message}");
    return BadRequest(new { message = ex.Message });
}
catch (Exception ex)
{
    _logger.LogError($"Error: {ex.Message}");
    return StatusCode(StatusCodes.Status500InternalServerError,
        new { message = "An error occurred" });
}
```

### Validation Pattern

```csharp
if (string.IsNullOrWhiteSpace(model.Property))
    throw new ArgumentException("Property is required");

if (!IsValidEmail(model.Email))
    throw new ArgumentException("Invalid email format");
```

## Working with APIs

### Making API Requests

```jsx
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' }
});

export const submitForm = async (data) => {
  try {
    const response = await api.post('/endpoint', data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
```

### Handling Loading States

```jsx
const [loading, setLoading] = useState(false);

const handleSubmit = async (data) => {
  setLoading(true);
  try {
    const result = await submitForm(data);
    // Handle success
  } catch (error) {
    // Handle error
  } finally {
    setLoading(false);
  }
};

<button disabled={loading}>
  {loading ? 'Submitting...' : 'Submit'}
</button>
```

### Testing Endpoints

```bash
# POST request
curl -X POST http://localhost:5000/api/endpoint \
  -H "Content-Type: application/json" \
  -d '{"property":"value"}'

# GET request
curl http://localhost:5000/api/endpoint/id

# PUT request
curl -X PUT http://localhost:5000/api/endpoint/id \
  -H "Content-Type: application/json" \
  -d '{"property":"new value"}'

# DELETE request
curl -X DELETE http://localhost:5000/api/endpoint/id
```

## Styling Guidelines

### CSS Organization

```css
/* 1. Base styles */
.component {
  display: flex;
  gap: 20px;
}

/* 2. States */
.component:hover {
  background: #f0f0f0;
}

.component.active {
  color: #ff6b35;
}

/* 3. Child elements */
.component > h1 {
  font-size: 2rem;
}

/* 4. Responsive */
@media (max-width: 768px) {
  .component {
    gap: 10px;
  }
}
```

### Animation Classes

```css
/* Entrance animations */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.fade-in {
  animation: slideIn 0.5s ease-out;
}
```

## Component Best Practices

### Do's ✅

- Use functional components with hooks
- Memoize expensive computations with `useMemo`
- Use `useCallback` for event handlers
- Keep components focused and single-responsibility
- Use prop validation
- Extract reusable logic into custom hooks
- Add proper error boundaries

### Don'ts ❌

- Avoid inline functions in JSX
- Don't fetch data inside render
- Avoid state in globals
- Don't skip dependency arrays in hooks
- Avoid deeply nested components
- Don't mutate state directly

### Example Component

```jsx
import { useCallback } from 'react';
import { motion } from 'framer-motion';

export default function BestPracticeComponent({ title, onClose }) {
  const handleClick = useCallback(() => {
    onClose?.();
  }, [onClose]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="component"
    >
      <h2>{title}</h2>
      <button onClick={handleClick}>Close</button>
    </motion.section>
  );
}
```

## Testing

### Frontend Testing

```bash
# Install testing libraries
npm install -D vitest @testing-library/react

# Run tests
npm run test
```

### Backend Testing

```bash
# Create test project
dotnet new xunit -n GymApi.Tests

# Run tests
dotnet test
```

### Manual Testing Checklist

- [ ] All components render without errors
- [ ] Responsive design works on mobile, tablet, desktop
- [ ] Dark mode toggle works correctly
- [ ] Contact form submission works
- [ ] Error messages display properly
- [ ] Animations are smooth
- [ ] Navigation scrolls to correct sections
- [ ] API endpoints return correct data
- [ ] CORS is configured properly

## Git Workflow

### Creating a Feature Branch

```bash
git checkout -b feature/component-name
```

### Committing Changes

```bash
# Stage changes
git add .

# Commit with descriptive message
git commit -m "Add: ComponentName component with styling"

# Push to branch
git push origin feature/component-name
```

### Creating Pull Request

1. Push to GitHub
2. Create pull request with:
   - Clear title
   - Detailed description
   - Screenshots (for UI changes)
   - Testing notes

### Merging

```bash
git checkout main
git pull origin main
git merge origin/feature/component-name
git push origin main
```

## Common Tasks

### Add New Service Card

1. Add service data to Services component
2. Update `services` array with new object
3. Add icon from lucide-react
4. Update CSS grid if needed
5. Test responsiveness

### Implement New Form Input

1. Add field to `useForm` hook
2. Add input element with validation
3. Add error message display
4. Test validation on blur/submit
5. Style with responsive design

### Change Color Scheme

1. Update CSS variables in global.css
2. Update Hero.css, Services.css, etc.
3. Test in both light and dark mode
4. Check contrast ratios for accessibility

### Add New API Endpoint

1. Create controller method
2. Add service method
3. Register service in Program.cs
4. Test with cURL or Postman
5. Update frontend API client
6. Test frontend integration

### Fix Responsive Design Issue

1. Identify breakpoint where it breaks
2. Add media query with specific styles
3. Test on actual device if possible
4. Ensure content doesn't overflow
5. Check text is readable

## Performance Optimization

### Frontend

```javascript
// Use lazy loading for images
<img loading="lazy" src={image} alt={alt} />

// Code splitting with React.lazy
const HeavyComponent = React.lazy(() => import('./Heavy'));

// Memoize components
const MemoComponent = React.memo(Component);

// Optimize bundle
npm analyze (with plugin)
```

### Backend

```csharp
// Add response caching
[ResponseCache(Duration = 60)]
public async Task<ActionResult> Get()

// Add pagination for large datasets
public async Task<ActionResult> GetAll(int page = 1, int size = 10)

// Use asynchronous operations
await _database.SaveAsync();
```

## Debugging

### Frontend Debugging

```bash
# Chrome DevTools
# 1. Open F12
# 2. Use Console tab for logs
# 3. Use Network tab for API requests
# 4. Use React DevTools extension

# VS Code Debugger
# 1. Install Debugger for Chrome
# 2. Add breakpoints
# 3. Run with debugger
```

### Backend Debugging

```bash
# Add debug logs
_logger.LogDebug($"Processing: {id}");

# Use Visual Studio debugger
# 1. Set breakpoint
# 2. Press F5 to run
# 3. Inspect variables

# Use Swagger UI
# 1. Navigate to /swagger
# 2. Test endpoints directly
```

## Resources

- [React Documentation](https://react.dev)
- [ASP.NET Core Documentation](https://learn.microsoft.com/en-us/aspnet/core)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Framer Motion Guide](https://www.framer.com/motion/)
- [MDN Web Docs](https://developer.mozilla.org)

---

Happy coding! 🚀
