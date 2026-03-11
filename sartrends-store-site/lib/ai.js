// Advanced AI Service for SAR Trends AI
// Powered by OpenAI GPT-4 for intelligent document generation

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// AI Model configuration
const AI_CONFIG = {
  model: 'gpt-4',
  temperature: 0.7,
  max_tokens: 4000
};

// Enhanced OpenAI API call with better error handling
async function callOpenAI(prompt, systemPrompt, options = {}) {
  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key not configured');
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: options.model || AI_CONFIG.model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        temperature: options.temperature || AI_CONFIG.temperature,
        max_tokens: options.max_tokens || AI_CONFIG.max_tokens
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'OpenAI API request failed');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI Error:', error);
    throw error;
  }
}

// ============================================
// RESUME & CV GENERATORS
// ============================================

// ATS-Optimized Resume Generator
export async function generateResume(data) {
  const systemPrompt = `You are an expert resume writer and ATS (Applicant Tracking System) specialist.
Your resumes are:
1. ATS-optimized with proper keywords and formatting
2. Professional, concise, and impactful
3. Using action verbs and quantifiable achievements
4. Properly structured with clear sections
5. Following industry best practices

Create a complete, ready-to-use resume in a professional format.`;

  const prompt = `Create a professional ATS-optimized resume with the following information:

PERSONAL INFORMATION:
- Full Name: ${data.fullName}
- Email: ${data.email}
- Phone: ${data.phone}
- Location: ${data.location || 'Not specified'}
- LinkedIn: ${data.linkedin || 'Not specified'}

PROFESSIONAL SUMMARY:
${data.summary || 'Results-driven professional with proven track record'}

CORE SKILLS (comma separated):
${data.skills || 'Relevant professional skills'}

WORK EXPERIENCE:
${data.experience || 'Professional experience'}

EDUCATION:
${data.education || 'Educational background'}

CERTIFICATIONS:
${data.certifications || 'Relevant certifications'}

LANGUAGES:
${data.languages || 'English'}

INTERESTS:
${data.interests || 'Not specified'}

Please create a complete, professionally formatted resume with:
1. Header with contact information
2. Professional Summary (2-3 sentences)
3. Core Competencies/Skills section
4. Professional Experience (with bullet points)
5. Education
6. Certifications
7. Additional sections as relevant`;

  return await callOpenAI(prompt, systemPrompt);
}

// CV Generator (UK/International format)
export async function generateCV(data) {
  const systemPrompt = `You are an expert CV writer specializing in UK and international CV formats.
Create comprehensive CVs that:
1. Are 2-3 pages maximum
2. Use bullet points for achievements
3. Include measurable results
4. Follow UK/EU formatting standards
5. Are ATS-friendly`;

  const prompt = `Create a comprehensive CV with:

PERSONAL DETAILS:
- Name: ${data.fullName}
- Email: ${data.email}
- Phone: ${data.phone}
- Address: ${data.address || ''}
- Nationality: ${data.nationality || ''}

PERSONAL PROFILE:
${data.profile || 'Professional summary'}

KEY SKILLS:
${data.skills}

EMPLOYMENT HISTORY:
${data.experience}

EDUCATION & QUALIFICATIONS:
${data.education}

CERTIFICATIONS:
${data.certifications || 'None'}

ADDITIONAL SKILLS:
- Languages: ${data.languages || 'English'}
- IT Skills: ${data.itSkills || 'Microsoft Office'}

INTERESTS:
${data.interests || 'Not specified'}

REFEREES:
${data.referees || 'Available on request'}`;

  return await callOpenAI(prompt, systemPrompt);
}

// Resume Improver/Optimizer
export async function optimizeResume(data) {
  const systemPrompt = `You are an ATS and career optimization expert. Analyze resumes and provide:
1. ATS score (0-100)
2. Keyword analysis
3. Improvement suggestions
4. Actionable recommendations`;

  const prompt = `Analyze this resume and provide optimization recommendations:

CURRENT RESUME:
${data.resumeContent}

JOB TARGET:
${data.jobTarget || 'General job applications'}

Provide:
1. ATS Score (0-100)
2. Missing keywords
3. Format issues
4. Content improvements
5. Actionable checklist`;

  return await callOpenAI(prompt, systemPrompt);
}

// ============================================
// COVER LETTER GENERATORS
// ============================================

// Cover Letter Generator with tone options
export async function generateCoverLetter(data) {
  const tone = data.tone || 'professional';
  
  const tonePrompts = {
    professional: 'Write in a professional, formal tone that demonstrates expertise and credibility.',
    casual: 'Write in a friendly, conversational tone that shows personality while remaining professional.',
    executive: 'Write in an executive, authoritative tone that demonstrates leadership and strategic thinking.',
    academic: 'Write in an academic tone suitable for research or educational positions.',
    creative: 'Write in a creative, engaging way that showcases creativity while remaining professional.'
  };

  const systemPrompt = `You are an expert cover letter writer.
${tonePrompts[data.tone] || tonePrompts.professional}
Your cover letters:
1. Are compelling and personalized
2. Address the hiring manager specifically when possible
3. Highlight relevant achievements
4. Show enthusiasm for the role
5. Include a strong call to action`;

  const prompt = `Write a compelling cover letter:

APPLICANT:
- Name: ${data.yourName}
- Email: ${data.email || 'email@address.com'}
- Phone: ${data.phone || 'phone number'}
- Background: ${data.yourQualifications || 'Relevant qualifications and experience'}

POSITION:
- Job Title: ${data.position}
- Company: ${data.company}
- Hiring Manager: ${data.manager || 'Hiring Manager'}

JOB DESCRIPTION KEY POINTS:
${data.jobDescription || 'Not provided'}

WHY THIS COMPANY:
${data.whyCompany || 'Research the company and explain why you want to join'}

UNIQUE SELLING POINTS:
${data.uniqueSelling || 'What makes you different from other candidates'}

Please create a complete, ready-to-send cover letter.`;

  return await callOpenAI(prompt, systemPrompt);
}

// Follow-up Letter Generator
export async function generateFollowUpLetter(data) {
  const systemPrompt = `You are an expert in job search communications.
Write professional follow-up letters that are:
1. Polite and courteous
2. Not pushy or demanding
3. Reaffirming interest
4. Adding new information if relevant`;

  const prompt = `Write a professional follow-up letter:

- Original Position: ${data.position}
- Company: ${data.company}
- Your Name: ${data.yourName}
- Date Applied: ${data.dateApplied || 'Recent'}
- Interview Status: ${data.interviewStatus || 'Pending'}

Additional Notes:
${data.notes || 'Any additional information to include'}

Create a follow-up letter that:
1. Expresses continued interest
2. Inquires about application status
3. Offers additional information if needed
4. Thanks them for their time`;

  return await callOpenAI(prompt, systemPrompt);
}

// ============================================
// HSE DOCUMENT GENERATORS
// ============================================

// Risk Assessment Generator
export async function generateRiskAssessment(data) {
  const systemPrompt = `You are a certified Health and Safety expert specializing in risk assessments.
Create comprehensive risk assessments following:
1. ISO 45001:2018 standards
2. UK HSE guidelines
3. OSHA requirements
4. Industry best practices

Include proper risk matrix and control measures.`;

  const prompt = `Create a detailed Risk Assessment for:

PROJECT/COMPANY: ${data.projectName || data.companyName}
LOCATION: ${data.location || 'Site location'}
DATE: ${data.date || new Date().toLocaleDateString()}
ASSESSOR: ${data.assessor || 'SAR Trends AI'}
SCOPE OF WORK: ${data.scope}

HAZARDS IDENTIFIED:
${data.hazards?.join('\n') || 'Working at heights\nElectrical hazards\nManual handling\nChemical exposure\nSlips, trips, and falls\nMachinery and equipment\nNoise exposure\nConfined spaces'}

EXISTING CONTROLS:
${data.controls?.join('\n') || 'PPE provided\nTraining completed\nSafe work procedures\nEmergency equipment\nFirst aid facilities'}

Please create a comprehensive Risk Assessment including:
1. Cover Page with project details
2. Scope and Objectives
3. Hazard Identification Table (minimum 10 hazards)
4. Risk Matrix (Severity x Likelihood)
5. Risk Rating Calculation
6. Control Measures (Hierarchy of Controls)
7. Emergency Procedures
8. PPE Requirements
9. Training Requirements
10. Monitoring and Review
11. Sign-off section

Format as a professional document.`;

  return await callOpenAI(prompt, systemPrompt);
}

// RAMS Document Generator
export async function generateRAMS(data) {
  const systemPrompt = `You are a senior Health and Safety consultant specializing in RAMS (Risk Assessment and Method Statements).
Create comprehensive RAMS documents following:
1. UK HSE guidelines
2. ISO 45001 standards
3. Construction (Design and Management) Regulations 2015
4. Industry best practices`;

  const prompt = `Create a comprehensive RAMS document for:

PROJECT: ${data.projectName}
CLIENT: ${data.client || 'Company Name'}
LOCATION: ${data.location || 'Site'}
DATE: ${data.date || new Date().toLocaleDateString()}
REFERENCE NO: RAMS-${Date.now()}

SCOPE OF WORK:
${data.scope}

ACTIVITIES/TASKS:
${data.activities || 'Main construction activities'}

HAZARDS:
${data.hazards?.join('\n') || 'As identified in risk assessment'}

CONTROL MEASURES:
${data.controls?.join('\n') || 'Hierarchy of controls applied'}

PERSONNEL REQUIRED:
${data.personnel || 'Qualified and trained personnel'}

EQUIPMENT REQUIRED:
${data.equipment || 'Required tools and equipment'}

Please create a complete RAMS document including:

RISK ASSESSMENT SECTION:
1. Hazard identification
2. Risk evaluation matrix
3. Risk ratings (Before/After controls)
4. Control measures

METHOD STATEMENT SECTION:
1. Sequence of works (step-by-step)
2. Resources (Manpower, Materials, Equipment)
3. Safe work procedures
4. Traffic management
5. Emergency procedures
6. Environmental controls
7. Quality control measures

APPENDICES:
1. PPE Requirements
2. Training Requirements
3. Emergency Contacts
4. Permit to Work requirements
5. Inspection checklists

SIGN-OFF SECTION:
- Prepared by
- Approved by
- Date
- Review date`;

  return await callOpenAI(prompt, systemPrompt);
}

// Method Statement Generator
export async function generateMethodStatement(data) {
  const systemPrompt = `You are a construction and project management expert.
Create detailed method statements that:
1. Are clear and sequential
2. Include all necessary details
3. Address safety and quality
4. Follow industry standards`;

  const prompt = `Create a detailed Method Statement for:

PROJECT: ${data.projectName}
LOCATION: ${data.location}
CLIENT: ${data.client || 'TBC'}
DATE: ${data.date || new Date().toLocaleDateString()}

SCOPE OF WORKS:
${data.scope}

DURATION:
${data.duration || 'To be determined'}

START DATE:
${data.startDate || 'TBC'}

KEY ACTIVITIES:
${data.activities}

RESOURCES:
- Personnel: ${data.personnel}
- Equipment: ${data.equipment}
- Materials: ${data.materials}

Please create a Method Statement including:
1. Project Overview
2. Scope of Works
3. Sequence of Operations (detailed steps)
4. Resources Required
5. Programme/Timeline
6. Safe Work Procedures
7. Quality Standards
8. Environmental Considerations
9. Emergency Procedures
10. Traffic Management
11. PPE Requirements
12. Training Requirements
13. Monitoring and Inspection
14. Waste Management
15. References and Standards
16. Sign-off and Approvals`;

  return await callOpenAI(prompt, systemPrompt);
}

// Job Safety Analysis (JSA) Generator
export async function generateJSA(data) {
  const systemPrompt = `You are a safety professional specializing in Job Safety Analysis.
Create comprehensive JSAs that:
1. Break down jobs into steps
2. Identify hazards for each step
3. Recommend controls for each hazard
4. Follow OSHA guidelines`;

  const prompt = `Create a Job Safety Analysis (JSA) for:

JOB/TASK: ${data.jobName}
DEPARTMENT: ${data.department || 'Operations'}
LOCATION: ${data.location}
DATE: ${data.date || new Date().toLocaleDateString()}
ANALYST: ${data.analyst || 'SAR Trends AI'}

JOB STEPS:
${data.jobSteps || 'Break down the job into sequential steps'}

EQUIPMENT USED:
${data.equipment || 'Tools and equipment'}

PPE REQUIRED:
${data.ppe || 'As per risk assessment'}

Please create a JSA including:
1. Job Information
2. Required PPE
3. Step-by-step analysis table with:
   - Step Number
   - Job Step
   - Potential Hazards
   - Risk Rating
   - Control Measures
4. Emergency Procedures
5. Training Requirements
6. Signatures (Prepared by, Approved by, Date)`;

  return await callOpenAI(prompt, systemPrompt);
}

// Incident Report Generator
export async function generateIncidentReport(data) {
  const systemPrompt = `You are an expert in incident investigation and reporting.
Create comprehensive incident reports that:
1. Follow OSHA recording requirements
2. Include root cause analysis
3. Provide corrective actions
4. Are legally compliant`;

  const prompt = `Create an Incident Report for:

INCIDENT DETAILS:
- Date of Incident: ${data.incidentDate}
- Time: ${data.incidentTime}
- Location: ${data.location}
- Type of Incident: ${data.incidentType}

PERSONS INVOLVED:
- Injured Party: ${data.injuredPerson}
- Witness(es): ${data.witnesses}
- Supervisor: ${data.supervisor}

INCIDENT DESCRIPTION:
${data.description}

IMMEDIATE ACTIONS TAKEN:
${data.immediateActions}

INJURY/DAMAGE DETAILS:
${data.injuryDetails}

Please create a complete Incident Report including:
1. Incident Details
2. Persons Involved
3. Incident Description (What, Where, When, How)
4. Immediate Actions Taken
5. Injury/Damage Assessment
6. Root Cause Analysis (Why-Chart or 5-Why method)
7. Contributing Factors
8. Corrective Actions (with responsibilities and dates)
9. Lessons Learned
10. Recommendations
11. Appendices (photos, witness statements)
12. Signatures and Approvals`;

  return await callOpenAI(prompt, systemPrompt);
}

// Fire Risk Assessment Generator
export async function generateFireRiskAssessment(data) {
  const systemPrompt = `You are a fire safety expert.
Create comprehensive Fire Risk Assessments following:
1. UK Fire Safety Order 2005
2. PAS 79 guidelines
3. ISO 45001 standards
4. NFPA guidelines`;

  const prompt = `Create a Fire Risk Assessment for:

PREMISES: ${data.premisesName}
ADDRESS: ${data.address}
USE OF PREMISES: ${data.use}
ASSESSOR: ${data.assessor}
DATE: ${data.date || new Date().toLocaleDateString()}
REVIEW DATE: ${data.reviewDate || '1 year from date'}

OCCUPANCY:
- Maximum Occupants: ${data.maxOccupants}
- Sleeping Risk: ${data.sleepingRisk || 'No'}
- Vulnerable Persons: ${data.vulnerable || 'None'}

FIRE HAZARDS IDENTIFIED:
${data.hazards || 'Electrical, Smoking, Heating, Cooking, Storage, Chemicals'}

EXISTING FIRE SAFETY MEASURES:
${data.existingMeasures || 'Fire alarms, Extinguishers, Emergency lighting, Escape routes'}

Please create a Fire Risk Assessment including:
1. Building Information
2. Occupancy Details
3. Fire Hazards Identification
4. Fire Safety Measures Assessment
5. People at Risk
6. Fire Risk Rating
7. Fire Prevention Measures
8. Fire Detection and Warning
9. Escape Routes and Procedures
10. Fire Fighting Equipment
11. Staff Training
12. Maintenance and Testing Schedule
13. Emergency Plan
14. Risk Rating Matrix
15. Action Plan
16. Review Procedure
17. Sign-off`;

  return await callOpenAI(prompt, systemPrompt);
}

// Toolbox Talk Generator
export async function generateToolboxTalk(data) {
  const systemPrompt = `You are an experienced safety trainer.
Create engaging, practical toolbox talks that:
1. Are short (5-10 minutes)
2. Focus on one topic
3. Include practical examples
4. Encourage participation`;

  const prompt = `Create a Toolbox Talk for:

TOPIC: ${data.topic}
DATE: ${data.date || new Date().toLocaleDateString()}
LOCATION: ${data.location}
PRESENTER: ${data.presenter}
DURATION: 5-10 minutes

ATTENDEES: ${data.attendees || 'Site personnel'}

KEY POINTS TO COVER:
${data.keyPoints}

Please create a Toolbox Talk including:
1. Title and Objective
2. Introduction (why this topic matters)
3. Key Discussion Points (3-5 main points)
4. Real-life Examples/Case Studies
5. Questions to Ask
6. Practical Demonstration (if applicable)
7. Summary and Key Takeaways
8. Sign-off sheet requirements
9. Follow-up actions

Make it engaging, interactive, and practical!`;

  return await callOpenAI(prompt, systemPrompt);
}

// ============================================
// WEBSITE & CONTENT GENERATORS
// ============================================

// Website Content Generator
export async function generateWebsite(data) {
  const systemPrompt = `You are an expert web content writer and SEO specialist.
Create engaging, SEO-optimized website content that:
1. Ranks well in search engines
2. Engages visitors
3. Converts to customers
4. Reflects brand voice`;

  const prompt = `Create complete website content for:

BUSINESS: ${data.businessName}
INDUSTRY: ${data.industry}
SERVICES/PRODUCTS: ${data.services?.join(', ')}
CONTACT: ${data.email}, ${data.phone}
ADDRESS: ${data.address}
TARGET AUDIENCE: ${data.targetAudience || 'General consumers'}
BRAND VOICE: ${data.brandVoice || 'Professional, friendly'}

Please create content for:

1. HOMEPAGE
   - Hero section (headline + subheadline)
   - About us snippet
   - Services overview
   - Why choose us
   - Call to action
   - Footer content

2. ABOUT PAGE
   - Company story
   - Mission and vision
   - Team/Values

3. SERVICES/PRODUCTS PAGE
   - Service descriptions
   - Benefits
   - Pricing (if applicable)

4. CONTACT PAGE
   - Contact form suggestions
   - Map/Location details

5. SEO ELEMENTS
   - Meta descriptions
   - Header tags
   - Keywords to target

Format each section clearly with suggested copy.`;

  return await callOpenAI(prompt, systemPrompt);
}

// Website Code Generator (HTML/CSS)
export async function generateWebsiteCode(data) {
  const systemPrompt = `You are a full-stack web developer.
Create clean, modern, responsive website code using:
1. HTML5 semantic markup
2. Modern CSS (Flexbox, Grid)
3. Mobile-first responsive design
4. Clean, maintainable code`;

  const prompt = `Create a complete website for:

BUSINESS: ${data.businessName}
INDUSTRY: ${data.industry}
PAGES NEEDED: ${data.pages || 'Home, About, Services, Contact'}
COLOR PREFERENCE: ${data.colors || 'Blue and white, professional'}
STYLE: ${data.style || 'Modern, clean, professional'}

SERVICES:
${data.services?.join('\n') || 'Main services'}

CONTACT INFO:
- Email: ${data.email}
- Phone: ${data.phone}
- Address: ${data.address}

Please create a complete, responsive HTML/CSS website with:
1. Modern, professional design
2. Navigation menu
3. Hero section with call to action
4. Services/Features section
5. About section
6. Contact section with form
7. Footer
8. Mobile-responsive layout
9. Smooth animations
10. Clean, commented code

Return the complete HTML and CSS code.`;

  return await callOpenAI(prompt, systemPrompt, { max_tokens: 6000 });
}

// ============================================
// BUSINESS DOCUMENT GENERATORS
// ============================================

// Job Description Generator
export async function generateJobDescription(data) {
  const systemPrompt = `You are an HR professional and recruitment expert.
Create comprehensive job descriptions that:
1. Attract qualified candidates
2. Are clear and detailed
3. Include all required elements
4. Follow HR best practices`;

  const prompt = `Create a detailed Job Description for:

POSITION: ${data.position}
DEPARTMENT: ${data.department}
LOCATION: ${data.location}
EMPLOYMENT TYPE: ${data.employmentType || 'Full-time'}
REPORTS TO: ${data.reportsTo}
SALARY RANGE: ${data.salaryRange || 'Competitive'}

COMPANY: ${data.company}
COMPANY DESCRIPTION: ${data.companyDescription || 'Leading organization in the industry'}

RESPONSIBILITIES:
${data.responsibilities}

REQUIREMENTS:
${data.requirements}

BENEFITS:
${data.benefits || 'Competitive benefits package'}

Please create a complete Job Description including:
1. Job Title
2. Department
3. Location
4. Employment Type
5. Summary/Overview
6. Key Responsibilities (detailed)
7. Required Qualifications
8. Preferred Qualifications
9. Skills Required
10. Experience Level
11. Salary and Benefits
12. Company Overview
13. How to Apply
14. EEO Statement`;

  return await callOpenAI(prompt, systemPrompt);
}

// Business Proposal Generator
export async function generateBusinessProposal(data) {
  const systemPrompt = `You are a business development expert.
Create compelling business proposals that:
1. Are persuasive and professional
2. Address client needs
3. Include pricing
4. Lead to conversions`;

  const prompt = `Create a Business Proposal for:

YOUR COMPANY: ${data.yourCompany}
CLIENT: ${data.client}
PROJECT: ${data.project}

SCOPE OF WORK:
${data.scope}

OBJECTIVES:
${data.objectives}

TIMELINE:
${data.timeline || 'As discussed'}

BUDGET:
${data.budget || 'As per discussion'}

Please create a comprehensive Business Proposal including:
1. Cover Page
2. Executive Summary
3. Understanding of Client Needs
4. Proposed Solution/Approach
5. Scope of Work
6. Timeline/Milestones
7. Team/Resources
8. Investment/Pricing
9. Terms and Conditions
10. Next Steps
11. Call to Action
12. Appendices (if needed)`;

  return await callOpenAI(prompt, systemPrompt, { max_tokens: 5000 });
}

// SOP Generator
export async function generateSOP(data) {
  const systemPrompt = `You are a process management expert.
Create clear, detailed Standard Operating Procedures that:
1. Are easy to follow
2. Include all necessary steps
3. Use standard formatting
4. Are suitable for training`;

  const prompt = `Create a Standard Operating Procedure (SOP) for:

PROCESS: ${data.processName}
DEPARTMENT: ${data.department}
PURPOSE: ${data.purpose}

SCOPE:
${data.scope}

RESPONSIBLE PERSON:
${data.responsiblePerson || 'Process Owner'}

PROCEDURE STEPS:
${data.steps || 'Main steps of the procedure'}

Please create a comprehensive SOP including:
1. Document Information (Version, Date, Author)
2. Purpose
3. Scope
4. Definitions
5. Responsibilities
6. Procedure (step-by-step with detailed instructions)
7. Checkpoints/Quality Controls
8. Documentation Required
9. Related Documents
10. Training Requirements
11. Revision History
12. Approval Signatures`;

  return await callOpenAI(prompt, systemPrompt);
}

// LinkedIn Profile Optimizer
export async function optimizeLinkedIn(data) {
  const systemPrompt = `You are a LinkedIn profile optimization expert.
Create optimized LinkedIn profiles that:
1. Rank higher in searches
2. Attract recruiters
3. Showcase personal brand
4. Are professional yet engaging`;

  const prompt = `Optimize this LinkedIn profile:

CURRENT HEADLINE: ${data.headline}
CURRENT SUMMARY: ${data.summary}
CURRENT EXPERIENCE: ${data.experience}
SKILLS: ${data.skills}
TARGET ROLE: ${data.targetRole || 'Professional role'}
INDUSTRY: ${data.industry}

Please provide:
1. Improved Headline (with keywords)
2. Enhanced Summary (2-3 paragraphs)
3. Experience Descriptions (improved)
4. Skills Suggestions (keyword-rich)
5. Featured Section recommendations
6. Tips for visibility`;

  return await callOpenAI(prompt, systemPrompt);
}

// ============================================
// FALLBACK TEMPLATES (when AI is unavailable)
// ============================================

// Enhanced Resume Template
export function getTemplateResume(data) {
  return `===============================================
PROFESSIONAL RESUME
===============================================

${data.fullName || 'John Doe'}
${data.email || 'john@example.com'} | ${data.phone || '+1 234 567 8900'}
${data.location || 'City, Country'} | LinkedIn: ${data.linkedin || 'linkedin.com/in/johndoe'}

===============================================
PROFESSIONAL SUMMARY
===============================================
${data.summary || 'Results-driven professional with extensive experience in driving organizational success through strategic planning, team leadership, and operational excellence. Proven track record of delivering projects on time and within budget while maintaining quality standards.'}

===============================================
CORE COMPETENCIES
===============================================
${data.skills || 'Strategic Planning | Project Management | Team Leadership | Business Development | Client Relations | Data Analysis | Problem Solving | Communication'}

===============================================
PROFESSIONAL EXPERIENCE
===============================================

Senior Professional Title
Company Name | Location | Date Range
• Led strategic initiatives resulting in 25% increase in operational efficiency
• Managed cross-functional teams of 15+ members across multiple departments
• Developed and implemented policies that improved compliance by 40%
• Spearheaded projects with budgets exceeding $500K
• Established partnerships that generated $1M+ in new revenue

Professional Title
Company Name | Location | Date Range
• Achieved consistent targets with 95% success rate
• Implemented process improvements reducing costs by 20%
• Collaborated with stakeholders to deliver key business objectives
• Provided training and mentorship to junior team members
• Maintained high standards of quality and customer satisfaction

===============================================
EDUCATION
===============================================
${data.education || 'Bachelor of Business Administration\nUniversity Name | Graduation Year'}

===============================================
CERTIFICATIONS
===============================================
${data.certifications || 'Professional Certification in Project Management (PMP)\nIndustry-relevant certifications'}

===============================================
ADDITIONAL INFORMATION
===============================================
Languages: ${data.languages || 'English (Native)'}
Interests: ${data.interests || 'Professional development, Industry networking'}

===============================================
Generated by SAR Trends AI - Professional Resume Builder
===============================================`;
}

// Enhanced Cover Letter Template
export function getTemplateCoverLetter(data) {
  const tone = data.tone || 'professional';
  let greeting = data.manager ? `Dear ${data.manager},` : 'Dear Hiring Manager,';
  
  return `${greeting}

${tone === 'professional' ? `I am writing to express my strong interest in the ${data.position} position at ${data.company}. With my background in ${data.background || 'professional expertise'}, I am confident that I would be a valuable addition to your team.` : tone === 'casual' ? `I'm excited to apply for the ${data.position} role at ${data.company}! I've been following your company's growth and I'm thrilled at the opportunity to join your team.` : `I am compelled to express my sincere interest in the ${data.position} position at ${data.company}. As a seasoned professional with extensive experience in ${data.background || 'the field'}, I am confident in my ability to drive exceptional results for your organization.`}

${data.yourQualifications || 'Throughout my career, I have developed a comprehensive skill set that aligns well with the requirements of this position. My commitment to excellence, combined with my ability to collaborate effectively with cross-functional teams, has consistently contributed to organizational success.'}

${tone === 'professional' ? `I am particularly drawn to ${data.company} because of its reputation for innovation and commitment to quality. I would welcome the opportunity to discuss how my skills and experience can contribute to your continued success.` : tone === 'casual' ? `I'd love to chat about how I can bring my experience to ${data.company} and help take things to the next level. Looking forward to hearing from you!` : `I would be honored to discuss how my expertise can contribute to ${data.company}'s continued growth and success. I am available at your earliest convenience for a meeting.`}

Thank you for considering my application. I look forward to hearing from you soon.

Sincerely,
${data.yourName || 'Your Name'}
${data.email || 'email@example.com'}
${data.phone || '+1 234 567 8900'}

---
Generated by SAR Trends AI - Cover Letter Generator`;
}

// Risk Assessment Template
export function getTemplateRiskAssessment(data) {
  return `===============================================
RISK ASSESSMENT
===============================================

Project: ${data.projectName || 'Project Name'}
Location: ${data.location || 'Site Location'}
Date: ${data.date || new Date().toLocaleDateString()}
Assessor: SAR Trends AI
Reference: RA-${Date.now()}

===============================================
1. SCOPE OF WORK
===============================================
${data.scope || 'Scope of work to be assessed'}

===============================================
2. HAZARDS IDENTIFIED
===============================================
${(data.hazards || ['Working at height', 'Electrical hazards', 'Manual handling', 'Slips, trips and falls', 'Machinery and equipment', 'Chemical exposure', 'Noise exposure', 'Confined spaces', 'Fire risk', 'Moving vehicles']).map((h, i) => `${i + 1}. ${h}`).join('\n')}

===============================================
3. RISK MATRIX
===============================================
Severity x Likelihood = Risk Level

SEVERITY:
- 5 = Fatality/Catastrophic
- 4 = Major injury
- 3 = Moderate injury
- 2 = Minor injury
- 1 = Negligible

LIKELIHOOD:
- 5 = Almost Certain
- 4 = Likely
- 3 = Possible
- 2 = Unlikely
- 1 = Rare

===============================================
4. RISK ASSESSMENT TABLE
===============================================
| No | Hazard | Severity | Likelihood | Risk Rating | Controls |
|----|--------|----------|------------|-------------|----------|
| 1 | Working at Height | 4 | 3 | 12 (High) | Fall protection, training |
| 2 | Electrical Hazards | 5 | 2 | 10 (High) | Lockout/tagout, PPE |
| 3 | Manual Handling | 3 | 4 | 12 (High) | Training, mechanical aids |
| 4 | Slips, Trips, Falls | 2 | 4 | 8 (Medium) | Housekeeping, signage |
| 5 | Machinery | 4 | 2 | 8 (Medium) | Guards, training |

===============================================
5. CONTROL MEASURES (Hierarchy of Controls)
===============================================
1. Elimination - Remove hazard completely
2. Substitution - Replace with less hazardous
3. Engineering Controls - Isolation, ventilation
4. Administrative Controls - Training, procedures
5. PPE - Last line of defense

Specific Controls:
• Personal Protective Equipment (PPE) provided
• All staff trained on safe work procedures
• Emergency equipment available
• First aid facilities on site
• Regular safety inspections

===============================================
6. EMERGENCY PROCEDURES
===============================================
• Emergency contact numbers posted
• Evacuation routes identified
• Assembly point designated
• First aid trained personnel on site
• Emergency services contact details

===============================================
7. PPE REQUIREMENTS
===============================================
• Hard hat
• Safety boots
• High visibility vest
• Safety glasses
• Gloves (task-specific)
• Hearing protection (where required)
• Respiratory protection (where required)

===============================================
8. TRAINING REQUIREMENTS
===============================================
• Site induction
• Task-specific training
• Emergency response training
• First aid certification
• Equipment operation certification

===============================================
9. MONITORING AND REVIEW
===============================================
• Daily toolbox talks
• Weekly safety inspections
• Monthly safety audits
• Review after any incident
• Annual comprehensive review

===============================================
SIGN-OFF
===============================================
Prepared By: _________________ Date: _________

Reviewed By: _________________ Date: _________

Approved By: _________________ Date: _________

Next Review Date: ____________

===============================================
Generated by SAR Trends AI - Risk Assessment Generator
===============================================`;
}

// RAMS Template
export function getTemplateRAMS(data) {
  return `===============================================
RISK ASSESSMENT & METHOD STATEMENT (RAMS)
===============================================

Project: ${data.projectName || 'Project Name'}
Client: ${data.client || 'Client Name'}
Location: ${data.location || 'Site Location'}
Date: ${data.date || new Date().toLocaleDateString()}
Reference: RAMS-${Date.now()}

===============================================
PART 1: RISK ASSESSMENT
===============================================

${getTemplateRiskAssessment(data)}

===============================================
PART 2: METHOD STATEMENT
===============================================

1. PROJECT DETAILS
===============================================
• Project Name: ${data.projectName}
• Client: ${data.client}
• Location: ${data.location}
• Start Date: ${data.startDate || 'TBC'}
• Duration: ${data.duration || 'TBC'}

2. SCOPE OF WORKS
===============================================
${data.scope || 'Detailed scope of works to be carried out'}

3. SEQUENCE OF WORKS
===============================================
Step 1: Site Preparation
- Conduct site survey
- Establish welfare facilities
- Set up access points
- Install safety signage

Step 2: Setup and Mobilization
- Deliver materials and equipment
- Set up work areas
- Install temporary services

Step 3: Main Works Execution
- Carry out works as per specification
- Implement control measures
- Monitor progress

Step 4: Quality Control
- Inspect work completed
- Address any defects
- Document completion

Step 5: Handover
- Final inspection
- Documentation
- Client sign-off

4. RESOURCES REQUIRED
===============================================
Manpower:
• Project Manager
• Supervisors
• Skilled operatives
• Labourers

Equipment:
• Tools and equipment as required
• Safety equipment
• Plant and machinery

Materials:
• As per specification
• Safety consumables

5. SAFE WORK PROCEDURES
===============================================
• All work to be carried out in accordance with relevant regulations
• Risk assessments to be reviewed before starting
• PPE to be worn at all times
• Communication protocols established
• Emergency procedures in place

6. TRAFFIC MANAGEMENT
===============================================
• Traffic management plan in place
• Segregated pedestrian/vehicle routes
• Parking restrictions observed
• Delivery times scheduled

7. EMERGENCY PROCEDURES
===============================================
• Emergency contact numbers displayed
• First aiders on site
• Emergency assembly point designated
• Evacuation procedures established
• Accident reporting procedure

8. ENVIRONMENTAL CONTROLS
===============================================
• Waste management plan
• Dust control measures
• Noise control
• Pollution prevention
• Sustainable practices

9. QUALITY CONTROL
===============================================
• Inspection checklists
• Quality standards
• Testing requirements
• Documentation

===============================================
APPENDICES
===============================================

A. PPE REQUIREMENTS
• Hard hat, Safety boots, High-vis
• Task-specific PPE as required

B. TRAINING REQUIREMENTS
• Site induction
• Equipment certification
• Safety training

C. EMERGENCY CONTACTS
• Site Manager: [Contact]
• Emergency Services: 999/112
• First Aid: [Contact]

D. PERMITS REQUIRED
• Permit to Work
• Hot Work Permit (if required)
• Confined Space Permit (if required)

===============================================
SIGN-OFF
===============================================
Prepared By: _________________ Date: _________

Reviewed By: _________________ Date: _________

Approved By: _________________ Date: _________

Client Acceptance: _________________ Date: _________

===============================================
Generated by SAR Trends AI - RAMS Generator
===============================================`;
}

// Method Statement Template
export function getTemplateMethodStatement(data) {
  return `===============================================
METHOD STATEMENT
===============================================

Project: ${data.projectName || 'Project Name'}
Location: ${data.location || 'Location'}
Client: ${data.client || 'Client'}
Date: ${data.date || new Date().toLocaleDateString()}
Reference: MS-${Date.now()}

===============================================
1. PROJECT OVERVIEW
===============================================
${data.scope || 'Project description and overview'}

===============================================
2. SCOPE OF WORKS
===============================================
${data.scope || 'Detailed scope of works'}

===============================================
3. SEQUENCE OF OPERATIONS
===============================================

Phase 1: Preparation
1.1 Site survey and setup
1.2 Establish work areas
1.3 Deliver materials
1.4 Set up equipment

Phase 2: Execution
2.1 [Work activity 1]
2.2 [Work activity 2]
2.3 [Work activity 3]
2.4 [Work activity 4]

Phase 3: Completion
3.1 Quality checks
3.2 Site clearance
3.3 Handover

===============================================
4. RESOURCES REQUIRED
===============================================

Personnel:
• Project Manager
• Site Supervisor
• Skilled Operatives
• Labourers

Equipment:
• [List equipment required]
• [List tools required]

Materials:
• [List materials required]

===============================================
5. PROGRAMME/TIMELINE
===============================================
• Start Date: ${data.startDate || 'TBC'}
• Duration: ${data.duration || 'TBC'}
• Key Milestones: [As applicable]

===============================================
6. SAFE WORK PROCEDURES
===============================================
• All personnel to receive site induction
• Risk assessments to be reviewed
• PPE mandatory in work areas
• Emergency procedures communicated
• Regular toolbox talks

===============================================
7. QUALITY STANDARDS
===============================================
• Works to comply with specifications
• Inspections at defined stages
• Defect correction procedures
• Final inspection and testing

===============================================
8. ENVIRONMENTAL CONSIDERATIONS
===============================================
• Waste management
• Dust and noise control
• Traffic management
• Environmental protection

===============================================
9. EMERGENCY PROCEDURES
===============================================
• Emergency contacts
• Evacuation routes
• First aid provision
• Incident reporting

===============================================
10. PPE REQUIREMENTS
===============================================
[As per risk assessment]

===============================================
11. TRAINING REQUIREMENTS
===============================================
• Site induction
• Task-specific training
• Equipment certification

===============================================
12. MONITORING AND INSPECTION
===============================================
• Daily inspections
• Weekly audits
• Checklist completion

===============================================
13. REFERENCES
===============================================
• Relevant regulations
• Industry standards
• Client specifications

===============================================
APPROVALS
===============================================
Prepared By: _________________ Date: _________

Reviewed By: _________________ Date: _________

Approved By: _________________ Date: _________

===============================================
Generated by SAR Trends AI - Method Statement Generator
===============================================`;
}

// Website Template
export function getTemplateWebsite(data) {
  return `===============================================
WEBSITE CONTENT - ${data.businessName || 'Your Business'}
===============================================

INDUSTRY: ${data.industry || 'General Business'}
Generated: ${new Date().toLocaleDateString()}

===============================================
HOMEPAGE
===============================================

[HERO SECTION]
Headline: Welcome to ${data.businessName}
Subheadline: Your trusted partner for ${data.industry} solutions

[ABOUT SNIPPET]
${data.businessName} is a leading provider of professional services in the ${data.industry} industry. With years of experience and a commitment to excellence, we deliver results that matter.

[SERVICES OVERVIEW]
${(data.services || ['Service 1', 'Service 2', 'Service 3']).map(s => `• ${s}`).join('\n')}

[WHY CHOOSE US]
• Professional Excellence
• Customer-Focused Approach
• Proven Track Record
• Competitive Pricing
• Dedicated Support

===============================================
ABOUT PAGE
===============================================

Our Story:
Founded with a vision to provide exceptional ${data.industry} solutions, ${data.businessName} has grown to become a trusted name in the industry.

Our Mission:
To deliver outstanding services that exceed client expectations while maintaining the highest standards of professionalism.

Our Values:
• Integrity
• Excellence
• Innovation
• Customer Focus

===============================================
SERVICES PAGE
===============================================

${(data.services || ['Service 1', 'Service 2', 'Service 3']).map(s => `
${s.toUpperCase()}
Description of ${s} and how it benefits your business.
`).join('\n')}

===============================================
CONTACT PAGE
===============================================

Get in touch with us:

📧 Email: ${data.email || 'info@business.com'}
📞 Phone: ${data.phone || '+1 234 567 8900'}
📍 Address: ${data.address || '123 Business Street, City, Country'}

[Contact Form Fields]
• Name
• Email
• Phone
• Message

===============================================
SEO ELEMENTS
===============================================

Meta Description:
${data.businessName} - Your trusted ${data.industry} partner. Professional services, competitive pricing, dedicated support. Contact us today!

Target Keywords:
${data.industry}, business services, professional solutions, ${data.services?.join(', ') || 'services'}

===============================================
Generated by SAR Trends AI - Website Builder
===============================================`;
}

// Default template function router
export function getTemplate(type, data) {
  switch (type) {
    case 'resume':
      return getTemplateResume(data);
    case 'cover-letter':
      return getTemplateCoverLetter(data);
    case 'risk-assessment':
      return getTemplateRiskAssessment(data);
    case 'RAMS':
      return getTemplateRAMS(data);
    case 'method-statement':
      return getTemplateMethodStatement(data);
    case 'website':
      return getTemplateWebsite(data);
    default:
      return 'Document generated successfully';
  }
}

// Export all AI functions
export default {
  // Resume functions
  generateResume,
  generateCV,
  optimizeResume,
  getTemplateResume,
  
  // Cover letter functions
  generateCoverLetter,
  generateFollowUpLetter,
  getTemplateCoverLetter,
  
  // HSE functions
  generateRiskAssessment,
  generateRAMS,
  generateMethodStatement,
  generateJSA,
  generateIncidentReport,
  generateFireRiskAssessment,
  generateToolboxTalk,
  getTemplateRiskAssessment,
  getTemplateRAMS,
  getTemplateMethodStatement,
  
  // Website functions
  generateWebsite,
  generateWebsiteCode,
  getTemplateWebsite,
  
  // Business functions
  generateJobDescription,
  generateBusinessProposal,
  generateSOP,
  optimizeLinkedIn,
  
  // Template router
  getTemplate
};

