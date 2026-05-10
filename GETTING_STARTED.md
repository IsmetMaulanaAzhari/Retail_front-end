# Getting Started - Frontend

## 🎯 Panduan Cepat Memulai

Dokumentasi ini untuk membantu Anda mulai development Frontend Retail Data Warehouse dalam 5 menit.

## ⚡ Quick Setup (5 menit)

### 1. Prerequisites
```bash
# Check Node.js version
node --version  # Should be v16+
npm --version   # Should be v8+
```

### 2. Install & Run
```bash
# Go to Front_end folder
cd "Front_end"

# Install dependencies (2 minutes)
npm install

# Create .env file
copy .env.example .env

# Start development server (auto-open browser)
npm run dev
```

**Done!** 🎉 Frontend running di `http://localhost:5173`

## 📝 First Time Setup Checklist

- [ ] Node.js installed (v16+)
- [ ] Clone/pull repository
- [ ] Run `npm install` in Front_end folder
- [ ] Create `.env` file from `.env.example`
- [ ] Ensure Backend FastAPI running on `http://localhost:8000`
- [ ] Run `npm run dev`
- [ ] Browser opens automatically
- [ ] Can see upload file interface

## 🎮 Try It Out

1. **Upload a CSV file**: Drag & drop ke upload area
2. **See results**: Check mapping result dan preview data
3. **View dashboard**: Click dashboard tab untuk melihat data

## 📚 Learn More

Untuk documentasi lengkap, baca:
- **README.md** - Overview & feature list
- **DEVELOPER_GUIDE.md** - Development tips & API usage
- **ARCHITECTURE.md** - System design & data flow

## 🆘 Troubleshooting

### Error: "Cannot find module 'react'"
```bash
npm install
npm run dev
```

### Error: "EADDRINUSE - Port 5173 already in use"
```bash
# Port akan auto-change ke 5174, atau kill process:
# Windows: netstat -ano | findstr :5173
# Mac/Linux: lsof -i :5173
```

### Backend not connecting
- Pastikan FastAPI running: `python main.py`
- Check `.env` file VITE_API_BASE_URL
- Lihat Browser Console untuk error detail

### File upload fails
- Check file format (must be .csv)
- File size < 10MB
- Check Backend logs untuk error detail

## 📞 Bantuan

Baca dokumentasi yang ada atau tanya team lead.

---

**Ready to code?** Happy coding! 🚀
