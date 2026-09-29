import http from "http";
import app from "./app";

// Cria o servidor HTTO usando as regras do app
const server = http.createServer(app);

// Define a porta do servidor
const PORT = process.env.PORT || 8080;

// Incia o servidor
server.listen(PORT, () => console.log("Servidor escutando na porta ", PORT));