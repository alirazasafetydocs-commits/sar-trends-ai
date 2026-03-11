// Central AI Service for SAR Trends AI
// Uses OpenAI API for intelligent document generation

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

async function callOpenAI(prompt, systemPrompt) {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      throw new Error('OpenAI API request failed');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI Error:', error);
    throw error;
  }
}

// Generate ATS-Optimized Resume
export async function generateResume(data) {
  const systemPrompt = `You are a professional resume writer specializing in ATS-optimized resumes. 
Create resumes that pass through Applicant Tracking Systems while being human-readable.
Include proper formatting, keywords, and action verbs.`;

  const prompt = `Create a professional ATS-optimized resume with the following information:
- Full Name: ${data.fullName}
- Email: ${data.email}
- Phone: ${data.phone}
- Professional Summary: ${data.summary}
- Skills: ${data.skills}
- Work Experience: ${data.experience}
- Education: ${data.education}

Format the resume with clear sections and ATS-friendly formatting.`;

  return await callOpenAI(prompt, systemPrompt);
}

// Generate Cover Letter
export async function generateCoverLetter(data) {
  const systemPrompt = `You are a professional cover letter writer. 
Create compelling, personalized cover letters that capture recruiters' attention.`;

  const prompt = `Create a professional cover letter:
- Position: ${data.position}
- Company: ${data.company}
- Hiring Manager: ${data.manager || 'Hiring Manager'}
- Applicant Name: ${data.yourName}
- Qualifications: ${data.yourQualifications}

Write a compelling cover letter that highlights the applicant's suitability for the position.`;

  return await callOpenAI(prompt, systemPrompt);
}

// Generate HSE Risk Assessment
export async function generateRiskAssessment(data) {
  const systemPrompt = `You are a health and safety expert. 
Create comprehensive risk assessments following ISO 45001 standards.`;

  const prompt = `Create a detailed Risk Assessment for:
- Project Name: ${data.projectName}
- Scope of Work: ${data.scope}
- Hazards Identified: ${data.hazards?.join(', ') || 'N/A'}
- Control Measures: ${data.controls?.join(', ') || 'N/A'}

Include:
1. Project Overview
2. Hazard Identification (at least 5 hazards)
3. Risk Matrix (Severity x Likelihood)
4. Control Measures
5. Emergency Procedures
6. PPE Requirements
7. Sign-off section`;

  return await callOpenAI(prompt, systemPrompt);
}

// Generate RAMS Document
export async function generateRAMS(data) {
  const systemPrompt = `You are a health and safety expert specializing in RAMS (Risk Assessment and Method Statements).
Create comprehensive documents following UK HSE guidelines.`;

  const prompt = `Create a comprehensive RAMS document for:
- Project Name: ${data.projectName}
- Scope of Work: ${data.scope}
- Hazards: ${data.hazards?.join(', ') || 'Various hazards'}
- Controls: ${data.controls?.join(', ') || 'Various controls'}

Include:
1. Risk Assessment
2. Method Statement (step-by-step procedures)
3. Safe Work Procedures
4. Emergency Procedures
5. PPE Requirements
6. Training Requirements
7. Waste Management
8. Quality Control`;

  return await callOpenAI(prompt, systemPrompt);
}

// Generate Method Statement
export async function generateMethodStatement(data) {
  const systemPrompt = `You are a construction/project manager expert.
Create detailed method statements for construction and engineering projects.`;

  const prompt = `Create a detailed Method Statement for:
- Project Name: ${data.projectName}
- Scope: ${data.scope}

Include:
1. Project Details
2. Sequence of Works (step-by-step)
3. Resources Required (Manpower, Equipment, Materials)
4. Timeframe
5. Quality Standards
6. Health & Safety Requirements
7. Environmental Considerations
8. Emergency Procedures`;

  return await callOpenAI(prompt, systemPrompt);
}

// Generate Website Content
export async function generateWebsite(data) {
  const systemPrompt = `You are a professional web content writer and SEO expert.
Create engaging, SEO-optimized website content for businesses.`;

  const prompt = `Create website content for:
- Business Name: ${data.businessName}
- Industry: ${data.industry}
- Services: ${data.services?.join(', ') || 'Various services'}
- Contact: ${data.email}, ${data.phone}, ${data.address}

Create content for:
1. Homepage (Hero section, About snippet, Services overview)
2. Services Page (Detailed service descriptions)
3. About Us Page
4. Contact Page (with contact form suggestion)
5. Call-to-action sections

Make it professional, engaging, and SEO-friendly.`;

  return await callOpenAI(prompt, systemPrompt);
}

// Fallback templates when OpenAI is not available
export function getTemplateResume(data) {
  return `PROFESSIONAL RESUME
===================

${data.fullName}
${data.email} | ${data.phone}

PROFESSIONAL SUMMARY
${data.summary || 'Results-driven professional with extensive experience.'}

SKILLS
${data.skills || 'Professional skills'}

WORK EXPERIENCE
${data.experience || 'Professional experience'}

EDUCATION
${data.education || 'Educational background'}`;
}

export function getTemplateCoverLetter(data) {
  return `Dear ${data.manager || 'Hiring Manager'},

I am writing to express my strong interest in the ${data.position} position at ${data.company}.

${data.yourQualifications || 'I am a qualified professional eager to contribute to your team.'}

I would welcome the opportunity to discuss how my skills and experience align with your needs.

Sincerely,
${data.yourName}`;
}

export function getTemplateRiskAssessment(data) {
  return `RISK ASSESSMENT
===============

Project: ${data.projectName}
Date: ${new Date().toLocaleDateString()}

SCOPE OF WORK
${data.scope}

HAZARDS IDENTIFIED
${(data.hazards || []).map((h, i) => `${i+1}. ${h}`).join('\n')}

CONTROL MEASURES
${(data.controls || []).map((c, i) => `${i+1}. ${c}`).join('\n')}

RISK MATRIX
- Severity: High/Medium/Low
- Likelihood: High/Medium/Low
- Risk Level: Calculate based on matrix

Prepared by: SAR Trends AI`;
}

export function getTemplateRAMS(data) {
  return `RAMS DOCUMENT
=============

Project: ${data.projectName}
Date: ${new Date().toLocaleDateString()}

RISK ASSESSMENT
${getTemplateRiskAssessment(data)}

METHOD STATEMENT
${getTemplateMethodStatement(data)}

EMERGENCY PROCEDURES
1. Emergency contact numbers
2. First aid procedures
3. Evacuation routes
4. Incident reporting

PPE REQUIREMENTS
- Hard hat
- Safety boots
- High visibility vest
- Gloves
- Safety glasses

Prepared by: SAR Trends AI`;
}

export function getTemplateMethodStatement(data) {
  return `METHOD STATEMENT
=================

Project: ${data.projectName}

1. SITE PREPARATION
- Set up work area
- Install barriers and signage

2. MAIN WORKS
- Execute scope of work
- Monitor progress

3. QUALITY CHECKS
- Inspect work completed
- Address any issues

4. COMPLETION
- Final inspection
- Site clearance`;
}

export function getTemplateWebsite(data) {
  return `Website for ${data.businessName}
Industry: ${data.industry}

HOMEPAGE
Welcome to ${data.businessName} - Your trusted ${data.industry} partner

SERVICES
${(data.services || []).map(s => `- ${s}`).join('\n')}

CONTACT
Email: ${data.email}
Phone: ${data.phone}
Address: ${data.address}`;
}
