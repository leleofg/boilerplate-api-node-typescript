import { Router } from "express";

const routes = Router();

import { login } from "../controllers/AuthController";

routes.post("/login", login);

export default routes;
