<template>
    <Navbar />
    <main>
        <section class="container main-container d-flex gap-md-1 mb-5 flex-column flex-md-row">
            <Product />
            <Summary />
        </section>
    </main>
    <Footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from '@/components/Navbar.vue'; // @ is an alias to /src
import Footer from '@/components/Footer.vue';
import Product from '@/components/products/Product.vue';
import Summary from '@/components/Summary.vue';

export default defineComponent({
    name: 'CartView',
    components: {
        Navbar,
        Product,
        Summary,
        Footer
    },
    // SEO
    mounted() {
        document.title = 'S4T | Carrito de compras';
    },
});
</script>