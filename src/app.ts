import express from "express";
import DefaultRouter from "../routes/default-router";

class App {
  public server;

  constructor() {
    this.server = express();
    // this.middlewares();
    this.routes();
  }
  middleware() {}
  routes() {
    this.server.use(DefaultRouter);
  }
}

export default new App().server;
