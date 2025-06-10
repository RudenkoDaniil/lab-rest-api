import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { search = '', page = '1', pageSize = '5', status = '' } = req.query

    const skip = (Number(page) - 1) * Number(pageSize)

    const where = {
      AND: [
        { title: { contains: String(search) } },
        status ? { status: String(status) } : {},
      ],
    }

    const orders = await prisma.order.findMany({
      where,
      skip,
      take: Number(pageSize),
      orderBy: { date: 'desc' },
      include: { user: true },
    })

    const total = await prisma.order.count({ where })

    res.json({ orders, total })
  } else if (req.method === 'POST') {
  const { title, customer, status, userId } = req.body

  const order = await prisma.order.create({
    data: {
      title,
      customer,
      status,
      userId: userId || null,
    },
  })

  // Автоматично створюємо Task для userId:
  if (userId) {
    await prisma.task.create({
      data: {
        title: `Proceed order #${order.id}`,
        status: 'new',
        userId: Number(userId),
      },
    })
  }

  res.json(order)
}
 else {
    res.status(405).end()
  }
}
