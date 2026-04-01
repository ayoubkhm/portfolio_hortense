import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const admins = [
    {
      email: "hortense.deruidiaz@gmail.com",
      name: "Hortense",
      password: "dVmXtBKkOB4kbDb3",
    },
    {
      email: "khamassi1995@gmail.com",
      name: "Ayoub",
      password: "xnYjEoGP66IS2cm1",
    },
  ];

  for (const admin of admins) {
    const hashedPassword = await bcrypt.hash(admin.password, 10);
    await prisma.admin.upsert({
      where: { email: admin.email },
      update: { password: hashedPassword, name: admin.name },
      create: {
        email: admin.email,
        password: hashedPassword,
        name: admin.name,
      },
    });
    console.log(`Admin créé: ${admin.email} — mdp: ${admin.password}`);
  }

  console.log("\nSeed terminé.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
