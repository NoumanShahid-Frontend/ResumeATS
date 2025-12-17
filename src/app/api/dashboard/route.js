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

    const userId = session.user.id

    // Get user stats
    const [totalResumes, totalAnalyses, recentAnalyses] = await Promise.all([
      prisma.resume.count({ where: { userId } }),
      prisma.analysis.count({ where: { userId } }),
      prisma.analysis.findMany({
        where: { userId },
        include: { resume: true },
        orderBy: { createdAt: 'desc' },
        take: 5
      })
    ])

    // Calculate average score
    const analyses = await prisma.analysis.findMany({
      where: { userId },
      select: { score: true }
    })
    
    const averageScore = analyses.length > 0 
      ? Math.round(analyses.reduce((sum, a) => sum + a.score, 0) / analyses.length)
      : 0

    return NextResponse.json({
      totalResumes,
      totalScans: totalAnalyses,
      averageScore,
      recentAnalyses: recentAnalyses.map(analysis => ({
        resumeTitle: analysis.resume.title,
        score: analysis.score,
        date: analysis.createdAt.toLocaleDateString()
      }))
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 })
  }
}