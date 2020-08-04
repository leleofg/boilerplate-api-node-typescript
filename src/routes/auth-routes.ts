import { Router } from "express";

const routes = Router();

import AuthController from "../controllers/AuthController";

routes.post("/login", AuthController.login);

export default routes;
