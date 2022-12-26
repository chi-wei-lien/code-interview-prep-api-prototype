import { Request, Response, Router } from "express";
import checkLogin from "../middleware/check-login";
import Status from "../utils/status";

class ApplicationRouter {
  public path = "/status";
  public router = Router();
  constructor() {
    this.router.get(this.path, checkLogin, this.getStatus);
    this.router.post(this.path, checkLogin, this.addStatus);
    this.router.delete(this.path, checkLogin, this.removeStatus);
  }

  public addStatus(req: Request, res: Response) {
    Status.addStatus(req.body.status, req.session.user.id)
      .then((status) => {
        console.log(`add status ${req.body.company}`);
        res.status(201);
        res.json({ message: "Status added successfully" });
      })
      .catch((error) => {
        console.error(error);
        res.status(500);
        res.json({ error: error });
      });
  }

  public getStatus(req: Request, res: Response) {
    Status.getStatus(req.session.user.id)
      .then((statuses) => {
        res.status(200);
        res.json({ statuses });
      })
      .catch((error) => {
        console.error(error);
        res.status(500);
        res.json({ error: error });
      });
  }

  public removeStatus(req: Request, res: Response) {
    Status.removeStatus(req.body.status, req.session.user.id)
      .then(() => {
        console.log(`remove status ${req.body.id}`);
        res.status(201);
        res.json({ message: "Status removed successfully" });
      })
      .catch((error) => {
        console.error(error);
        res.status(500);
        res.json({ error: error });
      });
  }
}

export default new ApplicationRouter().router;
