<template>
    <Navbar />
    <main class="container">
        <h1 id="section-title">Detalles del producto</h1>
        <section class="top-container d-flex flex-column flex-md-row gap-md-5 p-3 mb-5">
            <img :src="product.imagen"
                class="d-block mb-3 mb-md-0" :alt="product.descripcion">
            <div class="product-info p-5 col d-flex flex-column text-break">
                <h2 class="fw-bold">{{ product.nombre }}</h2>
                <h3>Por: <b>{{ product.marca }}</b></h3>
                <h4 class="text-end">Precio: <b>${{ product.precio }}</b></h4>
                <!-- <h4 class="fw-bold text-end">Precio oferta</h4>
                <p class="text-end">Descuento</p> -->
                <div class="stock d-flex p-2 justify-content-between">
                    <p class="text-start m-0">Stock disponible</p>
                    <p class="text-end m-0"><b>{{ product.stock }}</b></p>
                </div>
                <div class="mt-2 mb-2">
                    <p v-if="product.descripcion">{{ product.descripcion }}</p>
                    <p v-else><i>La descripción para este artículo no está disponible.</i></p>
                </div>
                <div class="d-flex flex-column gap-1 mt-auto">
                    <a href="#" class="btn btn-primary main-btn">Comprar ahora</a>
                    <a href="#" class="btn btn-primary secondary-btn">Agregar al carro</a>
                </div>
            </div>
        </section>

        <h2 id="section-title">Quizá te pueda interesar</h2>
        <section class="mb-5">
            <RecommendedCards />
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
import RecommendedCards from '@/components/cards/Recommended.vue';
import Spec from '@/components/Spec.vue';
import { getProduct } from '@/api/utils';

export default defineComponent({
    name: 'DetailView',
    data() {
        return {
            product: {} as any
        }
    },
    components: {
        Navbar,
        RecommendedCards,
        Spec,
        Footer
    },
    // SEO
    async mounted() {
        document.title = 'S4T | Detalles del producto';
        try {
            const id = this.$route.params.id;
            this.product = await getProduct(id);
        } catch (error) {
            console.error("Error fetching product:", error);
        }
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

.top-container > img {
    max-height: 500px;
    max-width: 500px;
}

.top-container p {
    margin-bottom: 0 !important;
}
</style>