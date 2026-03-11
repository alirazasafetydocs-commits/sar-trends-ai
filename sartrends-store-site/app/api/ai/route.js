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
    const { type, documentType, ...data } = body;
    
    if (!type || !SUPPORTED_TYPES.includes(type)) {
      return NextResponse.json(
        { error: `Invalid document type. Supported: ${SUPPORTED_TYPES.join(', ')}` },
        { status: 400 }
      );
    }
    
    let result = {};
    let content = '';
    let useTemplate = true;
    
    const useAI = !!process.env.OPENAI_API_KEY;
    
    if (useAI) {
      try {
        switch (type) {
          case 'resume':
            content = await generateResume(data);
            break;
          case 'cv':
            content = await generateCV(data);
            break;
          case 'resume-optimize':
            content = await optimizeResume(data);
            break;
          case 'cover-letter':
            content = await generateCoverLetter(data);
            break;
          case 'follow-up-letter':
            content = await generateFollowUpLetter(data);
            break;
          case 'risk-assessment':
            content = await generateRiskAssessment(data);
            break;
          case 'RAMS':
            content = await generateRAMS(data);
            break;
          case 'method-statement':
            content = await generateMethodStatement(data);
            break;
          case 'JSA':
            content = await generateJSA(data);
            break;
          case 'incident-report':
            content = await generateIncidentReport(data);
            break;
          case 'fire-risk-assessment':
            content = await generateFireRiskAssessment(data);
            break;
          case 'toolbox-talk':
            content = await generateToolboxTalk(data);
            break;
          case 'website':
            content = await generateWebsite(data);
            break;
          case 'website-code':
            content = await generateWebsiteCode(data);
            break;
          case 'job-description':
            content = await generateJobDescription(data);
            break;
          case 'business-proposal':
            content = await generateBusinessProposal(data);
            break;
          case 'SOP':
            content = await generateSOP(data);
            break;
          case 'linkedin-optimize':
            content = await optimizeLinkedIn(data);
            break;
          default:
            content = 'Document generated successfully';
        }
        useTemplate = false;
      } catch (aiError) {
        console.error('AI generation failed:', aiError);
        useTemplate = true;
      }
    }
    
    if (useTemplate || !content) {
      content = getTemplate(type, data);
    }
    
    result = buildResult(type, data, content);
    
    return NextResponse.json({ 
      document: result,
      content: content,
      type: type,
      aiGenerated: !useTemplate,
      message: useTemplate ? 'Template generated' : 'AI-generated document'
    });
    
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate document' },
      { status: 500 }
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

