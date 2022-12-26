import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class Status {
  static async getStatus(userID: number) {
    const statuses = await prisma.appStatus.findMany({
      where: {
        userId: userID,
      },
    });
    return statuses;
  }

  static async addStatus(value: string, userId: number) {
    let appStatus = await prisma.appStatus.findUnique({
      where: {
        appStatusID: {
          value: value,
          userId: userId,
        },
      },
    });

    if (!appStatus) {
      appStatus = await prisma.appStatus.create({
        data: {
          value: value,
          userId: userId,
        },
      });
    }

    return appStatus;
  }

  static async removeStatus(value: string, userId: number) {
    await prisma.appStatus.delete({
      where: {
        appStatusID: {
          value: value,
          userId: userId,
        },
      },
    });
  }
}

export default Status;
