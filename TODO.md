# SAR Trends AI Platform Upgrade TODO

## Current Progress
- [x] Analyzed codebase and created detailed upgrade plan
- [x] Backend file generation system
- [x] PDF/DOCX download functionality
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
- [x] Update generator pages (cover-letter/page.js etc.): Add download buttons
- [x] Update app/api/ai/route.js: Handle file responses

**Download fixes complete. Merge PR #6 for production.**

Next: Template system and advanced editor.
