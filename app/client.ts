import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log:
      // NODE_ENV
      process.env.NODE_ENV === "production"
        ? ["error"]
        : ["query", "info", "warn"],
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
