import { NextResponse } from 'next/server';
import { generateResume, generateCoverLetter, generateRiskAssessment, generateRAMS, generateMethodStatement, generateWebsite, getTemplateResume, getTemplateCoverLetter, getTemplateRiskAssessment, getTemplateRAMS, getTemplateMethodStatement, getTemplateWebsite } from '@/lib/ai';

// Free trial configuration
const FREE_TRIAL_LIMIT = 3;

// Helper to get trial count from headers
function getTrialCount(request) {
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) return 0;
  
  const match = cookieHeader.match(/trialCount=(\d+)/);
  return match ? parseInt(match[1]) : 0;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { type, documentType } = body;
    
    let result = {};
    let content = '';
    let useTemplate = true;
    
    // Check if OpenAI API key is available
    let useAI = !!process.env.OPENAI_API_KEY;
    
    // Try AI generation if API key exists
    if (useAI) {
      try {
        switch (type) {
          case 'resume':
            content = await generateResume(body);
            useTemplate = false;
            break;
          case 'cover-letter':
            content = await generateCoverLetter(body);
            useTemplate = false;
            break;
          case 'hse':
            if (documentType === ' rams' || documentType === 'RAMS') {
              content = await generateRAMS(body);
            } else if (documentType === 'method-statement') {
              content = await generateMethodStatement(body);
            } else {
              content = await generateRiskAssessment(body);
            }
            useTemplate = false;
            break;
          case 'website':
            content = await generateWebsite(body);
            useTemplate = false;
            break;
        }
      } catch (aiError) {
        console.error('AI generation failed, using template:', aiError);
        useTemplate = true;
      }
    }
    
    // Use templates if no OpenAI or AI failed
    if (useTemplate || !content) {
      switch (type) {
        case 'resume':
          content = getTemplateResume(body);
          break;
        case 'cover-letter':
          content = getTemplateCoverLetter(body);
          break;
        case 'hse':
          if (documentType === ' rams' || documentType === 'RAMS') {
            content = getTemplateRAMS(body);
          } else if (documentType === 'method-statement') {
            content = getTemplateMethodStatement(body);
          } else {
            content = getTemplateRiskAssessment(body);
          }
          break;
        case 'website':
          content = getTemplateWebsite(body);
          break;
        default:
          content = 'Document generated successfully';
      }
    }
    
    // Build result based on type
    if (type === 'resume') {
      result = {
        content: {
          fullName: body.fullName || 'John Doe',
          email: body.email || 'john@example.com',
          phone: body.phone || '+1 234 567 8900',
          summary: body.summary || 'Professional summary here',
          skills: (body.skills || '').split(',').map(s => s.trim()).filter(s => s),
          experience: body.experience || 'Work experience here',
          education: body.education || 'Education here',
          generatedContent: content
        }
      };
    } else if (type === 'cover-letter') {
      result = {
        content: {
          position: body.position || 'Position',
          company: body.company || 'Company',
          manager: body.manager || 'Hiring Manager',
          yourName: body.yourName || 'Applicant',
          generatedContent: content
        }
      };
    } else if (type === 'hse') {
      result = {
        content: {
          documentType: documentType || 'risk-assessment',
          projectName: body.projectName || 'Project',
          scope: body.scope || 'Scope of work',
          hazards: body.hazards || ['Hazard 1', 'Hazard 2'],
          controls: body.controls || ['Control 1', 'Control 2'],
          date: new Date().toISOString().split('T')[0],
          generatedContent: content
        }
      };
    } else if (type === 'website') {
      result = {
        content: {
          businessName: body.businessName || 'Business',
          industry: body.industry || 'Industry',
          services: body.services || ['Service 1', 'Service 2'],
          email: body.email || 'info@business.com',
          phone: body.phone || '+1 234 567 8900',
          address: body.address || '123 Business St',
          generatedContent: content
        }
      };
    }
    
    return NextResponse.json({ 
      document: result,
      trialUsed: true,
      message: 'Document generated successfully'
    });
    
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate document' },
      { status: 500 }
    );
  }
}

// Get trial status
export async function GET(request) {
  const trialCount = getTrialCount(request);
  const remaining = Math.max(0, FREE_TRIAL_LIMIT - trialCount);
  
  return NextResponse.json({
    trialLimit: FREE_TRIAL_LIMIT,
    trialUsed: trialCount,
    trialRemaining: remaining,
    hasTrialLeft: remaining > 0
  });
}

