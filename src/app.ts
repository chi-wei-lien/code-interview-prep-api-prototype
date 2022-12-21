import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import User from "../utils/user";

// middleware
import logger from "../middleware/logger";
import bodyParser from "body-parser";
import session from "express-session";

// routers
import DefaultRouter from "../routes/default-router";
import AdminRouter from "../routes/admin-router";
import googleLoginRouter from "../routes/google-login-router";
import applicationRouter from "../routes/application-router";
import codeChallengeRouter from "../routes/code-challenge-router";

declare module "express-session" {
  interface SessionData {
    user: User;
  }
}

class App {
  public server;

  constructor() {
    this.server = express();
    this.middleware();
    this.routes();
  }
  middleware() {
    this.server.use(
      cors({
        origin: "http://localhost:3000",
        credentials: true,
      })
    );
    this.server.use(cookieParser());
    this.server.use(
      session({
        name: "ssid",
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: process.env.NODE_ENV === "production" },
      })
    );
    this.server.use(bodyParser.urlencoded({ extended: true }));
    this.server.use(bodyParser.json());
    this.server.use(logger);
  }
  routes() {
    this.server.use(DefaultRouter);
    this.server.use(AdminRouter);
    this.server.use(googleLoginRouter);
    this.server.use(applicationRouter);
    this.server.use(codeChallengeRouter);
  }
}

export default new App().server;
