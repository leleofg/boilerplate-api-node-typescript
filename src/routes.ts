import { Router } from "express";

import routesUser from "./routes/user-routes";
import routesAuth from "./routes/auth-routes";

const routes = Router();

routes.use(routesUser, routesAuth);

export default routes;
