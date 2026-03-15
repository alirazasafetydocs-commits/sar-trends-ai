const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const { Document, Packer, Paragraph, TextRun } = require('docx');
const sharp = require('sharp');
const puppeteer = require('puppeteer');

const UPLOAD_DIR = path.join(__dirname, '../uploads');
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

module.exports = {
  async generatePDF(content, filename = 'document.pdf') {
    return new Promise((resolve, reject) => {
      const filePath = path.join(UPLOAD_DIR, filename);
      const doc = new PDFDocument();
      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);
      doc.fontSize(12).text(content, { align: 'left' });
      doc.end();
      stream.on('finish', () => resolve(`/uploads/${filename}`));
      stream.on('error', reject);
    });
  },

  async generateDOCX(content, filename = 'document.docx') {
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            children: [new TextRun(content)]
          })
        ]
      }]
    });
    const buffer = await Packer.toBuffer(doc);
    const filePath = path.join(UPLOAD_DIR, filename);
    fs.writeFileSync(filePath, buffer);
    return `/uploads/${filename}`;
  },

  generateTXT(content, filename = 'document.txt') {
    const filePath = path.join(UPLOAD_DIR, filename);
    fs.writeFileSync(filePath, content);
    return `/uploads/${filename}`;
  },

  async generatePNG(prompt, filename = 'image.png') {
    // Stub - use OpenAI DALL-E in future
    const filePath = path.join(UPLOAD_DIR, filename);
    // Placeholder image
    await sharp({ 
      create: {
        width: 512, 
        height: 512, 
        channels: 4, 
        background: { r: 73, g: 80, b: 87, alpha: 1 }
      }
    }).png().toFile(filePath);
    return `/uploads/${filename}`;
  },
  },

  async generateMP4(prompt, filename = 'video.mp4') {
    // Stub - FFmpeg in future
    const filePath = path.join(UPLOAD_DIR, filename);
    fs.writeFileSync(filePath, 'Placeholder MP4 - FFmpeg integration needed');
    return `/uploads/${filename}`;
  },

  async htmlToPDF(htmlContent, filename = 'page.pdf') {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    const filePath = path.join(UPLOAD_DIR, filename);
    await page.pdf({ path: filePath, format: 'A4' });
    await browser.close();
    return `/uploads/${filename}`;
  }
};
