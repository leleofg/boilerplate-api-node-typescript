import express, { json, urlencoded } from "express";
import cors from "cors";
import routes from "./routes";
import morgan from "morgan";
import { ignoreFavicon } from "./middlewares/ignoreFavicon";

export interface Token {
  userId: string;
  iat: number;
  exp: number;
}

declare global {
  namespace Express {
    interface Request {
      token: Token;
    }
  }
}

class App {
  public express: express.Application;

  public constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.express.use(json());
    this.express.use(urlencoded({ extended: true }));
    this.express.use(morgan("dev"));
    this.express.use(cors());
    this.express.use(ignoreFavicon);
  }

  private routes(): void {
    this.express.use(routes);
  }
}

export default new App().express;
