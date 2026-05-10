@echo off
REM Development setup script for Frontend (Windows)

echo.
echo 🚀 Retail Data Warehouse - Frontend Setup
echo ==========================================
echo.

REM Check Node.js
echo ✓ Checking Node.js...
for /f "tokens=*" %%i in ('node -v 2^>nul') do set NODE_VERSION=%%i
if "%NODE_VERSION%"=="" (
    echo ✗ Node.js not found. Please install Node.js v16+
    exit /b 1
)
echo   Node.js version: %NODE_VERSION%

REM Check npm
echo ✓ Checking npm...
for /f "tokens=*" %%i in ('npm -v 2^>nul') do set NPM_VERSION=%%i
if "%NPM_VERSION%"=="" (
    echo ✗ npm not found
    exit /b 1
)
echo   npm version: %NPM_VERSION%

REM Install dependencies
echo.
echo 📦 Installing dependencies...
call npm install

REM Create .env if not exists
if not exist .env (
    echo.
    echo 📝 Creating .env file...
    copy .env.example .env
    echo ✓ .env file created
)

echo.
echo ✅ Setup complete!
echo.
echo To start development server, run:
echo   npm run dev
echo.
pause
