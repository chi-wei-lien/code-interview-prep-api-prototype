import { Request, Response, Router } from "express";
import checkLogin from "../middleware/check-login";
import Application from "../utils/application";

class ApplicationRouter {
  public path = "/application";
  public router = Router();
  constructor() {
    this.router.get(this.path, checkLogin, this.getApplications);
    this.router.post(this.path, checkLogin, this.addApplication);
    this.router.patch(this.path, checkLogin, this.updateApplication);
    this.router.delete(this.path, checkLogin, this.removeApplication);
  }

  public addApplication(req: Request, res: Response) {
    const email = req.session.user.email;
    const createdAt = new Date(req.body.createdAt);
    Application.addApplication(
      req.body.company,
      req.body.companyURL,
      createdAt,
      req.body.role,
      email
    )
      .then((user) => {
        console.log(`add application ${req.body.company}`);
        res.status(201);
        res.json({ message: "Application added successfully" });
      })
      .catch((error) => {
        console.error(error);
        res.status(500);
        res.json({ error: error });
      });
  }

  public getApplications(req: Request, res: Response) {
    console.log("start fetching");
    const userID = req.session.user.id;
    Application.getApplications(userID)
      .then((applications) => {
        console.log("get all applications");
        res.status(200);
        res.json({ applications });
      })
      .catch((error) => {
        console.error(error);
        res.status(500);
        res.json({ error: error });
      });
  }

  public updateApplication(req: Request, res: Response) {
    Application.updateApplication(
      req.body.company,
      req.body.companyURL,
      new Date(req.body.createdAt),
      req.body.role,
      req.body.id,
      req.session.user.id
    )
      .then(() => {
        console.log(`update application ${req.body.id}`);
        res.status(201);
        res.json({ message: "Application updated successfully" });
      })
      .catch((error) => {
        console.error(error);
        res.status(500);
        res.json({ error: error });
      });
  }

  public removeApplication(req: Request, res: Response) {
    Application.removeApplication(req.body.id, req.session.user.id)
      .then(() => {
        console.log(`remove application ${req.body.id}`);
        res.status(201);
        res.json({ message: "Application removed successfully" });
      })
      .catch((error) => {
        console.error(error);
        res.status(500);
        res.json({ error: error });
      });
  }
}

export default new ApplicationRouter().router;
