import { Router } from "express";
import alunoController from "./controllers/aluno";
import cursoController from "./controllers/curso";
import matriculaController from "./controllers/matriculas";

// Inicializa o router
const routes = Router();
routes.post("/alunos", alunoController.create);
routes.put("/alunos/:id", alunoController.update);
routes.delete("/alunos/:id", alunoController.delete);

// Rotas de cursos
routes.get("/cursos", cursoController.list);
routes.get("/cursos/:id", cursoController.getById);
routes.post("/cursos", cursoController.create);
routes.put("/cursos/:id", cursoController.update);
routes.delete("/cursos/:id", cursoController.delete);

//Rotas de matriculas
routes.post("/matriculas/:id", matriculaController.create);
routes.delete("/matriculas/:id", matriculaController.delete);

export default routes;