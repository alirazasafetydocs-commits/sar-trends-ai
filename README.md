# SAR Trends AI - Production Ready AI SaaS Platform

## Overview

SAR Trends AI is a comprehensive AI SaaS platform providing multiple AI productivity tools:
- Resume Builder
- Cover Letter Generator  
- Website Builder
- HSE Documentation Generator
- Risk Assessment Generator
- ATS Resume Optimizer

## Technology Stack

### Frontend
- Next.js 14 + React 18
- Tailwind CSS
- Three.js for 3D elements
- Framer Motion for animations

### Backend
- Node.js + Express
- MongoDB (mongoose ODM)
- JWT Authentication

### AI Integration
- OpenAI GPT-4o mini (Primary)
- Groq AI (Fallback #1)
- Together AI (Fallback #2)

## Features

### Core Features
- ✅ JWT Authentication
- ✅ Subscription-based usage limits (Free/Pro/Business)
- ✅ AI document generation with fallback
- ✅ File upload system
- ✅ Manual payment verification (Easypaisa/Meezan Bank)
- ✅ Rate limiting
- ✅ Usage tracking

### AI Tools
- ✅ Resume Builder (ATS-optimized)
- ✅ Cover Letter Generator
- ✅ Website Builder
- ✅ HSE Documentation Generator
- ✅ Risk Assessment Generator
- ✅ Method Statement Generator
- ✅ Job Safety Analysis (JSA)
- ✅ Incident Report Generator
- ✅ Fire Risk Assessment
- ✅ Toolbox Talk Generator

## Installation

### Backend
```bash
cd sartrends-ai
npm install
```

### Frontend (Next.js)
```bash
cd sartrends-store-site
npm install
```

## Environment Variables

Create a `.env` file in the `sartrends-ai` directory:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/sartrends-ai

# JWT
JWT_SECRET=your-secret-key

# AI Providers
OPENAI_API_KEY=your-openai-key
GROQ_API_KEY=your-groq-key
TOGETHER_API_KEY=your-together-key

# Payment
EASYPAISA_MERCHANT_ID=your-merchant-id
MEEZAN_ACCOUNT_NUMBER=your-account
```

## Running the Application

### Start Backend
```bash
cd sartrends-ai
npm start
```

### Start Frontend
```bash
cd sartrends-store-site
npm run dev
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/verify` - Verify token

### AI Generation
- POST `/api/ai/resume` - Generate resume
- POST `/api/ai/cover-letter` - Generate cover letter
- POST `/api/ai/hse` - Generate HSE document
- POST `/api/ai/website` - Generate website

### Payments
- GET `/api/payments/config` - Get payment configuration
- POST `/api/payments/submit` - Submit payment
- GET `/api/payments/my-payments` - Get user payments
- PUT `/api/payments/verify/:id` - Verify payment (admin)

### Media
- GET `/api/media` - List media files
- POST `/api/upload-image` - Upload image
- POST `/api/upload-video` - Upload video
- DELETE `/api/delete-media/:id` - Delete media

## Subscription Plans

| Plan | Daily Limit | Price |
|------|-------------|-------|
| Free | 3 | Free |
| Pro | 100 | Rs. 1,500/month |
| Business | Unlimited | Rs. 3,000/month |

## Project Structure

```
sar-trends-ai/
├── sartrends-ai/          # Backend
│   ├── config/            # Configuration files
│   ├── middleware/        # Express middleware
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   └── server.js         # Express server
│
├── sartrends-store-site/  # Frontend (Next.js)
│   ├── app/              # Next.js app router
│   ├── components/       # React components
│   └── lib/              # Utilities
│
└── mobile-app/           # Mobile app (Expo)
```

## License

MIT License

