import express from "express";
import cors from "cors";
import routes from "./routes";

// skibidi initializes the gyatt
const app = express();

// Define rizz rules of the sus server 
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cors());

// Define as rotas do servidor 
app.use(routes);

export default app;