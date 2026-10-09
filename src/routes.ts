import { Router } from "express";
import alunoController from "./controllers/aluno";
import cursoController from "./controllers/curso";
import matriculaController from "./controllers/matriculas";
import funcionarioController from "./controllers/funcionario";
import { authetication } from "./middlewares/authetication";


// Inicializa o router
const routes = Router();
routes.get("/alunos", authetication, alunoController.list);
routes.get("/alunos/:id", authetication, alunoController.getById);
routes.post("/alunos", authetication, alunoController.create);
routes.put("/alunos/:id", authetication, alunoController.update);
routes.delete("/alunos/:id", authetication, alunoController.delete);

// Rotas de cursos
routes.get("/cursos", authetication, authetication, authetication, cursoController.list);
routes.get("/cursos/:id", authetication, cursoController.getById);
routes.post("/cursos", authetication, cursoController.create);
routes.put("/cursos/:id", authetication, cursoController.update);
routes.delete("/cursos/:id", authetication, cursoController.delete);

//Rotas de matriculas
routes.post("/matriculas/:id", authetication, matriculaController.create);
routes.delete("/matriculas/:id", authetication, matriculaController.delete);

//Rotas de funcionarios

routes.post("/login", funcionarioController.login);
export default routes;