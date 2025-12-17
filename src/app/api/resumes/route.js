import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const mockResumes = [
      {
        id: '1',
        fileName: 'software-engineer-resume.pdf',
        originalName: 'Software Engineer Resume.pdf',
        atsScore: 85,
        status: 'Optimized',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '2',
        fileName: 'product-manager-resume.pdf',
        originalName: 'Product Manager Resume.pdf',
        atsScore: 72,
        status: 'Needs Work',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '3',
        fileName: 'data-scientist-resume.pdf',
        originalName: 'Data Scientist Resume.pdf',
        atsScore: 91,
        status: 'Excellent',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];

    return NextResponse.json(mockResumes);
  } catch (error) {
    console.error('Error fetching resumes:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
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