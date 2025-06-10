import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (req.method === 'GET') {
    const task = await prisma.task.findUnique({ where: { id: Number(id) } })
    res.json(task)
  } else if (req.method === 'PUT') {
    const { title, status } = req.body
    const task = await prisma.task.update({
      where: { id: Number(id) },
      data: { title, status },
    })
    res.json(task)
  } else if (req.method === 'DELETE') {
    await prisma.task.delete({ where: { id: Number(id) } })
    res.status(204).end()
  } else {
    res.status(405).end()
  }
}
