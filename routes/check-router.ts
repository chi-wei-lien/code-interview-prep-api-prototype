import { Request, Response, Router } from "express";
import checkLogin from "../middleware/check-login";

class CheckRouter {
  public path = "/check";
  public router = Router();
  constructor() {
    this.router.get(this.path, this.checkLoggedIn);
  }

  public checkLoggedIn(req: Request, res: Response) {
    res.status(200);
    if (req.session.user === undefined) {
      res.json({ isLoggedIn: false });
    } else {
      res.json({ isLoggedIn: true });
    }
  }
}

export default new CheckRouter().router;
