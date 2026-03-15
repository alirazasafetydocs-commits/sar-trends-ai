# SAR Trends AI Complete Fix & Deployment TODO

## Current Progress: 1/16 [🟢]

### Phase 1: Setup & Dependencies (1-3)
- [ ] 1. Install backend dependencies (pdfkit, docx, openai, sharp, puppeteer)
- [✅] 2. Create .env template with required vars (OPENAI_API_KEY placeholder)
- [ ] 3. Fix site /api/ai proxy to correct backend URL

### Phase 1: Setup & Dependencies (1-3)
- [ ] 1. Install backend dependencies (pdfkit, docx, openai, sharp, puppeteer)
- [ ] 2. Create .env template with required vars (OPENAI_API_KEY placeholder)
- [ ] 3. Fix site /api/ai proxy to correct backend URL

### Phase 2: Backend AI & Downloads (4-8)
- [ ] 4. Update routes/ai.js to use real aiProvider.js generators
- [ ] 5. Create services/fileGenerator.js (PDF/DOCX/TXT/PNG/MP4)
- [ ] 6. Create routes/downloads.js endpoints
- [ ] 7. Add static /uploads serve in server.js
- [ ] 8. Fix routes/documents.js for list/get

### Phase 3: Resume Editor & Frontend (9-12)
- [ ] 9. Create ResumeEditor component (drag-drop, live preview)
- [ ] 10. Update ResumeGenerator.js to use editor + AI fill
- [ ] 11. Add download buttons to all generator pages (site + frontend)
- [ ] 12. Update Dashboard.js with projects/downloads

### Phase 4: Testing (13-14)
- [ ] 13. Test local: Backend health, AI gen, downloads, site proxy
- [ ] 14. Run full e2e: Gen resume → edit → PDF download

### Phase 5: Deploy & Verify (15-16)
- [ ] 15. Deploy backend (Render/Vercel), update API_URLS
- [ ] 16. Deploy site update (vercel), internal frontend, live test https://sartrends.store

**Notes**: Use templates if no OPENAI_KEY. No Stripe. Test no remove features.

**Completed Steps Will Be [✅] Marked**

