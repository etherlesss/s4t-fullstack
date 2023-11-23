<template>
    <div class="cards d-flex flex-wrap gap-5 justify-content-center row-cols-5">
        <div class="card" v-for="producto in products" :key="producto.id_producto" style="width: 18rem;">
            <img :src="producto.imagen"
                class="card-img-top" :alt="producto.descripcion">
            <div class="card-body">
                <h5 class="card-title text-truncate">{{ producto.nombre }}</h5>
                <p class="card-text">{{ producto.marca }}</p>
                <h5 class="card-subtitle fw-bold mb-3">{{ '$' + producto.precio }}</h5>
                <div class="d-flex flex-column gap-1">
                    <router-link :to="`/details/product=`+producto.id_producto" class="btn btn-primary main-btn" @click="scrollToTop">Ver detalles</router-link>
                    <a href="#" class="btn btn-primary secondary-btn">Agregar al carro</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ProductCards',
    props: ['products'],
    methods: {
        scrollToTop() {
            window.scrollTo(0, 0);
        }
    }
});
</script>