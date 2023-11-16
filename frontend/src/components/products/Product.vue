<template>
    <div class="products left-container d-flex flex-column gap-1 w-100 w-md-75">
        <Label />
        <div class="product-cards">
            <ul class="row mt-4 list-unstyled px-3" v-for="product in products">
                <li class="col-3">
                    <h5 class="card-title fs-6 fw-bold">{{ product.nombre }}</h5>
                </li>
                <li class="col-2">
                    <p class="card-text">{{ product.precio }}</p>
                </li>
                <li class="col-2">
                    <p class="card-text">{{ product.cantidad }}</p>
                </li>
                <li class="col-2">
                    <p class="card-text">{{ product.total }}</p>
                </li>
                <!--Icon for smaller screens-->
                <li class="col-1 d-md-none">
                    <a onclick="" style="color: red;"><i class="bi bi-trash3"></i></a>
                </li>
                <!--Text for larger screens-->
                <li class="col-2 d-none d-md-block">
                    <a onclick="" style="color: red;">Remover</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Label from './Label.vue';

export default defineComponent({
    data() {
        return {
            products: [
                { nombre: 'Nombre del Producto', precio: '$20.00', cantidad: '2', total: '$40.00' },
                { nombre: 'Nombre del Producto2', precio: '$10.00', cantidad: '1', total: '$10.00' }
            ]
        }
    },
    name: 'Product',
    components: {
        Label
    }
});
</script>

<style lang="less">
.main-container {
    background-color: #eeeeee;
    border-radius: 5px;
}

.products>div {
    background-color: #ffffff;
    border-radius: 5px;
}

.left-container {
    margin-block: 12px;
}

@media (min-width: 768px) {
    .left-container {
        flex: 0 0 75%;
        max-width: 75%;
    }
}
</style>