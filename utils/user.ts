import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class User {
  email: string = "";
  name: string = "";
  picture: string = "";
  id: number;

  static async upsertUser(name: string, email: string, picture: string) {
    const user = await prisma.user.upsert({
      where: { email: email },
      update: { name, picture },
      create: { name, email, picture },
    });
    return user;
  }
}

export default User;
