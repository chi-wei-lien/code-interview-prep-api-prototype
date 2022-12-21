import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class CodeChallenge {
  static async getCodeChallenges(userID: number) {
    const codeChallenges = await prisma.codeChallenge.findMany({
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
      where: {
        userId: userID,
      },
    });
    return codeChallenges;
  }

  static async addCodeChallenge(
    challenge: string,
    challengeURL: string,
    createdAt: Date,
    email: string
  ) {
    const user = await prisma.user.update({
      where: { email: email },
      data: {
        codeChallenge: {
          create: [
            {
              challenge,
              challengeURL,
              createdAt,
            },
          ],
        },
      },
    });

    return user;
  }

  static async updateCodeChallenge(
    challenge: string,
    challengeURL: string,
    createdAt: Date,
    id: number,
    userID: number
  ) {
    const application = await prisma.codeChallenge.update({
      where: {
        challengeUserID: {
          id: id,
          userId: userID,
        },
      },
      data: {
        challenge,
        challengeURL,
        createdAt,
      },
    });
    return application;
  }

  static async removeCodeChallenge(id: number, userID: number) {
    await prisma.codeChallenge.delete({
      where: {
        challengeUserID: {
          id: id,
          userId: userID,
        },
      },
    });
  }
}

export default CodeChallenge;
