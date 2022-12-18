import { Request, Response, Router } from "express";
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);

class DefaultRouter {
  public path = "/api/auth/google";
  public router = Router();
  constructor() {
    this.router.post(this.path, this.login);
  }

  public async login(req: Request, res: Response) {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });
    const { name, email, picture } = ticket.getPayload();
    console.log(name);
    // const user = await db.user.upsert({
    //   where: { email: email },
    //   update: { name, picture },
    //   create: { name, email, picture },
    // });
    res.status(201);
    // res.json(user);
  }
}

export default new DefaultRouter().router;
