import axios from 'axios';

let url = "http://localhost:5000";

async function GETRequest(endpoint:string){
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

export { getFilters, getCategories };