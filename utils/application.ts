import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class Application {
  static async getApplications(email: string) {
    const applications = await prisma.application.findMany({
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
      where: {
        userId: (await prisma.user.findUnique({ where: { email: email } })).id,
      },
    });
    return applications;
  }

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
              companyURL: comapnyURL,
              createdAt: createdAt,
              role: role,
            },
          ],
        },
      },
    });

    return user;
  }

  static async updateApplication(
    company: string,
    comapnyURL: string,
    createdAt: Date,
    role: string,
    id: number
  ) {
    const user = await prisma.application.update({
      where: { id: id },
      data: {
        company: company,
        companyURL: comapnyURL,
        createdAt: createdAt,
        role: role,
      },
    });

    return user;
  }
}

export default Application;
