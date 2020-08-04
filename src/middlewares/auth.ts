import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { Token } from "../app";

// eslint-disable-next-line consistent-return
export async function validate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ message: "Não autorizado" });
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2) {
    return res.status(401).send({ message: "Token inválido" });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/iu.test(scheme)) {
    return res.status(401).send({ message: "Token inválido" });
  }

  try {
    const decode = await verify(token, process.env.APP_SECRET);

    req.token = decode as Token;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Falha ao autenticar" });
  }
}
