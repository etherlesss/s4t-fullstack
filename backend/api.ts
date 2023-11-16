import cors from 'cors';
import { Request, Response } from 'express';
require("dotenv").config();

const express = require("express");
const app = express();

const port = process.env.PORT || 5000;

// pasar parametros al backend
const bodyParser = require("body-parser");

var jsonParser = bodyParser.json()

// CORS
const corsConfig = {
    origin: "*",
    methods: ["GET", "POST"]
}

app.use(cors(corsConfig));

// postgres
const pgp = require("pg-promise")();
const connection = {
    host: 'localhost',
    port: 5432,
    database: 'secfortech', // Nombre de la DB (cambiar respecto a su contraseña respectiva para probar)
    user: 'postgres',
    password: 'admin' // Password usuario postgres (cambiar respecto a su contraseña respectiva para probar)
}

const db = pgp(connection)

// Rutas
app.get('/', (req: Request, res: Response) => {
    res.json({message: 'API de express con PSQL'});
});

// GET - READ
app.get('/filters', async (req: Request, res: Response) => {
    try {
        const marcas = await db.any("SELECT * FROM marcas");
        res.json(marcas);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Error al obtener las marcas.'});
    }
});

app.get('/categories', async (req: Request, res: Response) => {
    try {
        const categorias = await db.any("SELECT * FROM categorias");
        res.json(categorias);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Error al obtener las categorias.'});
    }
});

// POST - UPLOAD


// PUT - UPDATE


// DELETE


// Iniciar server
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});