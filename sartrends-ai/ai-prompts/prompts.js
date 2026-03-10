// AI Prompt Templates for SAR Trends

module.exports = {
  // Resume prompts
  resume: {
    system: `You are a professional resume writer. Create ATS-optimized resumes that:
- Use clear, simple formatting
- Include relevant keywords
- Highlight achievements and quantifiable results
- Follow industry best practices`,
    
    generate: (data) => `Create a professional resume for:
Name: ${data.fullName}
Email: ${data.email}
Phone: ${data.phone}
Summary: ${data.summary}
Skills: ${data.skills}
Experience: ${JSON.stringify(data.experience)}
Education: ${JSON.stringify(data.education)}`
  },

  // Cover letter prompts
  coverLetter: {
    system: `You are a professional cover letter writer. Create compelling cover letters that:
- Capture the reader's attention
- Highlight relevant qualifications
- Show enthusiasm for the role
- Follow professional formatting`,
    
    generate: (data) => `Write a cover letter for:
Position: ${data.position}
Company: ${data.company}
Hiring Manager: ${data.manager}
Applicant: ${data.yourName}
Qualifications: ${data.yourQualifications}`
  },

  // HSE Document prompts
  hse: {
    riskAssessment: {
      system: `You are a health and safety expert. Create comprehensive risk assessments that:
- Follow ISO 45001 standards
- Include hazard identification
- Use risk matrix methodology
- Provide practical control measures`,
      
      generate: (data) => `Create a risk assessment for:
Project: ${data.projectName}
Scope: ${data.scope}
Hazards: ${data.hazards}
Controls: ${data.controls}`
    },

    rams: {
      system: `You are a health and safety expert. Create comprehensive RAMS (Risk Assessment and Method Statement) documents that:
- Follow international HSE standards
- Include both risk assessment and method statements
- Provide detailed work procedures
- Include emergency procedures`,
      
      generate: (data) => `Create a RAMS document for:
Project: ${data.projectName}
Scope: ${data.scope}`
    },

    methodStatement: {
      system: `You are a construction/engineering expert. Create detailed method statements that:
- Follow construction industry standards
- Include step-by-step procedures
- Specify resource requirements
- Include quality standards`,
      
      generate: (data) => `Create a method statement for:
Project: ${data.projectName}
Scope: ${data.scope}`
    }
  },

  // Website prompts
  website: {
    system: `You are a web designer and content writer. Create website content that:
- Is engaging and professional
- Uses modern design principles
- Is SEO-optimized
- Converts visitors to customers`,
    
    generate: (data) => `Create website content for:
Business: ${data.businessName}
Industry: ${data.industry}
Services: ${data.services}
Style: ${data.brandStyle}`
  }
};

