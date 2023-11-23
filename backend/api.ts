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

// Postgres
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

/*
    GET - READ
*/

// VER LISTA DE PRODUCTOS
app.get('/productos', async(req:Request,res:Response) => {
    try{
        let result = await db.any("SELECT * FROM productos");
        res.json(result);
    }
    catch (error){
        res.status(500).json({error: 'Error al obtener los productos.'});
    }
});

// VER USUARIOS
app.get('/admin/usuarios', async(req:Request,res:Response) => {
    try{
        let result = await db.any("SELECT * FROM usuarios");
        res.json(result);
    }
    catch (error){
        res.status(500).json({error: 'Error al obtener los usuarios.'});
    }
});

// VER FILTROS
app.get('/filters', async (req: Request, res: Response) => {
    try {
        const marcas = await db.any("SELECT * FROM marcas");
        res.json(marcas);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Error al obtener las marcas.'});
    }
});

// VER LAS CATEGORIAS
app.get('/categories', async (req: Request, res: Response) => {
    try {
        const categorias = await db.any("SELECT * FROM categorias");
        res.json(categorias);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Error al obtener las categorias.'});
    }
});

// VER UN PRODUCTO
app.get('/details/product=:id', async (req: Request, res: Response) => {
    let id = req.params.id;
    try {
        const producto = await db.any("SELECT * FROM productos WHERE id_producto=$1", [id]);
        res.json(producto);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Error al obtener el producto.'});
    }
})

/*
    POST - UPLOAD
*/

// LOGIN
app.post('/login', jsonParser, async(req:Request,res:Response) => {

    let email = req.body.email;
    let pwd = req.body.password;

    try{
        let result = await db.any('SELECT * FROM usuarios WHERE mail = $1 AND contrasenya = $2',[email,pwd]);

        if(result[0].rol === (1)){
            res.json({userType: 1}); // ADMIN
        } else if (result[0].rol === (2)){
            res.json({userType: 2}); // USER
        }
        else{
            res.status(401).json({error:'Tipo de usuario inválido'});
        }
    }
    catch (error){
        res.status(401).json({error:'Usuario o contraseña incorrectos'});
    }
});

/* TODO: REGISTRO DESPUES DE QUE LOS FORMS ENTREGUEN JSON. */

// REGISTRO
app.post('/register', jsonParser, async(req:Request,res:Response) => {

    let rut = req.body.rut;
    let nombre_usuario = req.body.nombre_usuario;
    let mail = req.body.mail;
    let contrasenya = req.body.contrasenya;
    let region = req.body.region;
    let ciudad = req.body.ciudad;

    try{
        let result = await db.any('INSERT INTO usuarios(rut,nombre_usuario,mail,contrasenya,region,ciudad,rol) VALUES($1,$2,$3,$4,$5,$6,2)',[rut,nombre_usuario,mail,contrasenya,region,ciudad]);
        res.json(result);
    }
    catch (error){
        res.status(401).json({error:'Uno o mas datos inválidos'});
    }
});

// AGREGAR PRODUCTOS
app.post('/admin/agregarProducto', jsonParser, async(req:Request,res:Response) => {
    const id_producto = req.body.id_producto;
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const precio = req.body.precio;
    const stock = req.body.stock;
    const imagen = req.body.imagen;
    const marca = req.body.marca;
    const categoria = req.body.categoria;
    try{
        let result = await db.any("INSERT INTO productos(id_producto,nombre,descripcion,precio,stock,imagen,marca,categoria) VALUES($1,$2,$3,$4,$5,$6,$7,$8)",[id_producto,nombre,descripcion,precio,stock,imagen,marca,categoria]);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({error: 'Error al agregar producto.'});
    }
});

// PUT - UPDATE
app.put('/admin/actualizarProducto', jsonParser, async(req: Request, res: Response) => {
    const id_producto = req.body.id_producto;
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const precio = req.body.precio;
    const stock = req.body.stock;
    const imagen = req.body.imagen;
    const marca = req.body.marca;
    const categoria = req.body.categoria;

    try {
        let result = await db.any("UPDATE productos SET nombre=$2,descripcion=$3,precio=$4,stock=$5,imagen=$6,marca=$7,categoria=$8 WHERE id_producto=$1", [id_producto, nombre, descripcion, precio, stock, imagen, marca, categoria]);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar producto.' });
    }
});

// DELETE
app.delete('/admin/eliminarProducto', jsonParser, async(req: Request, res: Response) => {
    const id_producto = req.body.id_producto;

    try {
        let result = await db.any("DELETE FROM productos WHERE id_producto=$1", [id_producto]);
        res.json(result);
    } catch (error) {
        res.status(500).json({error: 'Error al eliminar producto.'})
    }
});

// Iniciar server
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});