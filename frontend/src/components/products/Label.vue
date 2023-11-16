<template>
    <div class="product-labels px-3">
        <ul class="row mt-4 list-unstyled">
            <li class="col-3">Producto</li>
            <li class="col-2">Precio</li>
            <!--"Cantidad" for larger screens -->
            <li class="col-2 d-none d-md-block">Cantidad</li>
            <!--"Cant." for smaller screens -->
            <li class="col-2 d-md-none">Cant.</li>
            <li class="col-2">Total</li>
            <!--Icon for smaller screens-->
            <li class="col-1 d-md-none"><i class="bi bi-trash3"></i></li>
            <!--Text for larger screens-->
            <li class="col-2 d-none d-md-block">Remover</li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Label'
});
</script>

<style lang="less">
.product-labels ul,
.product-cards ul {
    display: flex;
    justify-content: space-between;
    list-style-type: none;
    padding: 0;
}

.product-labels li,
.product-cards li {
    flex-grow: 1;
    text-align: center;
}
</style>