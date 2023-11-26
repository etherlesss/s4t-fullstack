import axios from 'axios';

// GLOBAL
const url = "http://localhost:5000";

const config = {
    headers: {
        "Content-Type": "application/json"
    }
};

/*
    API REQUESTS
*/

// GET
async function GETRequest(endpoint:string) {
    try {
        const res = await axios.get(url + endpoint);
        return res.data;
    } catch (error){
        console.log(error);
    }
}

async function getFilters() {
    const res = await GETRequest("/filters");

    return res.map((item:any) => { return item.nombre }).sort();
}

async function getCategories() {
    const res = await GETRequest("/categories");

    return res.map((item:any) => { return item.nombre }).sort();
}

async function getBrands() {
    const res = await GETRequest("/filters");

    return res;
}

async function getProducts() {
    const res = await GETRequest("/productos");
    const brands = await getBrands();

    for (let i = 0; i < res.length; i++) {
        if (res[i].imagen === null) {
            res[i].imagen = "https://www.hongshen.cl/wp-content/uploads/2016/07/no-disponible.png";
        }

        for (let j = 0; j < brands.length; j++) {
            if (res[i].marca === brands[j].id_marca) {
                res[i].marca = brands[j].nombre;
            }
        }
    }

    return res;
}

async function getProduct(id:any) {
    const res = await GETRequest("/details/product=" + id);
    const brands = await getBrands();

    let parsedRes = res[0];

    if (parsedRes.imagen === null) {
        parsedRes.imagen = "https://www.hongshen.cl/wp-content/uploads/2016/07/no-disponible.png";
    }

    for (let i = 0; i < brands.length; i++) {
        if (parsedRes.marca === brands[i].id_marca) {
            parsedRes.marca = brands[i].nombre;
        }
    }

    return parsedRes;
}

async function getRecommended() {
    const res = await GETRequest("/productos");
    const brands = await getBrands();
    let rec = [] as any[];

    for (let i = 0; i < res.length; i++) {
        if (res[i].imagen === null) {
            res[i].imagen = "https://www.hongshen.cl/wp-content/uploads/2016/07/no-disponible.png";
        }

        for (let j = 0; j < brands.length; j++) {
            if (res[i].marca === brands[j].id_marca) {
                res[i].marca = brands[j].nombre;
            }
        }
    }

    console.log(res);

    //ojo
    for(let i= 0; i < 4 ;i++) {
        let rand = Math.floor(Math.random() * res.length);
        let randItem = res[rand];
        if (!rec.includes(randItem)) {
            rec.push(randItem);
        }
    }

    return rec;
}

// POST
async function POSTRequest(endpoint:string, body:any) {
    try {
        const res = await axios.post(url + endpoint ,body, config);
        return res.data;
    } catch (error:any) {
        const status = error.response.status;
        const data = error.response.data;
        console.log(status, data)
        return status;
    }
}
// no
async function postLogin(this: any) {
    // no cambiar keys (variables)
    /*
    const user = { nombre_usuario: "admin", contrasenya: "22888111Ts" };
    const username = user.nombre_usuario;
    const res = await POSTRequest("/login", user);
    */
    let res = await axios.get('https://localhost:5000/postLogin');

    if (res.data.rol == 400) { return { isAdmin: false, isLogged: false };}
    if(res.data.rol == 401) {return { isAdmin: true, isLogged: true };}

    return { isAdmin: false, isLogged: false };
    
}

export { getFilters, getCategories, postLogin, getProducts, getRecommended, getProduct };