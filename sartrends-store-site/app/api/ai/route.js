import { NextResponse } from 'next/server';
import { 
  generateResume, 
  generateCV, 
  optimizeResume,
  generateCoverLetter, 
  generateFollowUpLetter,
  generateRiskAssessment, 
  generateRAMS, 
  generateMethodStatement, 
  generateJSA,
  generateIncidentReport,
  generateFireRiskAssessment,
  generateToolboxTalk,
  generateWebsite, 
  generateWebsiteCode,
  generateJobDescription,
  generateBusinessProposal,
  generateSOP,
  optimizeLinkedIn,
  getTemplate
} from '@/lib/ai';

// Free trial configuration
const FREE_TRIAL_LIMIT = 3;

// Helper to get trial count from headers
function getTrialCount(request) {
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) return 0;
  
  const match = cookieHeader.match(/trialCount=(\d+)/);
  return match ? parseInt(match[1]) : 0;
}

// Supported document types
const SUPPORTED_TYPES = [
  'resume',
  'cv',
  'resume-optimize',
  'cover-letter',
  'follow-up-letter',
  'risk-assessment',
  'RAMS',
  'method-statement',
  'JSA',
  'incident-report',
  'fire-risk-assessment',
  'toolbox-talk',
  'website',
  'website-code',
  'job-description',
  'business-proposal',
  'SOP',
  'linkedin-optimize'
];

export async function POST(request) {
  try {
    const body = await request.json();
    const { type } = body;
    
    // Proxy to backend
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
    const backendResponse = await fetch(`${backendUrl}/api/ai/${type}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    
    if (!backendResponse.ok) {
      const error = await backendResponse.json();
      return NextResponse.json(error, { status: backendResponse.status });
    }
    
    const backendData = await backendResponse.json();
    
    return NextResponse.json(backendData);
    
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Backend unavailable. Please try later.' },
      { status: 503 }
    );
  }
}

function buildResult(type, data, content) {
  const baseContent = { generatedContent: content };
  
  switch (type) {
    case 'resume':
    case 'cv':
      return {
        content: {
          fullName: data.fullName || 'John Doe',
          email: data.email || 'john@example.com',
          phone: data.phone || '+1 234 567 8900',
          summary: data.summary || 'Professional summary',
          skills: (data.skills || '').split(',').map(s => s.trim()).filter(s => s),
          experience: data.experience || 'Work experience',
          education: data.education || 'Education',
          ...baseContent
        }
      };
    case 'cover-letter':
    case 'follow-up-letter':
      return {
        content: {
          position: data.position || 'Position',
          company: data.company || 'Company',
          manager: data.manager || 'Hiring Manager',
          yourName: data.yourName || 'Applicant',
          ...baseContent
        }
      };
    case 'website':
    case 'website-code':
      return {
        content: {
          businessName: data.businessName || 'Business',
          industry: data.industry || 'Industry',
          services: (data.services || []).join(', '),
          email: data.email || 'info@business.com',
          ...baseContent
        }
      };
    default:
      return { content: baseContent };
  }
}

export async function GET(request) {
  const trialCount = getTrialCount(request);
  const remaining = Math.max(0, FREE_TRIAL_LIMIT - trialCount);
  
  return NextResponse.json({
    trialLimit: FREE_TRIAL_LIMIT,
    trialUsed: trialCount,
    trialRemaining: remaining,
    hasTrialLeft: remaining > 0,
    supportedTypes: SUPPORTED_TYPES
  });
}

