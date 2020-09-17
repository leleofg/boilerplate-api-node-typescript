import { Login } from "../interfaces/User";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { compare } from "bcrypt";
import { UserRepository } from "../repositories/UserRepository";
import Sentry from "../integrations/sentry";

export async function login(req: Request, res: Response) {
  try {
    const { email, password }: Login = req.body;

    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOneOrFail({
      select: ["id", "name", "password", "email", "birthDate", "phone"],
      where: { deletedAt: null, email },
    });

    if (!(await compare(password, user.password))) {
      return res.status(404).json({ message: "Usuário ou senha inválidos" });
    }

    const token = await sign({ userId: user.id }, process.env.APP_SECRET, {
      expiresIn: "5d",
    });

    delete user.password;

    return res.json({ token, user });
  } catch (error) {
    Sentry.captureException(error);
    return res.status(500).json({ message: "Erro ao autenticar" });
  }
}
