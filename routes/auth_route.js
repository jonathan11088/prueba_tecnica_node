import { Router} from "express";
import { loginUsuario, registrarUsuario } from "../controllers/auth_controllers.js";

const route = Router();

//router register

route.post('/register',registrarUsuario),
route.post('/login', loginUsuario)

export {route as authRoute}