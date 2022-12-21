import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class Application {
  static async getApplications(userID: number) {
    const applications = await prisma.application.findMany({
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
      where: {
        userId: userID,
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
    companyURL: string,
    createdAt: Date,
    role: string,
    id: number,
    userID: number
  ) {
    const application = await prisma.application.update({
      where: {
        appUserID: {
          id: id,
          userId: userID,
        },
      },
      data: {
        company: company,
        companyURL: companyURL,
        createdAt: createdAt,
        role: role,
      },
    });
    return application;
  }

  static async removeApplication(id: number, userID: number) {
    await prisma.application.delete({
      where: {
        appUserID: {
          id: id,
          userId: userID,
        },
      },
    });
  }
}

export default Application;
