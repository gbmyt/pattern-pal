import { PrismaClient } from "@prisma/client"

// Dont use global stuff that doesn't actually exist
declare global {
    // eslint-disable-next-line no-var
    var cachedPrisma: PrismaClient
}

let prisma: PrismaClient

if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient()
} else {
    if (!global.cachedPrisma) {
        global.cachedPrisma = new PrismaClient()
    }

    // if cache exists, use the cached client
    prisma = global.cachedPrisma
}

export const db = prisma
