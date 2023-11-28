require("dotenv").config();
import cors from 'cors';
import express ,{ Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import middlewares from "./middlewares";

const bcrypt = require('bcrypt');
const mySalt = '$2b$10$ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNO';

const SECRET_KEY = process.env.JWT_SECRET_KEY ?? 'secretkey';

const app = express();
const port = process.env.PORT || 5000;

//borrar los JsonParser y los bodyparser

app.use(express.json());

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
//SAcar tokem

app.get('/get-token',async(req:Request,res:Response)=>{

    try{
        let token = localStorage.getItem('token');
        if(token){
            console.log(token);
            res.json(jwt.verify(token,SECRET_KEY));
        }
    }
    catch(error){
        console.log(error);
    }

})
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
app.get('/admin/usuarios',middlewares.authGuard,middlewares.adminGuard, async(req:Request,res:Response) => {
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
SIENTO QUE ESTO ES MALA PRACTICA PERO BUENO AMIQUE
NO USAR, DEPSUES SE BORRA, NO QUIERO PERDERLAS AÚN
*/

function decodeToken(token:any){
    try{
        const decoded= jwt.verify(token,SECRET_KEY);
        return decoded;
    }
    catch(error){
        console.log(error);
        return null;
    }
}

function checkUserRole(decoded:any) {
    if (decoded.rol === 1) {
      return 'admin';
    } else if (decoded.rol === 2) {
      return 'user';
    } else {
      return null;
    }
  }

app.get('/api/check-user-role', async (req:Request, res:Response) => {
    const token = req.query.token as string;
    try {
      const decoded = decodeToken(token);
      const userRole = checkUserRole(decoded);
      console.log(userRole);
      res.json({ rol: userRole });
    } catch (error) {
      res.status(401).json({ error: 'Invalid token' });
    }
});
  
/*
    POST - UPLOAD
*/

// LOGIN
//return token, fecha de expiración
// username y rol
app.post('/login', async(req:Request,res:Response) => {
    let email = req.body.email;
    let pwd = req.body.password;

    console.log(req.body);
    try{
        console.log(pwd)
        console.log(email,pwd);
        const encodepwd = await bcrypt.hash(pwd,mySalt);
        const result = await db.any('SELECT * FROM usuarios WHERE mail = $1 AND contrasenya = $2',[email,encodepwd]);
        //test
        //console.log(result);
        if(result == null){
            res.status(404).send({
                message: 'Datos incorrectos',
            });
            return;
        }
        //añadir verificaciones
        const token = jwt.sign(
            { email:   result[0].email, rol: result[0].rol },
            SECRET_KEY,
            { expiresIn: '24h' },
        );
        
        res.status(200).send({
            message: 'Inicio de sesión correcto',

            token:{
                token,
                expiresOn: new Date(Date.now() + 24*60*60*1000).getTime(),
            },
            usuario:{
                email: result[0].email,
                rol: result[0].rol,
            },
        });
     }
    catch (error){
        console.error(error);
        res.status(401).json({error:'Usuario o contraseña incorrectos'});
    }
});

app.get('/postLogin',async(req:Request,res:Response)=>{
    let email = req.body.email;
    let contrasenya = req.body.contrasenya;
    let contrasenyaEncriptada  =  await bcrypt.hash(contrasenya,mySalt);
    
    try{
        let result = await db.any("SELECT * FROM usuarios WHERE mail = $1 AND contrasenya = $2",[email,contrasenyaEncriptada])
        if(result == null){
            res.status(404).send({
                message: 'Datos incorrectos',
            });
            return;
        }
        if((this as any).result.rol !== 1){
            res.status(401);
            return 1;
        }
        else{
            res.status(400);
            return 2;
        }
    }
    catch(error){
        res.status(404);
    }
    

});
/* TODO: REGISTRO DESPUES DE QUE LOS FORMS ENTREGUEN JSON. */

// REGISTRO
app.post('/register', async(req:Request,res:Response) => {
    
    let rut = req.body.rut;
    let nombre_usuario = req.body.nombre_usuario;
    let mail = req.body.mail;
    let contrasenya = req.body.contrasenya;
    let region = req.body.region;
    let ciudad = req.body.ciudad;
    const contrasenyaEncriptada = await bcrypt.hash(contrasenya,mySalt);
    //Validar que entren todos los datos obligatorios
    //verificar que no exista la PK
    try{
        let result = await db.none('INSERT INTO usuarios(rut,nombre_usuario,mail,contrasenya,region,ciudad,rol) VALUES($1,$2,$3,$4,$5,$6,2)',[rut,nombre_usuario,mail,contrasenyaEncriptada,region,ciudad]);
        res.json(result);
    }
    catch (error){
        res.status(401).json({error:'Uno o mas datos inválidos'});
    }
});

// AGREGAR PRODUCTOS
app.post('/admin/agregarProducto',middlewares.authGuard,middlewares.adminGuard,async(req:Request,res:Response) => {

    //verificar token
    //verificar que sea admin

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
app.put('/admin/actualizarProducto',middlewares.authGuard,middlewares.adminGuard, async(req: Request, res: Response) => {

    //verificar token
    //verificar que sea admin

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
app.delete('/admin/eliminarProducto',middlewares.authGuard,middlewares.adminGuard, async(req: Request, res: Response) => {

    //verificar token
    //verificar que sea admin

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