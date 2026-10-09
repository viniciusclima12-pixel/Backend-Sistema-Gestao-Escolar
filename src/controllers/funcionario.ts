import { Request, Response } from "express";
import Bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../config/prisma";
import { handleErrors } from "../helpers/handleErrors";

function removerSenha<T extends { senha: string }>({ senha: _senha, ...funcionario }: T) {
    return funcionario;
}

export default {
    list: async (request: Request, response: Response) => {
        try {
            const funcionarios = await prisma.funcionario.findMany();

            return response.status(200).json(funcionarios.map(removerSenha));
        } catch (e) {
            return handleErrors(e, response);
        }
    },

    getById: async (request: Request, response: Response) => {
        try {
            const id = Number(request.params.id);
            const funcionario = await prisma.funcionario.findUnique({
                where: {
                    id,
                },
            });

            if (!funcionario) {
                return response.status(404).json("Funcionário não encontrado");
            }

            return response.status(200).json(removerSenha(funcionario));
        } catch (e) {
            return handleErrors(e, response);
        }
    },

    create: async (request: Request, response: Response) => {
        try {
            const { nome, email, cargo, nascimento, cpf, senha, telefone, endereco } = request.body;

            if (!nome || !email || !cargo || !cpf || !senha) {
                return response.status(400).json("Dados do funcionário incompletos");
            }

            const funcionario = await prisma.funcionario.create({
                data: {
                    nome,
                    email,
                    cargo,
                    nascimento: nascimento ? new Date(nascimento) : undefined,
                    cpf,
                    senha: await Bcrypt.hash(senha, 10),
                    telefone,
                    endereco,
                },
            });

            return response.status(201).json(removerSenha(funcionario));
        } catch (e) {
            return handleErrors(e, response);
        }
    },

    update: async (request: Request, response: Response) => {
        try {
            const id = Number(request.params.id);
            const { nome, email, nascimento, cpf, senha, telefone, endereco } = request.body;
            const funcionario = await prisma.funcionario.update({
                where: { id },
                data: {
                    nome,
                    email,
                    nascimento: nascimento ? new Date(nascimento) : undefined,
                    cpf,
                    senha: senha ? await Bcrypt.hash(senha, 10) : undefined,
                    telefone,
                    endereco,
                },
            });

            return response.status(200).json(removerSenha(funcionario));
        } catch (e) {
            return handleErrors(e, response);
        }
    },

    delete: async (request: Request, response: Response) => {
        try {
            const id = Number(request.params.id);
            const funcionario = await prisma.funcionario.delete({
                where: {
                    id,
                },
            });

            return response.status(200).json(removerSenha(funcionario));
        } catch (e) {
            return handleErrors(e, response);
        }
    },

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