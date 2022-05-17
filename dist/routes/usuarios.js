"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarios_1 = require("../controllers/usuarios");
const route = (0, express_1.Router)();
route.get("/", usuarios_1.getUsuarios);
route.get("/:id", usuarios_1.getUsuario);
route.post("/", usuarios_1.postUsuario);
route.put("/:id", usuarios_1.putUsuario);
route.delete("/:id", usuarios_1.deleteUsuario);
exports.default = route;
//# sourceMappingURL=usuarios.js.map