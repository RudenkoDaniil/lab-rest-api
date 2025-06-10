import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (req.method === 'GET') {
    const order = await prisma.order.findUnique({ where: { id: Number(id) } })
    res.json(order)
  } else if (req.method === 'PUT') {
    const { title, customer, status } = req.body
    const order = await prisma.order.update({
      where: { id: Number(id) },
      data: { title, customer, status },
    })
    res.json(order)
  } else if (req.method === 'DELETE') {
    await prisma.order.delete({ where: { id: Number(id) } })
    res.status(204).end()
  } else {
    res.status(405).end()
  }
}
