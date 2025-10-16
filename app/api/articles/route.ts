
export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      where: {
        published: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(articles)
  } catch (error) {
    console.error('Error fetching articles:', error)
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 })
  }
}
