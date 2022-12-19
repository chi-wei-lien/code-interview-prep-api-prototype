import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class Application {
  static async addApplication(
    company: string,
    comapnyURL: string,
    createdAt: Date,
    role: string,
    email: string
  ) {
    const user = await prisma.user.update({
      where: { email: email },
      data: {
        applications: {
          create: [
            {
              company: company,
              comapnyURL: comapnyURL,
              createdAt: createdAt,
              role: role,
            },
          ],
        },
      },
    });

    return user;
  }
}

export default Application;
