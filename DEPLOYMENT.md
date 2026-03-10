# SAR Trends - Deployment Instructions

## Project Structure

```
sartrends-project/
├── sartrends-store-site/     # Marketing Website (Next.js)
├── sartrends-ai/
│   ├── backend/              # Backend API (Node.js + Express)
│   └── frontend/             # AI SaaS Frontend (React)
└── mobile-app/               # Android App (React Native + Expo)
```

---

## Part 1: Marketing Website (sartrends-store-site)

### Tech Stack
- Next.js 14
- React 18
- TailwindCSS
- Framer Motion

### Installation & Run

```bash
cd sartrends-store-site
npm install
npm run dev
```

The site will be available at http://localhost:3000

### Deployment to Vercel

1. Push code to GitHub
2. Go to https://vercel.com
3. Import your repository
4. Configure:
   - Framework Preset: Next.js
   - Build Command: npm run build
   - Output Directory: .next
5. Add custom domain: sartrends.store

---

## Part 2: Backend API (sartrends-ai)

### Tech Stack
- Node.js
- Express.js
- MongoDB
- JWT Authentication

### Installation

```bash
cd sartrends-ai
npm install
```

### Environment Variables (.env)

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/sartrends-ai
JWT_SECRET=your-secret-key-change-in-production
```

### Run Development Server

```bash
npm run dev
```

API will be available at http://localhost:5000

### Deployment to Render

1. Push code to GitHub
2. Go to https://render.com
3. Create new Web Service
4. Connect your GitHub repository
5. Configure:
   - Build Command: npm install
   - Start Command: npm start
6. Add environment variables in Settings
7. Create MongoDB on Atlas and add connection string

---

## Part 3: AI SaaS Frontend

### Installation

```bash
cd sartrends-ai/frontend
npm install
```

### Environment Variables

Create `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Run Development

```bash
npm start
```

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

1. Push to GitHub
2. Import to Vercel
3. Add environment variable: REACT_APP_API_URL

---

## Part 4: Mobile App (Android)

### Prerequisites
- Node.js
- Expo CLI
- Android Studio (for APK build)

### Installation

```bash
cd mobile-app
npm install
```

### Run Development

```bash
npx expo start
```

### Build APK

```bash
npx expo run:android
# OR
./build_apk.bat
```

The APK will be generated at `android/app/build/outputs/apk/debug/`

---

## Part 5: Database Setup (MongoDB Atlas)

1. Go to https://www.mongodb.com/atlas
2. Create free account
3. Create cluster (free tier)
4. Create database user
5. Get connection string
6. Add to backend .env

---

## Quick Start Script (Windows)

```batch
@echo off
echo Installing Marketing Website...
cd sartrends-store-site
call npm install

echo Installing Backend...
cd ..\sartrends-ai
call npm install

echo Installing Frontend...
cd frontend
call npm install

echo All installations complete!
echo.
echo To run:
echo 1. Marketing Site: cd sartrends-store-site && npm run dev
echo 2. Backend: cd sartrends-ai && npm run dev
echo 3. Frontend: cd sartrends-ai\frontend && npm start
pause
```

---

## Production Checklist

- [ ] Set up MongoDB Atlas
- [ ] Configure environment variables
- [ ] Set up custom domains
- [ ] Configure SSL certificates
- [ ] Set up CI/CD pipeline
- [ ] Test all features
- [ ] Build Android APK
- [ ] Set up monitoring

---

## Support

Email: info@sartrends.store
Phone: +92 345 4837460

