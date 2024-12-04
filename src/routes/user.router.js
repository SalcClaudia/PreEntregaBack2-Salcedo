import { Router } from "express";
import { login, logout, secretEndpoint } from "./src/controllers/user.controller.js";
import { validateLogin } from "../middlewares/validateLogin.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const userRouter = Router();

userRouter.post('/login', login);

userRouter.get('/secret-endpoint', validateLogin, secretEndpoint);

userRouter.get('/admin-secret-endpoint', validateLogin, isAdmin, secretEndpoint);

userRouter.get('/logout', logout);

export default userRouter;