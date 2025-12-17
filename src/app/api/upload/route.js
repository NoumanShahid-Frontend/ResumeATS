import { NextResponse } from 'next/server';
import { parseResumeFile } from '@/lib/fileParser';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('resume');
    const jobDescription = formData.get('jobDescription');
    
    if (!file || !jobDescription) {
      return NextResponse.json(
        { error: 'Resume file and job description are required' },
        { status: 400 }
      );
    }

    const resumeText = await parseResumeFile(file);
    
    // Basic score for free scan
    const resumeWords = extractKeywords(resumeText.toLowerCase());
    const jobWords = extractKeywords(jobDescription.toLowerCase());
    const matches = resumeWords.filter(word => jobWords.includes(word));
    const score = Math.min(100, Math.round((matches.length / jobWords.length) * 100));
    
    return NextResponse.json({
      score,
      topIssues: [
        `Keyword Match: ${matches.length}/${jobWords.length}`,
        matches.length < 5 ? 'Low keyword density' : 'Good keyword coverage',
        resumeText.length < 500 ? 'Resume too short' : 'Adequate length'
      ],
      resumeText // Store for detailed analysis
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process resume' },
      { status: 500 }
    );
  }
}

function extractKeywords(text) {
  const commonWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];
  return text
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2 && !commonWords.includes(word))
    .filter((word, index, arr) => arr.indexOf(word) === index);
}