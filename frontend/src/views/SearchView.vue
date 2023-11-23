<template>
    <Navbar />
    <div class="w-100 d-flex flex-column flex-md-row">
        <aside class="filters p-5 mb-5 mb-md-0">
            <Filter />
        </aside>
        <main class="container">
            <h1 id="section-title">Resultados de búsqueda</h1>
            <Indexer />
            <ProductCards />
        </main>
    </div>
    <Footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from '@/components/Navbar.vue'; // @ is an alias to /src
import Footer from '@/components/Footer.vue';
import Filter from '@/components/Filter.vue';
import Indexer from '@/components/Indexer.vue';
import ProductCards from '@/components/cards/Products.vue';

export default defineComponent({
    name: 'SearchView',
    components: {
        Navbar,
        Indexer,
        Filter,
        ProductCards,
        Footer
    },
    // SEO
    mounted() {
        document.title = 'S4T | Resultados de búsqueda';
    },
});
</script>

<style lang="less">
.filters {
    background-color: #eeeeee;
}
</style>