import { PrismaClient } from "@prisma/client"

// This prevents TypeScript errors when declaring a global variable.
declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

// This pattern prevents creating new PrismaClient instances on every hot reload
// in development, which can exhaust database connections.
const db =
  globalThis.prisma ??
  new PrismaClient()

if (process.env.NODE_ENV !== "production") globalThis.prisma = db

export default db