# SAR Trends AI Platform Upgrade TODO

## Current Progress
- [x] Analyzed codebase and created detailed upgrade plan
- [ ] Backend file generation system
- [ ] PDF/DOCX download functionality
- [ ] Freemium templates (5 free, 10+ premium)
- [ ] Advanced Resume Builder (drag-drop editor)
- [ ] Enhanced Dashboard (projects management)
- [ ] Website Builder (drag sections/export)
- [ ] File storage and re-download
- [ ] Full testing
- [ ] Production deployment

## Step 1: Backend File Generation (Priority 1)
- [x] Install dependencies: pdf-lib, docx, jszip
  - [x] Create services/fileGenerator.js (PDF/DOCX gen + watermark)
- [x] Update models/Document.js (add files[], templateUsed)
- [x] Update routes/ai.js (generate files on create)
- [x] Add routes/downloads/:docId/:format
- [x] Serve /uploads/ static files

## Step 2: Public Frontend Downloads
- [ ] Update generator pages (cover-letter/page.js etc.): Add download buttons
- [ ] Update app/api/ai/route.js: Handle file responses

## Step 3: Templates System
- [ ] Create sartrends-ai/templates/ (free/ premium HTML/CSS)
- [ ] routes/templates.js (filter by plan)
- [ ] UI template selector in generators

## Step 4: Advanced Resume Builder (Dashboard)
- [ ] Install react-dnd-html5-backend in frontend
- [ ] Update pages/ResumeGenerator.js: Drag sections, live preview, photo upload
- [ ] Section types: photo/name/contacts/edu/experience etc.
- [ ] Template selection (free/premium)

## Step 5: Dashboard Enhancements
- [ ] pages/Dashboard.js: Usage charts, projects list, quick downloads
- [ ] pages/Documents.js: Full project mgmt, previews, regenerate
- [ ] pages/Templates.js: Browse/select
- [ ] pages/Subscription.js: Upgrade flow

## Step 6: Website Builder
- [ ] pages/WebsiteBuilder.js: Drag hero/text/image/gallery, export HTML/ZIP

## Step 7: Testing & Polish
- [ ] Test all generators/downloads/limits/watermarks
- [ ] UI improvements (modern design)
- [ ] Error handling/stability
- [ ] Performance optimizations

## Step 8: Deployment
- [ ] Update Vercel/Production configs
- [ ] Full end-to-end testing
- [ ] Monitor production

**Next Action:** Update public frontend for downloads + test backend

Backend complete:
- AI generates PDF/DOCX/TXT files
- Free watermarks, pro clean
- /api/downloads/:id/:format (auth + sendFile)
- Static /uploads access
- Usage limits fixed

Test: `cd sartrends-ai && npm start` then POST /api/ai/resume → check files, /api/downloads/:id/pdf → download.

Next: Frontend download buttons.


