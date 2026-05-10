# Development Guide - Frontend React

## 📚 Panduan Lengkap untuk Developers

### 1. Setup Environment

#### 1.1 Install Node.js
- Download dari https://nodejs.org/ (LTS version)
- Verify: `node --version` dan `npm --version`

#### 1.2 Setup Project
```bash
# Navigate ke folder Front_end
cd Front_end

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

#### 1.3 Start Development
```bash
npm run dev
```

## 🏗️ Architecture Overview

```
Frontend (React)
    ↓
Axios API Client
    ↓
Backend FastAPI (http://localhost:8000)
    ↓
Machine Learning Pipeline
    ↓
BigQuery Data Warehouse
```

## 🧩 Component Development

### Adding New Component

```jsx
import React, { useState, useEffect } from 'react'
import './MyComponent.css'

const MyComponent = ({ prop1, prop2, onEvent }) => {
  const [state, setState] = useState(null)

  useEffect(() => {
    // Initialize component
  }, [])

  return (
    <div className="my-component">
      {/* JSX content */}
    </div>
  )
}

export default MyComponent
```

### CSS Organization

- Satu file CSS per komponen
- Gunakan BEM naming convention (`.block__element--modifier`)
- Mobile-first responsive design
- Color palette:
  - Primary: `#667eea` dan `#764ba2` (gradient)
  - Success: `#22c55e`
  - Error: `#ef4444`
  - Warning: `#f97316`

## 🔌 API Client Usage

### Basic Example
```jsx
import { uploadFile, fetchDashboardData } from '../services/apiClient'

// Upload file
try {
  const result = await uploadFile(file)
  console.log(result)
} catch (error) {
  console.error(error.message)
}

// Fetch data
try {
  const data = await fetchDashboardData()
  console.log(data)
} catch (error) {
  console.error(error.message)
}
```

### Adding New API Method

Edit `src/services/apiClient.js`:

```javascript
/**
 * Description tentang endpoint ini
 * @param {Object} params - Parameter query
 * @returns {Promise} Response data
 */
export const myNewFunction = async (params = {}) => {
  return apiClient.get('/endpoint', { params })
}
```

## 🎯 State Management

Saat ini menggunakan **Component State** (useState + useEffect).

Jika perlu global state nanti, dapat upgrade ke:
- **Redux** untuk complex state
- **Zustand** untuk simple state
- **Context API** untuk medium state

## 📊 Styling Guidelines

### Utility Classes (Sudah Tersedia)
```css
.gap-1, .gap-2, .gap-3, .gap-4
.mt-1, .mt-2, .mt-3, .mt-4
.mb-1, .mb-2, .mb-3, .mb-4
.p-1, .p-2, .p-3, .p-4
```

### Color Variables
```css
--primary: #667eea
--primary-dark: #764ba2
--success: #22c55e
--error: #ef4444
--warning: #f97316
--text: #333
--border: #e9ecef
```

## 🔄 Data Flow

### Upload Flow
```
FileUpload Component
  ↓
handleFileSelect() triggered
  ↓
uploadFile() API call
  ↓
Progress update & loading state
  ↓
Success → onUploadSuccess() callback
  ↓
Update App state & show alert
  ↓
Redirect to preview tab
  ↓
After 2s → Redirect to dashboard
```

## 🧪 Testing

Tambahkan test file dengan naming: `ComponentName.test.jsx`

Contoh structure:
```javascript
import { render, screen } from '@testing-library/react'
import MyComponent from './MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('test')).toBeInTheDocument()
  })
})
```

## 📦 Build & Deploy

### Development Build
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

Output: `dist/` folder

### Preview Production Build
```bash
npm run preview
```

## 🐛 Debugging

### Browser DevTools
- React DevTools extension (Chrome/Firefox)
- Network tab untuk inspect API calls
- Console tab untuk errors

### Debug API Calls
```javascript
// Di apiClient.js ada interceptors
// Console akan log semua request/response
```

### Debug Component State
```jsx
import { useEffect } from 'react'

useEffect(() => {
  console.log('State updated:', state)
}, [state])
```

## 📝 Code Style

### ESLint Config (Recommended)
```javascript
// .eslintrc.json
{
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 2021,
    "sourceType": "module",
    "ecmaFeatures": { "jsx": true }
  }
}
```

### Prettier Config (Optional)
```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "es5",
  "tabWidth": 2
}
```

## 🚀 Performance Tips

1. **Code Splitting**: Lazy load components
   ```jsx
   const LazyComponent = React.lazy(() => import('./LazyComponent'))
   ```

2. **Memoization**: Prevent unnecessary re-renders
   ```jsx
   const MyComponent = React.memo(({ prop }) => { ... })
   ```

3. **Image Optimization**: Use WebP format

4. **Bundle Analysis**: Check bundle size
   ```bash
   npm run build -- --analyze
   ```

## 📚 Resources

- React Docs: https://react.dev
- Vite Guide: https://vitejs.dev
- Axios Docs: https://axios-http.com
- MDN Web Docs: https://developer.mozilla.org

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/nama-fitur`
2. Commit changes: `git commit -m "feat: deskripsi"`
3. Push: `git push origin feature/nama-fitur`
4. Create Pull Request

## ❓ FAQ

**Q: Bagaimana update dependencies?**
A: `npm update` atau `npm install package@latest`

**Q: Bagaimana fix CORS error?**
A: Pastikan Backend punya CORS headers, atau set proxy di vite.config.js

**Q: Bagaimana handle API timeout?**
A: Modify VITE_API_TIMEOUT di .env

## 📞 Support

Untuk pertanyaan atau issue, buka GitHub issue atau contact team lead.
