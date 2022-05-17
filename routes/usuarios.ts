/** @format */

import { Router } from "express";
import { getUsuarios, getUsuario, postUsuario, putUsuario, deleteUsuario } from '../controllers/usuarios';

const route = Router();

route.get("/", getUsuarios);
route.get("/:id", getUsuario);
route.post("/", postUsuario);
route.put("/:id", putUsuario);
route.delete("/:id", deleteUsuario);

export default route;
