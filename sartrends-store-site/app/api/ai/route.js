import { NextResponse } from 'next/server';

export async function POST(request) {
  const body = await request.json();
  const { type } = body;
  
  let result = {};
  
  if (type === 'resume') {
    result = {
      content: {
        fullName: body.fullName || 'John Doe',
        email: body.email || 'john@example.com',
        phone: body.phone || '+1 234 567 8900',
        summary: body.summary || 'Professional summary here',
        skills: (body.skills || '').split(',').map(s => s.trim()).filter(s => s),
        experience: body.experience || 'Work experience here',
        education: body.education || 'Education here'
      }
    };
  } else if (type === 'cover-letter') {
    result = {
      content: {
        position: body.position || 'Position',
        company: body.company || 'Company',
        content: `Dear Hiring Manager,\n\nI am writing to express my interest in the ${body.position} position at ${body.company}.\n\n${body.yourQualifications || 'I am qualified for this role.'}\n\nSincerely,\n${body.yourName || 'Applicant'}`
      }
    };
  } else if (type === 'hse') {
    result = {
      content: {
        projectName: body.projectName || 'Project',
        scope: body.scope || 'Scope of work',
        hazards: body.hazards || ['Hazard 1', 'Hazard 2'],
        controls: body.controls || ['Control 1', 'Control 2'],
        date: new Date().toISOString().split('T')[0]
      }
    };
  } else if (type === 'website') {
    result = {
      content: {
        businessName: body.businessName || 'Business',
        industry: body.industry || 'Industry',
        pages: [
          { name: 'Home', content: `Welcome to ${body.businessName}` },
          { name: 'Services', content: 'Our services...' },
          { name: 'Contact', content: 'Contact us...' }
        ]
      }
    };
  }
  
  return NextResponse.json({ document: result });
}

