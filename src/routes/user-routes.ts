import { Router } from "express";
import { validate } from "../middlewares/auth";

const routesUser = Router();

import { createUser, deleteUser, editUser, getUserById, getUsers } from "../controllers/UserController";

routesUser.post("/users", createUser);
routesUser.get("/users", validate, getUsers);
routesUser.get("/users/:id", validate, getUserById);
routesUser.put("/users/:id", validate, editUser);
routesUser.delete("/users/:id", validate, deleteUser);

export default routesUser;
