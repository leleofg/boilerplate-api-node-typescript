import { Router } from "express";
import { validate } from "../middlewares/auth";

const routesUser = Router();

import UserController from "../controllers/UserController";

routesUser.post("/users", UserController.createUser);
routesUser.get("/users", validate, UserController.getUsers);
routesUser.get("/users/:id", validate, UserController.getUserById);
routesUser.put("/users/:id", validate, UserController.editUser);
routesUser.delete("/users/:id", validate, UserController.deleteUser);

export default routesUser;
