import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const mockStats = {
      totalResumes: 12,
      avgAtsScore: 84,
      applications: 47,
      interviewRate: 23
    };

    return NextResponse.json(mockStats);
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}