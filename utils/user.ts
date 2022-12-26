import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class User {
  email: string = "";
  name: string = "";
  picture: string = "";
  id: number;
  createdAt?: Date;

  static async upsertUser(name: string, email: string, picture: string) {
    const user = await prisma.user.upsert({
      where: { email: email },
      update: { name, picture },
      create: { name, email, picture },
    });

    await prisma.appStatus.createMany({
      data: [
        {
          value: "applied",
          color: "d9f99d",
          userId: user.id,
        },
        {
          value: "rejected",
          color: "fecaca",
          userId: user.id,
        },
      ],
      skipDuplicates: true,
    });

    return user;
  }
}

export default User;
