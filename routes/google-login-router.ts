import { Request, Response, Router } from "express";
const { OAuth2Client } = require("google-auth-library");
import User from "../utils/user";

const client = new OAuth2Client(process.env.CLIENT_ID);

class DefaultRouter {
  public path = "/api/auth/google";
  public router = Router();
  constructor() {
    this.router.post(this.path, this.login);
    this.router.post(`${this.path}/logout`, this.logout);
  }

  async login(req: Request, res: Response) {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });
    const { name, email, picture } = ticket.getPayload();
    User.upsertUser(name, email, picture)
      .then((user) => {
        console.log(`upset user ${user.name}`);
        req.session.user = user;
        res.status(201);
        res.json({ message: "Logged in successfully" });
      })
      .catch((error) => {
        console.error(error);
        res.status(500);
        res.json({ error: error });
      });
  }

  async logout(req: Request, res: Response) {
    await req.session.destroy((error) => {
      if (error) {
        console.error(error);
        res.status(403);
        res.json({ error: error });
      } else {
        res.status(200);
        res.json({
          message: "Logged out successfully",
        });
      }
    });
  }
}

export default new DefaultRouter().router;
