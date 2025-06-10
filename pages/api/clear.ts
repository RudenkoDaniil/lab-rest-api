import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await prisma.task.deleteMany()
    await prisma.order.deleteMany()
    await prisma.user.deleteMany()

    res.status(200).json({ message: 'All data cleared' })
  } else {
    res.status(405).end()
  }
}
