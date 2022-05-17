"use strict";
/** @format */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_1.default.findAll();
    res.json({ usuarios });
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_1.default.findByPk(id);
    if (usuario) {
        res.json(usuario);
    }
    else {
        res.status(404).json({
            msg: `el usuario con el id ${id} no se encuentra registrado`,
        });
    }
});
exports.getUsuario = getUsuario;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const existeEmail = yield usuario_1.default.findOne({
            where: {
                email: body.email,
            },
        });
        if (existeEmail) {
            return res.status(400).json({
                msg: `èl usuario con el email ${body.email} ya se encuentra registado`,
            });
        }
        const usuario = yield usuario_1.default.create(body);
        res.json({
            msg: "usuario creado",
            usuario,
        });
    }
    catch (error) {
        res.json({
            error,
        });
    }
});
exports.postUsuario = postUsuario;
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const existeId = yield usuario_1.default.findByPk(id);
        if (!existeId) {
            return res.status(404).json({
                smg: ` el usuario con el id ${id} no se encuentra registrado`,
            });
        }
        yield usuario_1.default.update(body, {
            where: {
                id,
            },
        });
        res.status(200).json({ existeId });
    }
    catch (error) {
        res.status(500).json({
            msg: "el usuario no puoo ser actualizado",
        });
    }
});
exports.putUsuario = putUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            return res.json({
                msg: `el usuario con el id ${id} no existe`,
            });
        }
        yield usuario.update({ estado: false });
        res.json({
            msg: `el usuario con el id ${id} fue eliminado`,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: error,
        });
    }
});
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuarios.js.map