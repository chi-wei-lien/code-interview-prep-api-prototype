import { Request, Response, Router } from "express";
import checkLogin from "../middleware/check-login";

class AdminRouter {
  public path = "/admin";
  public router = Router();
  constructor() {
    this.router.get(this.path, checkLogin, this.printHelloWorld);
  }

  public printHelloWorld(req: Request, res: Response) {
    res.send("yah");
  }
}

export default new AdminRouter().router;
