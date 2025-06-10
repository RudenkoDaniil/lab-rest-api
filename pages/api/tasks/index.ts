import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { userId, dateFrom, dateTo, status } = req.query

    const where: any = {}

    if (userId) {
      where.userId = Number(userId)
    }

    if (status) {
      where.status = String(status)
    }

    if (dateFrom || dateTo) {
      where.createdAt = {}
      if (dateFrom) where.createdAt.gte = new Date(dateFrom as string)
      if (dateTo) where.createdAt.lte = new Date(dateTo as string)
    }

    const tasks = await prisma.task.findMany({
      where,
      orderBy: { id: 'desc' },
      include: { user: true },
    })

    res.json(tasks)
  } else if (req.method === 'POST') {
    const { title, status, userId } = req.body

    const task = await prisma.task.create({
      data: {
        title,
        status,
        userId: userId || null,
      },
    })
    res.json(task)
  } else if (req.method === 'PUT') {
    const { id, status } = req.body
    const task = await prisma.task.update({
      where: { id: Number(id) },
      data: { status },
    })
    res.json(task)
  } else {
    res.status(405).end()
  }
}
