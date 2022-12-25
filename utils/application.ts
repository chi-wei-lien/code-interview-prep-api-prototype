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
    userId: number
  ) {
    let appStatus = await prisma.appStatus.findUnique({
      where: {
        appStatusID: {
          value: "applied",
          userId: userId,
        },
      },
    });

    if (!appStatus) {
      appStatus = await prisma.appStatus.create({
        data: {
          value: "applied",
          userId: userId,
        },
      });
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        applications: {
          create: [
            {
              company: company,
              companyURL: comapnyURL,
              createdAt: createdAt,
              role: role,
              statusId: appStatus.id,
              statusValue: appStatus.value,
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
    status: string,
    userId: number
  ) {
    let appStatus = await prisma.appStatus.findUnique({
      where: {
        appStatusID: {
          value: status,
          userId: userId,
        },
      },
    });

    if (!appStatus) {
      appStatus = await prisma.appStatus.create({
        data: {
          value: status,
          userId: userId,
        },
      });
    }

    const application = await prisma.application.update({
      where: {
        appUserID: {
          id: id,
          userId: userId,
        },
      },
      data: {
        company: company,
        companyURL: companyURL,
        createdAt: createdAt,
        role: role,
        statusId: appStatus.id,
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
