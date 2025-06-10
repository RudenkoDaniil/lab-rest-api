import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { role } = req.query

    const where: any = {}

    if (role) {
      where.role = String(role)
    }

    const users = await prisma.user.findMany({
      where,
      include: { tasks: true },
      orderBy: { id: 'desc' },
    })

    res.json(users)
  } else if (req.method === 'POST') {
    const { name, email, role } = req.body

    const user = await prisma.user.create({
      data: {
        name,
        email,
        role: role || 'viewer',
      },
    })
    res.json(user)
  } else {
    res.status(405).end()
  }
}
