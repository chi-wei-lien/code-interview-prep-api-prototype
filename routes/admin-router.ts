import { Request, Response, Router } from "express";
import checkLogin from "../middleware/check-login";

class AdminRouter {
  public path = "/admin";
  public router = Router();
  constructor() {
    this.router.get(this.path, checkLogin, this.printHelloWorld);
  }

  public printHelloWorld(req: Request, res: Response) {
    res.status(200).json({ messagge: "hi admin" });
  }
}

export default new AdminRouter().router;
