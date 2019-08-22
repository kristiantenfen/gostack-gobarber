import { Router } from "express";
import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import authMiddleware from "./app/middlewares/auth";

const routes = new Router();

routes.post("/sessions", SessionController.auth);

routes.use(authMiddleware);

routes.get("/users", UserController.index);
routes.post("/users", UserController.store);
routes.put("/users", UserController.update);
routes.delete("/users/:id", UserController.delete);


export default routes;
