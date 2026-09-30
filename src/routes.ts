import { Router } from 'express';

// Inicialização do router
const routes = Router();

// Rota inical para verificar se p servodpr está rodando0
routes.get('/', (request, response) => {
    return response.status(200).json({ mensagem: "Hello World!" });

}); 
routes.get("/number", (request, response) => {
    const randomNumber = Math.floor(Math.random() * 100);
    return response.status(200).json({ randomNumber });
});

routes.get("/fibonacci/:quantidade", (request, response) => {
    const quantidade = Number(request.params.quantidade);

    const sequencia = [0, 1];

    for (let i = 2; i <= quantidade; i += 1) {
        sequencia.push(sequencia[i - 1] + sequencia[i - 2]);
    }

    return response.status(200).json(sequencia);
});

routes.get("/fatorial/:quantidade", (request, response) => {
    const quantidade = Number(request.params.quantidade);
    let fatorial = 1;

    for (let i = 1; i <= quantidade; i += 1) {
        fatorial *= i;
    }

    return response.status(200).json(fatorial);
});

export default routes