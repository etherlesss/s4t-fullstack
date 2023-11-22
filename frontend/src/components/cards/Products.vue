<template>
    <div class="cards d-flex flex-wrap gap-5 justify-content-center row-cols-5">
        <div class="card" v-for="producto in productos" style="width: 18rem;">
            <img :src="producto.imagen"
                class="card-img-top" :alt="producto.descripcion">
            <div class="card-body">
                <h5 class="card-title text-truncate">{{ producto.nombre }}</h5>
                <h5 class="card-subtitle fw-bold mb-3">{{ '$' + producto.precio }}</h5>
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
import { getProducts }  from '@/api/utils';

export default defineComponent({
    data() {
        return {
            productos: [] as any[]
        }
    },
    async mounted() {
        try {
            this.productos = await getProducts();
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    },
    name: 'ProductCards'
});
</script>