import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@renewcred.com";

  const existing = await prisma.admin.findUnique({
    where: { email },
  });

  if (existing) {
    console.log("Admin already exists");
    return;
  }

  const password = await bcrypt.hash("Admin@123", 10);

  await prisma.admin.create({
    data: {
      name: "Administrator",
      email,
      password,
    },
  });

  console.log("✅ Admin created successfully");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });