# Retail Data Warehouse - Frontend

Frontend React untuk Retail Data Warehouse yang terintegrasi dengan Machine Learning pipeline dan Backend FastAPI.

## 🎯 Fitur Utama

- **📤 File Upload**: Upload file CSV dengan validasi format dan ukuran
- **🔄 ML Mapping**: Otomatis memetakan kolom CSV ke standar BigQuery menggunakan ML
- **📊 Data Preview**: Lihat hasil mapping dan preview data sebelum disimpan
- **📈 Dashboard**: Tampilan dashboard dengan statistik dan data terbaru dari BigQuery
- **🎨 Modern UI**: Interface yang user-friendly dengan gradient design

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ dan npm/yarn
- Backend FastAPI running di `http://localhost:8000`

### Installation

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Start development server
npm run dev
```

Aplikasi akan membuka di `http://localhost:5173`

## 📁 Project Structure

```
Front_end/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── components/         # React components
│   │   ├── Header.jsx      # Header component
│   │   ├── FileUpload.jsx  # File upload component
│   │   ├── DataPreview.jsx # Data preview component
│   │   ├── Dashboard.jsx   # Dashboard component
│   │   ├── Alert.jsx       # Alert/notification component
│   │   └── *.css          # Component styles
│   ├── services/
│   │   └── apiClient.js    # API client configuration
│   ├── App.jsx             # Main app component
│   ├── App.css             # App styles
│   ├── main.jsx            # App entry point
│   └── index.css           # Global styles
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore rules
├── package.json            # Project metadata
├── vite.config.js          # Vite configuration
└── index.html              # HTML root file
```

## 🔧 Environment Variables

Buat file `.env` berdasarkan `.env.example`:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8000/api
VITE_API_TIMEOUT=30000

# Application Configuration
VITE_APP_TITLE=Retail Data Warehouse
VITE_APP_VERSION=0.1.0
```

## 🎨 Component Overview

### Header
- Judul aplikasi
- Status badge sistem

### FileUpload
- Drag & drop upload
- Validasi file (CSV, max 10MB)
- Progress indicator
- Info tentang format file

### DataPreview
- Menampilkan hasil mapping kolom
- Preview data dengan table
- Info keberhasilan proses

### Dashboard
- Statistik data (total records, sources, etc)
- Tabel data terbaru dari BigQuery
- Refresh button
- Error handling

### Alert
- Notifikasi success/error/warning/info
- Auto-dismiss setelah 5 detik
- Manual close button

## 🔌 API Integration

Frontend menggunakan axios untuk API calls ke Backend FastAPI.

### Available Endpoints

#### Upload File
```
POST /api/upload
Content-Type: multipart/form-data

Body: { file: File }

Response: {
  status: "success",
  message: "...",
  metadata: { ... },
  mapping_result: { ... },
  preview_data: [ ... ]
}
```

#### Fetch Dashboard Data
```
GET /api/data

Response: {
  status: "success",
  total_records: 100,
  data: [ ... ]
}
```

## 🛠️ Development

### Build
```bash
npm run build
```

Output akan di folder `dist/`

### Preview Build
```bash
npm run preview
```

### Hot Module Replacement (HMR)
Development server sudah otomatis reload saat file berubah.

## 📦 Dependencies

- **React 18.2**: UI framework
- **Axios 1.6**: HTTP client
- **Recharts 2.10**: Charts & graphs (untuk future features)
- **Vite 5.0**: Build tool & dev server

## 🎯 Workflow

1. **Upload**: Pilih file CSV atau drag & drop ke upload area
2. **Process**: Backend ML akan memetakan kolom secara otomatis
3. **Preview**: Lihat hasil mapping dan preview data
4. **Store**: Data otomatis tersimpan ke BigQuery
5. **Dashboard**: Lihat semua data di dashboard

## 📝 Catatan Untuk Developers

- Semua API calls di-handle oleh `services/apiClient.js`
- Setiap komponen memiliki file CSS terpisah untuk mudah di-maintain
- Alert/Notification menggunakan global state di App.jsx
- Dashboard auto-refresh saat ada upload file sukses

## 🚨 Troubleshooting

### API Connection Error
- Pastikan Backend FastAPI running di `http://localhost:8000`
- Check VITE_API_BASE_URL di .env

### File Upload Failed
- Pastikan file format CSV
- Ukuran file < 10MB
- Check Browser console untuk error detail

### Dashboard Data Not Loading
- Refresh halaman (Ctrl+R)
- Check Backend logs
- Pastikan BigQuery connection aktif di Backend

## 📄 License

Part of Retail Data Warehouse Project
