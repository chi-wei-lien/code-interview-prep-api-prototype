import { Request, Response, Router } from "express";
const { OAuth2Client } = require("google-auth-library");
import { PrismaClient } from "@prisma/client";

const client = new OAuth2Client(process.env.CLIENT_ID);
const prisma = new PrismaClient();

class DefaultRouter {
  public path = "/api/auth/google";
  public router = Router();
  constructor() {
    this.router.post(this.path, this.login);
  }

  async login(req: Request, res: Response) {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });
    const { name, email, picture } = ticket.getPayload();
    DefaultRouter.upsertUser(name, email, picture)
      .then((user) => {
        console.log(`upset user ${user.name}`);
      })
      .catch((error) => {
        console.error(error);
      });

    res.status(201);
    // res.json(user);
  }

  static async upsertUser(name: string, email: string, picture: string) {
    const user = await prisma.user.upsert({
      where: { email: email },
      update: { name, picture },
      create: { name, email, picture },
    });
    return user;
  }
}

export default new DefaultRouter().router;
