# Quick Start Guide - Running Frontend & Backend

## 🚀 Start Frontend + Backend

### Step 1: Terminal 1 - Start Backend FastAPI

```bash
# Navigate ke Back_end folder
cd Back_end

# Pastikan Python venv sudah aktif
.\.venv\Scripts\activate

# Run Backend
python main.py

# Atau
uvicorn main:app --reload

# Output harus menunjukkan:
# INFO:     Uvicorn running on http://127.0.0.1:8000
```

### Step 2: Terminal 2 - Start Frontend React

```bash
# Navigate ke Front_end folder
cd Front_end

# Install dependencies (hanya sekali)
npm install

# Start dev server
npm run dev

# Output harus menunjukkan:
# ➜  Local:   http://localhost:5173/
# ➜  press h to show help
```

---

## ✅ Verify Setup

### Backend Status
```
✅ Backend running di: http://localhost:8000
✅ API docs di: http://localhost:8000/docs (Swagger UI)
✅ Health check: GET http://localhost:8000/api/data
```

### Frontend Status
```
✅ Frontend running di: http://localhost:5173
✅ Auto-open di browser
✅ Auto-reload saat file berubah
```

---

## 📝 Common Issues & Solutions

### Issue: "Network Error - Backend tidak terhubung"

**Cause**: Backend FastAPI tidak running atau pada port yang berbeda

**Solution**:
1. Pastikan Backend running di Terminal 1
2. Check status: https://apiretail.ramidzelab.my.id/docs di browser
3. Jika ingin override backend, update `.env`:
   ```
   VITE_API_BASE_URL=https://apiretail.ramidzelab.my.id/api
   ```

### Issue: "Port 8000 already in use"

**Solution**:
```bash
# Find process using port 8000
netstat -ano | findstr :8000

# Kill process (Windows)
taskkill /PID <PID> /F

# Or start Backend di port berbeda
uvicorn main:app --port 8001 --reload
# Then update .env: VITE_API_BASE_URL=http://localhost:8001/api
```

### Issue: "Port 5173 already in use"

**Solution**: Frontend akan auto-use 5174, atau:
```bash
npm run dev -- --port 3000
```

### Issue: "Module not found" di Backend

**Solution**:
```bash
# Make sure di Back_end folder & venv activated
cd Back_end
.\.venv\Scripts\activate

# Check dependencies installed
pip list | grep fastapi
pip install fastapi uvicorn pandas numpy
```

---

## 🧪 Test Upload

1. **Frontend**: http://localhost:5173
2. **Tab**: "Upload File"
3. **Sample CSV**: `Machine_Learning/sample_data/cabang_bogor.csv`
4. **Upload**: Drag & drop ke area, atau klik untuk browse
5. **Expected**: Success message ✅

---

## 📊 Upload CSV Sample Data

### Sample Files Available
```
Machine_Learning/sample_data/
├── cabang_bogor.csv
├── cabang_cilegon.csv
├── cabang_jakarta.csv
├── cabang_serang.csv
└── cabang_tangerang.csv
```

### Sample CSV Format
```
kd_brg,nm_brg,hrg_jual,jml_stk,diskon
BGR-01,Mie Instan Kari,3000,150.0,0.0
BGR-02,Susu Kental Manis,Rp. 12.000,40.0,1000.0
BGR-03,Tepung Terigu 1kg,10500,80.0,0.0
```

---

## 🔧 Troubleshooting Checklist

- [ ] Backend running di http://localhost:8000
- [ ] Frontend running di http://localhost:5173
- [ ] Both terminals active & showing logs
- [ ] No port conflicts
- [ ] .env file exists di Front_end folder
- [ ] Sample CSV ready untuk test
- [ ] Browser tidak ada error di Console (F12)

---

## 📚 Key Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/upload` | Upload & process CSV |
| GET | `/api/data` | Fetch dashboard data |
| GET | `/docs` | Swagger UI (Backend only) |

---

## 💡 Pro Tips

1. **Watch Logs**: Keep both terminals visible untuk see errors
2. **Use Swagger**: Open http://localhost:8000/docs untuk test API
3. **Check Network**: F12 → Network tab untuk see API calls
4. **Console Logs**: F12 → Console untuk see frontend logs
5. **Hot Reload**: Code changes auto-reload di Frontend

---

## ✨ Success Indicators

**Backend Logs**:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete
```

**Frontend Logs**:
```
➜  Local:   http://localhost:5173/
✓ ready in 2.2s
```

**Upload Success**:
- ✅ Progress bar reaches 100%
- ✅ "Memproses file dengan ML..." message
- ✅ Auto-redirect to Preview tab
- ✅ Data preview displayed
- ✅ Auto-redirect to Dashboard
- ✅ Data visible in table

---

## 🎯 Next Steps

1. Start Backend
2. Start Frontend  
3. Upload sample CSV file
4. See preview & dashboard
5. Check BigQuery (if configured)

**Happy testing!** 🚀
