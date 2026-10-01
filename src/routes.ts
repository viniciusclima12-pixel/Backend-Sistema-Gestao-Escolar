import { Router } from "express";

// Inicializa o router
const routes = Router();

// Rota inicial para verificar se o servidor está rodando
routes.get("/", (request, response) => {
  return response.status(200).json({ message: "Hello World!" });
});

routes.post("/aluno", (request, response) => {
  const { nome, cpf, idade, media } = request.body;

  const status = media > 6 ? "Aprovado" : "Reprovado";

  return response.status(201).json({
    nome,
    cpf,
    idade,
    status,
  })
});
routes.put("/aluno/:id", (request, response) => {
  const alunos = [
    { nome: "joão", idade: 20 },
    { nome: "maria", idade: 22 },
    { nome: "pedro", idade: 19 },
    { nome: "ana", idade: 21 },
  ];
  
  const { id } = request.params;
  const { nome } = request.body;

  const aluno = alunos[+id];
  aluno.nome = nome;

  return response.status(200).json(aluno);


});

routes.delete("/aluno/:id", (request, response) => {
  const alunos = [
    { nome: "joão", idade: 20 },
    { nome: "maria", idade: 22 },
    { nome: "pedro", idade: 19 },
    { nome: "ana", idade: 21 },
  ];

    const { id } = request.params;
    const novalista = alunos.splice(+id, 1);

    return response.status(200).json(alunos);

});

export default routes;