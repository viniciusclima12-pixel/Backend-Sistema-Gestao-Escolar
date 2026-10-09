import { Router } from "express";
import alunoController from "./controllers/aluno";
import cursoController from "./controllers/curso";
import matriculaController from "./controllers/matriculas";
import funcionarioController from "./controllers/funcionario";
import { authetication } from "./middlewares/authetication";
import { isAdmin, isAdminOrHimself } from "./middlewares/permissions";

// Inicializa o router
const routes = Router();
routes.get("/alunos", authetication, alunoController.list);
routes.get("/alunos/:id", authetication, alunoController.getById);
routes.post("/alunos", authetication, isAdmin, alunoController.create);
routes.put("/alunos/:id", authetication, isAdmin, alunoController.update);
routes.delete("/alunos/:id", authetication, isAdmin, alunoController.delete);

// Rotas de cursos
routes.get("/cursos", authetication, cursoController.list);
routes.get("/cursos/:id", authetication, isAdmin, cursoController.getById);
routes.post("/cursos", authetication, isAdmin, cursoController.create);
routes.put("/cursos/:id", authetication, isAdmin, cursoController.update);
routes.delete("/cursos/:id", authetication, isAdmin, cursoController.delete);

// Rotas de matriculas
routes.post("/matriculas/:id", authetication, isAdmin, matriculaController.create);
routes.delete("/matriculas/:id", authetication, isAdmin, matriculaController.delete);

// Rotas de funcionarios
routes.post("/login", funcionarioController.login);
routes.get("/funcionarios", authetication, isAdmin, funcionarioController.list);
routes.get("/funcionarios/:id", authetication, isAdminOrHimself, funcionarioController.getById);
routes.post("/funcionarios", authetication, isAdmin, funcionarioController.create);
routes.put("/funcionarios/:id", authetication, isAdminOrHimself, funcionarioController.update);
routes.delete("/funcionarios/:id", authetication, isAdmin, funcionarioController.delete);

export default routes;