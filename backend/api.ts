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

// GET
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

// POST


// PUT


// DELETE


// login


// register
/*
app.post('/signup', jsonParser, async (req:any, res:any) => {
    let usuario = req.body.User;
    let rut = req.body.Rut;
    let email = req.body.email;
    let pwd = req.body.Password;
    let region = req.body.Region;
    let ciudad = req.body.city;

    try {
        // Validar los datos de entrada
        if (!usuario || !rut || !email || !pwd || !region || !ciudad) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
        }

        await db.none('INSERT INTO usuarios(rut, nombre_usuario, mail, contrasenya, region, ciudad) VALUES($1, $2, $3, $4, $5, $6)',
                [rut, usuario, email, pwd, region, ciudad]);
        res.status(200).json({ success: true, message: 'Usuario registrado exitosamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});
*/

// Iniciar server
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});