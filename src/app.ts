import express from "express";

// middleware
import logger from "../middleware/logger";

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
  }
  routes() {
    this.server.use(DefaultRouter);
  }
}

export default new App().server;
