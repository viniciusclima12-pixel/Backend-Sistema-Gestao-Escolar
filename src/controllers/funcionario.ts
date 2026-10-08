import { Request, Response } from "express";
import Bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../config/prisma";
import { handleErrors } from "../helpers/handleErrors";

export default {
    login: async (request: Request, response: Response) => {
        try {
            const { email, senha } = request.body;

            if (!email || !senha) {
                return response.status(400).json("Dados incompletos");
            }
            const funcionario = await prisma.funcionario.findUnique({
                where: {
                    email,
                },
            });

            if (!funcionario || !Bcrypt.compareSync(senha, funcionario.senha)) {
                return response.status(404).json("email ou senha inválidos");

            }

            const token = jwt.sign({ id: funcionario.id, cargo: funcionario.cargo }, 
                process.env.JWT_SECRET!,
                {
                 expiresIn: "1d",
                }
            );
            return response.status(200).json(token);
        } catch (e) {
            return handleErrors(e, response);
        }
    },
};      