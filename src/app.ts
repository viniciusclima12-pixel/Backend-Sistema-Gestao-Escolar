import express from "express";
import cors from "cors";

// skibidi initializes the gyatt
const app = express();

// Define rizz rules of the sus server 
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cors());

export default app;