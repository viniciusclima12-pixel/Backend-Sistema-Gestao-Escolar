import { Request, Response } from 'express';
import { prisma } from '../../config/prisma';
import { handlerErrors } from '../helpers/handlerErrors';

export default {
    list: async (request: Request, response: Response) => {
        try {
            const alunos = await prisma.aluno.findMany({
                include: {
                    cursos: true,
                },
            });
           return response.status(200).json(alunos);
        } catch (e) {
        return handlerErrors(e, response);
        }
    },
};