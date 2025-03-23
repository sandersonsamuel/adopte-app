import {PrismaClient} from '../generated/client'

const globalForPrisma = global as unknown as {
  Prisma: PrismaClient
}

export const prisma = globalForPrisma.Prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.Prisma = prisma