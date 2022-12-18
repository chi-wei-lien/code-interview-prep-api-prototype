import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

// middleware
import logger from "../middleware/logger";
import bodyParser from "body-parser";

// routers
import DefaultRouter from "../routes/default-router";

class App {
  public server;

  constructor() {
    this.server = express();
    this.middleware();
    this.routes();
  }
  middleware() {
    this.server.use(logger);
    this.server.use(cors());
    this.server.use(bodyParser.urlencoded({ extended: true }));
    this.server.use(bodyParser.json());
  }
  routes() {
    this.server.use(DefaultRouter);
  }
}

export default new App().server;
