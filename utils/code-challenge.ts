import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class CodeChallenge {
  static async getCodeChallenges(email: string) {
    const codeChallenges = await prisma.codeChallenge.findMany({
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
      where: {
        userId: (await prisma.user.findUnique({ where: { email: email } })).id,
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
    email: string,
    id: number
  ) {
    const user = await prisma.codeChallenge.update({
      where: { id: id },
      data: {
        challenge,
        challengeURL,
        createdAt,
      },
    });
    return user;
  }
}

export default CodeChallenge;
