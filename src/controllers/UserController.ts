import { CreateUser, UpdateUser } from "../interfaces/User";
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";
import Sentry from "../integrations/sentry";

export async function getUsers(req: Request, res: Response) {
  try {
    const userRepository = getCustomRepository(UserRepository);
    const users = await userRepository.find({ where: { deletedAt: null } });

    return res.json(users);
  } catch (error) {
    Sentry.captureException(error);
    return res.status(500).json({ message: "Erro ao buscar usuários" });
  }
}

export async function getUserById(req: Request, res: Response) {
  try {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne(req.param("id"), {
      where: { deletedAt: null },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    return res.json(user);
  } catch (error) {
    Sentry.captureException(error);
    return res.status(500).json({ message: "Erro ao buscar usuário" });
  }
}

export async function createUser(req: Request, res: Response) {
  try {
    const createUser: CreateUser = req.body;

    const userRepository = getCustomRepository(UserRepository);

    const { id } = await userRepository.createAndSave(createUser);

    return res.status(201).json({ id });
  } catch (error) {
    Sentry.captureException(error);
    return res.status(500).json({ message: "Erro ao cadastrar usuário" });
  }
}

export async function editUser(req: Request, res: Response) {
  try {
    const { token } = req;

    if (token.userId !== req.param("id")) {
      return res.status(401).json({ message: "Usuário não autorizado" });
    }

    const updateUser: UpdateUser = req.body;
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOneOrFail(req.param("id"), {
      where: { deletedAt: null },
    });

    await userRepository.updateAndSave(user, updateUser);

    return res.status(200).json({ message: "Usuário alterado com sucesso" });
  } catch (error) {
    Sentry.captureException(error);
    return res.status(500).json({ message: "Erro ao alterar usuário" });
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const { token } = req;

    if (token.userId !== req.param("id")) {
      return res.status(401).json({ message: "Usuário não autorizado" });
    }

    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOneOrFail(req.param("id"), {
      where: { deletedAt: null },
    });

    await userRepository.ligthDelete(user);

    return res.status(200).json({ message: "Usuário removido com sucesso" });
  } catch (error) {
    Sentry.captureException(error);
    return res.status(500).json({ message: "Erro ao remover usuário" });
  }
}
