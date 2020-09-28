import { Request, Response, NextFunction } from "express";

// eslint-disable-next-line consistent-return
export function ignoreFavicon(req: Request, res: Response, next: NextFunction): Response {
  if (req.originalUrl === "/favicon.ico") {
    return res.status(204);
  }

  next();
}
