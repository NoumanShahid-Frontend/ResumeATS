import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { parseResumeFile } from '@/lib/fileParser';

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
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
    
    // Save resume to database if user is logged in
    let resumeId = null;
    if (session?.user?.id) {
      const savedResume = await prisma.resume.create({
        data: {
          userId: session.user.id,
          fileName: file.name,
          originalName: file.name,
          filePath: 'temp', // In production, save to cloud storage
          fileSize: file.size,
          mimeType: file.type,
          atsScore: score,
          status: 'analyzed',
          feedback: JSON.stringify({
            matches,
            topIssues: [
              `Keyword Match: ${matches.length}/${jobWords.length}`,
              matches.length < 5 ? 'Low keyword density' : 'Good keyword coverage',
              resumeText.length < 500 ? 'Resume too short' : 'Adequate length'
            ]
          })
        }
      });
      resumeId = savedResume.id;
    }
    
    return NextResponse.json({
      score,
      topIssues: [
        `Keyword Match: ${matches.length}/${jobWords.length}`,
        matches.length < 5 ? 'Low keyword density' : 'Good keyword coverage',
        resumeText.length < 500 ? 'Resume too short' : 'Adequate length'
      ],
      resumeText,
      resumeId
    });
  } catch (error) {
    console.error('Upload error:', error);
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