import { Router } from "express";
import alunoController from "./controllers/aluno";

// Inicializa o router
const routes = Router();

// Rota inicial para verificar se o servidor está rodando
routes.get("/", (request, response) => {
  return response.status(200).json({ message: "Hello World!" });
});

// Rotas de alunos  
routes.get("/alunos", alunoController.list);

export default routes;