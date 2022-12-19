import { Request, Response, Router } from "express";
import checkLogin from "../middleware/check-login";
import Application from "../utils/application";

class ApplicationRouter {
  public path = "/application";
  public router = Router();
  constructor() {
    this.router.post(this.path, checkLogin, this.addApplication);
  }

  public addApplication(req: Request, res: Response) {
    console.log("called");
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
}

export default new ApplicationRouter().router;
