<template>
    <div class="cards d-flex flex-wrap gap-5 justify-content-center row-cols-5">
        <div class="card" v-for="producto in productos" style="width: 18rem;">
            <img src="https://www.si-analytics.com/Image%20Library/sample-images/Placeholder-500x500.png"
                class="card-img-top" alt="..."> <!--AQUI IDEALMENTE AGREGAR {{ producto.img }}-->
            <div class="card-body">
                <h5 class="card-title">{{ producto.titulo }}</h5>
                <h5 class="card-subtitle fw-bold">{{ producto.precio }}</h5>
                <p class="card-text">{{ producto.descripcion }}</p>
                <div class="d-flex flex-column gap-1">
                    <a href="#" class="btn btn-primary main-btn">Ver detalles</a>
                    <a href="#" class="btn btn-primary secondary-btn">Agregar al carro</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            productos: [
                { titulo: 'Producto1', precio: 'Precio1', descripcion: 'Descripción1'},
                { titulo: 'Producto2', precio: 'Precio2', descripcion: 'Descripción2'},
                { titulo: 'Producto3', precio: 'Precio3', descripcion: 'Descripción3'}
            ]
        }
    },
    name: 'Cards'
});
</script>