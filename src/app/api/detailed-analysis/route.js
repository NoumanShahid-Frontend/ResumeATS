import { NextResponse } from 'next/server';
import { generateDetailedATSAnalysis } from '@/lib/enhancedATS';

export async function POST(request) {
  try {
    const { resumeText, jobDescription } = await request.json();
    
    if (!resumeText || !jobDescription) {
      return NextResponse.json(
        { error: 'Resume text and job description are required' },
        { status: 400 }
      );
    }

    const analysis = generateDetailedATSAnalysis(resumeText, jobDescription);
    
    return NextResponse.json(analysis);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate detailed analysis' },
      { status: 500 }
    );
  }
}