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
      include: {
        analyses: {
          select: { id: true, score: true, createdAt: true }
        }
      },
      orderBy: { updatedAt: 'desc' }
    })

    return NextResponse.json(resumes)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch resumes' }, { status: 500 })
  }
}