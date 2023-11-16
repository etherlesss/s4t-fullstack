<template>
    <Navbar />
    <main class="container">
        <h1 id="section-title">Detalles del producto</h1>
        <section class="top-container d-flex flex-column flex-md-row gap-md-5 p-3 mb-5">
            <img src="https://www.si-analytics.com/Image%20Library/sample-images/Placeholder-500x500.png"
                class="d-block mb-3 mb-md-0" alt="placeholder producto">
            <div class="product-info p-5 col d-flex flex-column">
                <h2 class="fw-bold">Nombre</h2>
                <h3>Marca</h3>
                <h4 class="fw-bold text-end">Precio</h4>
                <h4 class="fw-bold text-end">Precio oferta</h4>
                <p class="text-end">Descuento</p>
                <div class="stock d-flex p-2 justify-content-between">
                    <p class="text-start m-0">Stock disponible</p>
                    <p class="text-end m-0">5</p>
                </div>
                <div class="d-flex flex-column gap-1 mt-auto">
                    <a href="#" class="btn btn-primary main-btn">Comprar ahora</a>
                    <a href="#" class="btn btn-primary secondary-btn">Agregar al carro</a>
                </div>
            </div>
        </section>

        <h2 id="section-title">Quizá te pueda interesar</h2>
        <section class="mb-5">
            <Card />
        </section>

        <h2 id="section-title">Especificaciones</h2>
        <section class="bottom-container p-5">
            <Spec />
        </section>
    </main>

    <Footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from '@/components/Navbar.vue'; // @ is an alias to /src
import Footer from '@/components/Footer.vue';
import Card from '@/components/Card.vue';
import Spec from '@/components/Spec.vue';

export default defineComponent({
    name: 'DetailView',
    components: {
        Navbar,
        Card,
        Spec,
        Footer
    },
    // SEO
    mounted() {
        document.title = 'S4T | Detalles del producto';
    },
});
</script>

<style lang="less">
.top-container,
.bottom-container {
    background-color: #eeeeee;
}

.product-info {
    background-color: #ffffff;
    border-radius: 5px;
}

.stock {
    border-block: 1px solid #121212;
}

.spec-list>li>p {
    margin: 0;
}
</style>