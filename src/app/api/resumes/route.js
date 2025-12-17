import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const resumes = await prisma.resume.findMany({
      where: { userId: session.user.id },
      orderBy: { updatedAt: 'desc' }
    })

    return NextResponse.json(resumes.map(resume => ({
      id: resume.id,
      title: resume.originalName,
      fileName: resume.fileName,
      atsScore: resume.atsScore,
      status: resume.status,
      createdAt: resume.createdAt,
      updatedAt: resume.updatedAt,
      tags: resume.keywords ? resume.keywords.split(',') : []
    })))
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch resumes' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Mock ATS analysis
    const atsScore = Math.floor(Math.random() * 40) + 60;
    
    const mockResume = {
      id: Date.now().toString(),
      fileName: `${Date.now()}-${file.name}`,
      originalName: file.name,
      filePath: `/uploads/${Date.now()}-${file.name}`,
      fileSize: file.size,
      mimeType: file.type,
      atsScore,
      status: 'analyzed',
      feedback: 'Resume analyzed successfully. Your resume shows good structure and relevant keywords.',
      keywords: 'JavaScript, React, Node.js, Python, SQL, Git',
      suggestions: 'Consider adding more quantified achievements and industry-specific keywords to improve your ATS score.',
      createdAt: new Date().toISOString()
    };

    return NextResponse.json(mockResume);
  } catch (error) {
    console.error('Error uploading resume:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}