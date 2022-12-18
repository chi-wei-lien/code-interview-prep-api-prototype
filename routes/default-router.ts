import { Request, Response, Router } from "express";

class DefaultRouter {
  public path = "/";
  public router = Router();
  constructor() {
    this.router.get(this.path, this.printHelloWorld);
  }

  public printHelloWorld(req: Request, res: Response) {
    res.send("Hello World");
  }
}

export default new DefaultRouter().router;
