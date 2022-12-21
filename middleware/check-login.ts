import { Request, Response, NextFunction } from "express";

const checkLogin = async (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user === undefined) {
    res.status(403);
    res.json({ message: "not logged in" });
  } else {
    next();
  }
};

export default checkLogin;
