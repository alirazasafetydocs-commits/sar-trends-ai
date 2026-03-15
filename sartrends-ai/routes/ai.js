const express = require('express');
const Document = require('../models/Document');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'sartrends-secret-key-2024';

// AI Prompt Templates
const prompts = require('../ai-prompts/prompts');

// Middleware to verify token
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: 'Account is deactivated' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

const { limitUsage, recordUserUsage } = require('../middleware/usageLimiter');
const { generateDocumentFiles } = require('../services/fileGenerator');

// Generate ATS Resume
router.post('/resume', auth, limitUsage('resume'), async (req, res) => {
  try {
    const { fullName, email, phone, summary, skills, experience, education } = req.body;

    const resumeContent = generateResume({
      fullName, email, phone, summary, skills, experience, education
    });

    const title = `Resume - ${fullName}`;
    const contentStr = typeof resumeContent === 'string' ? resumeContent : JSON.stringify(resumeContent, null, 2);
    const files = await generateDocumentFiles(contentStr, title, 'resume', req.user.plan === 'free', req.user.name || req.user.email);

    const document = new Document({
      user: req.user._id,
      type: 'resume',
      title,
      content: resumeContent,
      inputData: req.body,
      files,
      templateUsed: 'basic'
    });

    await document.save();

    await recordUserUsage(req.user._id, 'resume');

    res.json({
      document,
      files: document.files
    });
  } catch (error) {
    res.status(500).json({ message: 'Error generating resume', error: error.message });
  }
});

// Generate Cover Letter
router.post('/cover-letter', auth, limitUsage('cover-letter'), async (req, res) => {
  try {
    const { position, company, manager, yourName, yourQualifications } = req.body;

    const coverLetterContent = generateCoverLetter({
      position, company, manager, yourName, yourQualifications
    });

    const title = `Cover Letter - ${position} at ${company}`;
    const contentStr = typeof coverLetterContent === 'string' ? coverLetterContent : JSON.stringify(coverLetterContent, null, 2);
    const files = await generateDocumentFiles(contentStr, title, 'cover-letter', req.user.plan === 'free', req.user.name || req.user.email);

    const document = new Document({
      user: req.user._id,
      type: 'cover-letter',
      title,
      content: coverLetterContent,
      inputData: req.body,
      files,
      templateUsed: 'basic'
    });

    await document.save();

    await recordUserUsage(req.user._id, 'cover-letter');

    res.json({ 
      document,
      files: document.files 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error generating cover letter', error: error.message });
  }
});

// Generate HSE Document
router.post('/hse', auth, limitUsage('hse'), async (req, res) => {
  try {
    const { documentType, projectName, scope, hazards, controls } = req.body;

    let content;
    switch (documentType) {
      case 'risk-assessment':
        content = generateRiskAssessment({ projectName, scope, hazards, controls });
        break;
      case ' rams':
        content = generateRAMS({ projectName, scope, hazards, controls });
        break;
      case 'method-statement':
        content = generateMethodStatement({ projectName, scope });
        break;
      case 'toolbox-talk':
        content = generateToolboxTalk({ projectName, scope });
        break;
      case 'incident-report':
        content = generateIncidentReport(req.body);
        break;
      case 'hse-audit':
        content = generateHSEAudit(req.body);
        break;
      default:
        content = generateRiskAssessment({ projectName, scope, hazards, controls });
    }

    const title = `${documentType.replace('-', ' ').toUpperCase()} - ${projectName}`;
    const contentStr = typeof content === 'string' ? content : JSON.stringify(content, null, 2);
    const files = await generateDocumentFiles(contentStr, title, 'hse', req.user.plan === 'free', req.user.name || req.user.email);

    const document = new Document({
      user: req.user._id,
      type: documentType,
      title,
      content,
      inputData: req.body,
      files,
      templateUsed: 'basic'
    });

    await document.save();

    await recordUserUsage(req.user._id, 'hse');

    res.json({ 
      document,
      files: document.files 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error generating HSE document', error: error.message });
  }
});

// Generate Website
router.post('/website', auth, limitUsage('website'), async (req, res) => {
  try {
    const { businessName, industry, services, brandStyle, email, phone, address } = req.body;

    const websiteContent = generateWebsite({
      businessName, industry, services, brandStyle, email, phone, address
    });

    const title = `Website - ${businessName}`;
    const contentStr = typeof websiteContent === 'string' ? websiteContent : JSON.stringify(websiteContent, null, 2);
    const files = await generateDocumentFiles(contentStr, title, 'website', req.user.plan === 'free', req.user.name || req.user.email);

    const document = new Document({
      user: req.user._id,
      type: 'website',
      title,
      content: websiteContent,
      inputData: req.body,
      files,
      templateUsed: 'basic'
    });

    await document.save();

    await recordUserUsage(req.user._id, 'website');

    res.json({ 
      document,
      files: document.files 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error generating website', error: error.message });
  }
});

// Helper functions for generating content
function generateResume(data) {
  return {
    fullName: data.fullName,
    email: data.email,
    phone: data.phone,
    summary: data.summary,
    skills: data.skills ? data.skills.split(',').map(s => s.trim()) : [],
    experience: data.experience || [],
    education: data.education || [],
    format: 'ATS-Optimized',
    template: 'Modern Professional'
  };
}

function generateCoverLetter(data) {
  return {
    position: data.position,
    company: data.company,
    manager: data.manager || 'Hiring Manager',
    content: `Dear ${data.manager || 'Hiring Manager'},

I am writing to express my strong interest in the ${data.position} position at ${data.company}. With my background and qualifications, I am confident that I would be a valuable addition to your team.

${data.yourQualifications || 'I bring a proven track record of success and am excited about the opportunity to contribute to your organization.'}

I would welcome the opportunity to discuss how my skills and experience align with your needs. Thank you for considering my application.

Sincerely,
${data.yourName}`
  };
}

function generateRiskAssessment(data) {
  return {
    projectName: data.projectName,
    scope: data.scope,
    date: new Date().toISOString().split('T')[0],
    hazards: data.hazards || [],
    riskMatrix: {
      low: [],
      medium: [],
      high: [],
      critical: []
    },
    controlMeasures: data.controls || [],
    preparedBy: 'SAR Trends AI',
    approvedBy: ''
  };
}

function generateRAMS(data) {
  return {
    projectName: data.projectName,
    scope: data.scope,
    documentType: 'RAMS',
    riskAssessment: generateRiskAssessment(data),
    methodStatement: generateMethodStatement(data),
    emergencyProcedures: [
      'Emergency contact numbers',
      'First aid procedures',
      'Evacuation routes',
      'Incident reporting procedure'
    ],
    ppe: ['Hard hat', 'Safety boots', 'High visibility vest', 'Gloves'],
    preparedBy: 'SAR Trends AI'
  };
}

function generateMethodStatement(data) {
  return {
    projectName: data.projectName,
    scope: data.scope,
    sequence: [
      'Site preparation and mobilization',
      'Setup work area and barriers',
      'Execute main scope of work',
      'Quality checks and inspection',
      'Demobilization and site clearance'
    ],
    resources: {
      manpower: [],
      equipment: [],
      materials: []
    },
    timeline: 'As per project schedule',
    qualityStandards: 'ISO 9001 compliant',
    preparedBy: 'SAR Trends AI'
  };
}

function generateToolboxTalk(data) {
  return {
    projectName: data.projectName,
    topic: data.scope || 'General Safety',
    date: new Date().toISOString().split('T')[0],
    attendees: [],
    discussionPoints: [
      'Review of safe work procedures',
      'Hazard identification',
      'PPE requirements',
      'Emergency procedures'
    ],
    actions: [],
    conductedBy: ''
  };
}

function generateIncidentReport(data) {
  return {
    incidentDate: data.date || new Date().toISOString().split('T')[0],
    location: data.location || '',
    description: data.description || '',
    personsInvolved: [],
    witnesses: [],
    immediateActions: [],
    rootCause: '',
    correctiveActions: [],
    preparedBy: 'SAR Trends AI'
  };
}

function generateHSEAudit(data) {
  return {
    siteName: data.siteName || '',
    auditDate: new Date().toISOString().split('T')[0],
    auditors: [],
    scope: data.scope || '',
    findings: {
      major: [],
      minor: [],
      observations: []
    },
    complianceScore: 0,
    recommendations: [],
    nextAuditDate: '',
    preparedBy: 'SAR Trends AI'
  };
}

function generateWebsite(data) {
  return {
    businessName: data.businessName,
    industry: data.industry,
    pages: [
      {
        name: 'Home',
        content: generateHomePage(data)
      },
      {
        name: 'Services',
        content: generateServicesPage(data)
      },
      {
        name: 'About',
        content: generateAboutPage(data)
      },
      {
        name: 'Contact',
        content: generateContactPage(data)
      }
    ],
    style: data.brandStyle || 'modern',
    generatedAt: new Date().toISOString()
  };
}

function generateHomePage(data) {
  return {
    hero: {
      headline: `Welcome to ${data.businessName}`,
      subheadline: `Professional ${data.industry} Services`,
      cta: 'Contact Us'
    },
    sections: [
      { title: 'About Us', content: `Welcome to ${data.businessName}, your trusted partner in ${data.industry}.` },
      { title: 'Our Services', content: data.services || 'Professional services tailored to your needs.' }
    ]
  };
}

function generateServicesPage(data) {
  return {
    title: 'Our Services',
    services: (data.services || []).map(s => ({ name: s, description: `Professional ${s} services` }))
  };
}

function generateAboutPage(data) {
  return {
    title: 'About Us',
    content: `${data.businessName} is a leading provider of professional ${data.industry} services.`
  };
}

function generateContactPage(data) {
  return {
    title: 'Contact Us',
    email: data.email || '',
    phone: data.phone || '',
    address: data.address || '',
    form: { enabled: true }
  };
}

module.exports = router;

