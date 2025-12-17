import { NextResponse } from 'next/server';
import { calculateATSScore } from '@/lib/atsLogic';

export async function POST(request) {
  try {
    const { resumeText, jobDescription } = await request.json();
    
    if (!resumeText || !jobDescription) {
      return NextResponse.json(
        { error: 'Resume text and job description are required' },
        { status: 400 }
      );
    }

    const result = calculateATSScore(resumeText, jobDescription);
    
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to analyze resume' },
      { status: 500 }
    );
  }
}