import axios from 'axios';

// GLOBAL
const url = "http://localhost:5000";

const config = {
    headers: {
        "Content-Type": "application/json"
    }
};

// FUNCS
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

async function postLogin() {
    // no cambiar keys (variables)
    const user = { nombre_usuario: "admin", contrasenya: "22888111Ts" };
    const username = user.nombre_usuario;
    const res = await POSTRequest("/login", user);

    const usertype = res.userType == 1 ? true : false;

    if (res == 401) { return { isAdmin: false, isLogged: false }; }

    return { username, isAdmin: usertype, isLogged: true };
}

export { getFilters, getCategories, postLogin };