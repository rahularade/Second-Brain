import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client.js'

const connectionString = `${process.env.DATABASE_URL}`
const adapter = new PrismaPg({ connectionString })

declare global {
    var prisma: undefined | PrismaClient
}

const prisma = globalThis.prisma ?? new PrismaClient({adapter})

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma