/** @format */

import { Request, Response } from "express";

import Usuario from "../models/usuario";

export const getUsuarios = async (req: Request, res: Response) => {
	const usuarios = await Usuario.findAll();
	res.json({ usuarios });
};

export const getUsuario = async (req: Request, res: Response) => {
	const { id } = req.params;

	const usuario = await Usuario.findByPk(id);

	if (usuario) {
		res.json(usuario);
	} else {
		res.status(404).json({
			msg: `el usuario con el id ${id} no se encuentra registrado`,
		});
	}
};
export const postUsuario = async (req: Request, res: Response) => {
	const { body } = req;

	try {
		const existeEmail = await Usuario.findOne({
			where: {
				email: body.email,
			},
		});

		if (existeEmail) {
			return res.status(400).json({
				msg: `èl usuario con el email ${body.email} ya se encuentra registado`,
			});
		}
		const usuario = await Usuario.create(body);
		res.json({
			msg: "usuario creado",
			usuario,
		});
	} catch (error) {
		res.json({
			error,
		});
	}
};

export const putUsuario = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { body } = req;

	try {
		const existeId = await Usuario.findByPk(id);
		if (!existeId) {
			return res.status(404).json({
				smg: ` el usuario con el id ${id} no se encuentra registrado`,
			});
		}
		await Usuario.update(body, {
			where: {
				id,
			},
		});

		res.status(200).json({ existeId });
	} catch (error) {
		res.status(500).json({
			msg: "el usuario no puoo ser actualizado",
		});
	}
};

export const deleteUsuario = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const usuario = await Usuario.findByPk(id);

		if (!usuario) {
			return res.json({
				msg: `el usuario con el id ${id} no existe`,
			});
		}
		await usuario.update({ estado: false });

		res.json({
			msg: `el usuario con el id ${id} fue eliminado`,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: error,
		});
	}
};
