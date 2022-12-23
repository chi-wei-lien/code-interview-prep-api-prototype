import { Request, Response, Router } from "express";
import checkLogin from "../middleware/check-login";
import CodeChallenge from "../utils/code-challenge";

class CodeChallengeRouter {
  public path = "/code-challenge";
  public router = Router();
  constructor() {
    this.router.get(this.path, checkLogin, this.getCodeChallenges);
    this.router.post(this.path, checkLogin, this.addCodeChallenge);
    this.router.patch(this.path, checkLogin, this.updateCodeChallenge);
    this.router.delete(this.path, checkLogin, this.removeCodeChallenge);
  }

  public addCodeChallenge(req: Request, res: Response) {
    const email = req.session.user.email;
    const createdAt = new Date(req.body.createdAt);
    CodeChallenge.addCodeChallenge(
      req.body.challenge,
      req.body.challengeURL,
      createdAt,
      email
    )
      .then((user) => {
        console.log(`add code challenge ${req.body.challenge}`);
        res.status(201);
        res.json({ message: "Code Challenge added successfully" });
      })
      .catch((error) => {
        console.error(error);
        res.status(500);
        res.json({ error: error });
      });
  }

  public getCodeChallenges(req: Request, res: Response) {
    const userID = req.session.user.id;
    CodeChallenge.getCodeChallenges(userID)
      .then((challenges) => {
        res.status(200);
        res.json({ challenges });
      })
      .catch((error) => {
        console.error(error);
        res.status(500);
        res.json({ error: error });
      });
  }

  public updateCodeChallenge(req: Request, res: Response) {
    CodeChallenge.updateCodeChallenge(
      req.body.challenge,
      req.body.challengeURL,
      new Date(req.body.createdAt),
      req.body.id,
      req.session.user.id
    )
      .then(() => {
        console.log(`update code challenge ${req.body.id}`);
        res.status(201);
        res.json({ message: "Code challenge updated successfully" });
      })
      .catch((error) => {
        console.error(error);
        res.status(500);
        res.json({ error: error });
      });
  }

  public removeCodeChallenge(req: Request, res: Response) {
    CodeChallenge.removeCodeChallenge(req.body.id, req.session.user.id)
      .then(() => {
        console.log(`remove code challenge ${req.body.id}`);
        res.status(201);
        res.json({ message: "Code challenge removed successfully" });
      })
      .catch((error) => {
        console.error(error);
        res.status(500);
        res.json({ error: error });
      });
  }
}

export default new CodeChallengeRouter().router;
