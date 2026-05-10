# Frontend Architecture & Design

## 📐 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    RETAIL DATA WAREHOUSE                     │
└─────────────────────────────────────────────────────────────┘
                              ↓
        ┌─────────────────────────────────────────┐
        │        FRONTEND (React Vite)            │
        │  - User Interface                       │
        │  - File Upload                          │
        │  - Data Visualization                   │
        │  - Dashboard                            │
        └──────────────────┬──────────────────────┘
                           ↓
        ┌─────────────────────────────────────────┐
        │     API CLIENT (Axios)                  │
        │  - HTTP Communication                   │
        │  - Error Handling                       │
        │  - Request/Response Interception        │
        └──────────────────┬──────────────────────┘
                           ↓
        ┌─────────────────────────────────────────┐
        │    BACKEND (FastAPI)                    │
        │  - File Processing                      │
        │  - ML Integration                       │
        │  - Data Validation                      │
        │  - BigQuery Connection                  │
        └──────────────────┬──────────────────────┘
                           ↓
        ┌─────────────────────────────────────────┐
        │   ML PIPELINE                           │
        │  - Column Mapping                       │
        │  - Data Cleansing                       │
        │  - Schema Validation                    │
        └──────────────────┬──────────────────────┘
                           ↓
        ┌─────────────────────────────────────────┐
        │     DATA WAREHOUSE                      │
        │  - Google BigQuery                      │
        │  - Integrated Retail Data               │
        └─────────────────────────────────────────┘
```

## 🎯 Data Flow

### 1. File Upload Flow
```
User Upload File
    ↓
FileUpload Component
    ↓
File Validation (CSV, size)
    ↓
FormData Creation
    ↓
uploadFile() API Call
    ↓
Progress Update
    ↓
Success → DataPreview Component
    ↓
Show Mapping & Preview Data
```

### 2. Dashboard Data Flow
```
Dashboard Component
    ↓
useEffect Hook
    ↓
fetchDashboardData() API Call
    ↓
Loading State
    ↓
Render Statistics Cards
    ↓
Render Data Table
    ↓
Error Handling
```

### 3. Complete Processing Pipeline
```
CSV File (User)
    ↓
Frontend Upload
    ↓
Backend: Load & Parse CSV
    ↓
ML: Column Mapping
    ↓
ML: Data Cleansing
    ↓
Validation
    ↓
BigQuery Insert
    ↓
Frontend: Show Success
    ↓
Dashboard Refresh
```

## 🏢 Component Hierarchy

```
App (Main Component)
├── Header
│   ├── Logo
│   └── Status Badge
├── Alert Container
│   └── Alert (Conditional)
├── Content Wrapper
│   ├── Tabs Navigation
│   │   ├── Upload Tab
│   │   ├── Preview Tab
│   │   └── Dashboard Tab
│   └── Tab Content
│       ├── FileUpload Component
│       │   └── File Input
│       ├── DataPreview Component
│       │   ├── Mapping Result
│       │   └── Data Table
│       └── Dashboard Component
│           ├── Statistics Cards
│           └── Data Table
└── Footer
    └── Links & Info
```

## 🔌 Component Responsibilities

### Header Component
- Display aplikasi title
- Show system status
- Responsive design

### FileUpload Component
- Drag & drop file input
- File validation
- Upload progress
- Error handling
- Info display

### DataPreview Component
- Display mapping result
- Show preview data in table
- File name & success badge
- Null value handling

### Dashboard Component
- Fetch data dari BigQuery
- Display statistics
- Render data table
- Auto-refresh capability
- Error state handling

### Alert Component
- Display notifications
- Auto-dismiss
- Multiple types (success/error/warning/info)
- Manual close option

## 📦 Module Dependencies

### Direct Dependencies
- **react@18.2.0**: UI library
- **react-dom@18.2.0**: DOM rendering
- **axios@1.6.0**: HTTP client
- **recharts@2.10.0**: Charts (future use)

### Dev Dependencies
- **vite@5.0.0**: Build tool
- **@vitejs/plugin-react@4.0.0**: React plugin
- **@types/react@18.2.0**: Type definitions
- **@types/react-dom@18.2.0**: Type definitions

## 🎨 Design System

### Color Palette
```css
Primary Blue: #667eea
Primary Dark: #764ba2
Success Green: #22c55e
Error Red: #ef4444
Warning Orange: #f97316
Text Dark: #333
Border Light: #e9ecef
Background: #fafbfc
```

### Typography
```
Header 1: 28px, bold, font-family: system-ui
Header 2: 20px, 600
Header 3: 18px, 600
Header 4: 14px, 600
Body Text: 14px, 400
Small Text: 12px, 400
```

### Spacing Scale
```
xs: 4px
sm: 8px
md: 16px
lg: 24px
xl: 32px
xxl: 48px
```

### Border Radius
```
sm: 4px
md: 8px
lg: 12px
xl: 24px
```

## 🔄 State Management

Currently using **React Component State** (useState + useEffect)

### App Level States
```javascript
- uploadResult: Upload success data
- alert: Current alert notification
- refreshTrigger: Dashboard refresh trigger
- activeTab: Current active tab
```

### Component Level States
```javascript
FileUpload:
  - isLoading: Upload progress
  - uploadProgress: Progress percentage

Dashboard:
  - dashboardData: Data from API
  - isLoading: Loading state
  - error: Error message
  - totalRecords: Total count
```

## 🚀 Performance Considerations

### Optimization Strategies
1. **Code Splitting**: Lazy load components if bundle grows
2. **Memoization**: Use React.memo for expensive components
3. **Image Optimization**: Convert to WebP format
4. **CSS-in-JS**: Consider if styling gets complex
5. **Request Debouncing**: Prevent rapid API calls

### Bundle Size
- Current size: ~150KB (gzipped)
- Goal: Keep under 300KB

## 🔐 Security Considerations

### Frontend Security
1. **XSS Prevention**: React auto-escapes JSX content
2. **CSRF Protection**: Backend handles CSRF tokens
3. **File Upload Validation**: Check type & size
4. **API Error Handling**: Don't expose sensitive data

### API Security
- No sensitive data in localStorage
- Use HTTPS in production
- Validate all user inputs
- Rate limiting on backend

## 🧪 Testing Strategy

### Unit Tests
- Component rendering
- Event handlers
- State updates

### Integration Tests
- API integration
- Component communication
- File upload flow

### E2E Tests
- Complete user workflows
- Dashboard functionality
- Error scenarios

## 📱 Responsive Design

### Breakpoints
```css
Mobile: < 768px
Tablet: 768px - 1024px
Desktop: > 1024px
```

### Components Adaptations
- Header: Stacked layout on mobile
- Tabs: Scroll horizontal on mobile
- Tables: Horizontal scroll on mobile
- Cards: Single column on mobile

## 🔍 Error Handling

### API Errors
```javascript
Try-catch blocks with:
- Specific error messages
- User-friendly notifications
- Retry mechanisms
- Logging for debugging
```

### User Input Validation
```javascript
FileUpload:
- Check file extension (.csv)
- Validate file size (< 10MB)
- Check MIME type
```

## 📊 Monitoring & Analytics

### Logging Points
- File upload events
- API success/failure
- Component errors
- Performance metrics

### Future Monitoring
- Google Analytics integration
- Error tracking (Sentry)
- Performance monitoring

## 🚀 Deployment Considerations

### Build Output
- `dist/` folder for static files
- index.html as entry point
- Assets bundled automatically

### Environment-Specific Config
- Development: http://localhost:8000
- Staging: staging-api.example.com
- Production: api.example.com

### Optimization for Production
- Minification (automatic with Vite)
- Tree-shaking (remove unused code)
- Source maps (optional)
- Asset optimization

## 📚 Future Enhancements

### Phase 2
- [ ] Advanced filtering & search
- [ ] Data export functionality
- [ ] Chart visualizations
- [ ] Multi-file batch upload

### Phase 3
- [ ] User authentication
- [ ] Role-based access control
- [ ] Data history & audit logs
- [ ] Real-time notifications

### Phase 4
- [ ] Mobile app (React Native)
- [ ] Advanced analytics
- [ ] Machine learning model dashboard
- [ ] API documentation UI
