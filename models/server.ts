/** @format */

import express, { Application } from "express";
import userRoutes from "../routes/usuarios";
import cors from "cors";
import db from "../db/connection";

interface ApiPaths {
	usuarios: string;
}

export class Server {
	private app: Application;
	private port: string;
	private apiPaths: ApiPaths = {
		usuarios: "/api/usuarios",
	};

	constructor() {
		this.app = express();
		this.port = process.env.PORT || "8000";
		this.dbConnection();
		this.middlewares();
		this.routes();
	}

	middlewares() {
		//CORS

		this.app.use(cors());
		//LECTURA DEL BODY
		this.app.use(express.json());

		//CARPETA PUBLICA

		this.app.use(express.static("public"));
	}

	async dbConnection() {
		try {
			await db.authenticate();
			console.log("database online");
		} catch (error) {
			throw new Error(String(error));
		}
	}

	routes() {
		this.app.use(this.apiPaths.usuarios, userRoutes);
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log(`Servidor Corriendo En El Puerto${this.port}`);
		});
	}
}
