<template>
    <Navbar />
    <div class="w-100 d-flex flex-column flex-md-row">
        <aside class="filters p-5 mb-5 mb-md-0">
            <Filter />
        </aside>
        <main class="container">
            <h1 id="section-title">Resultados de búsqueda</h1>
            <Indexer @search="handleSearch" />
            <ProductCards :products="filteredProducts"/>
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

import { getProducts } from '@/api/utils';

export default defineComponent({
    name: 'SearchView',
    components: {
        Navbar,
        Indexer,
        Filter,
        ProductCards,
        Footer
    },
    data() {
        return {
            products: [] as any,
            filteredProducts: [] as any
        };
    },
    async mounted() {
        // SEO
        document.title = 'S4T | Resultados de búsqueda';

        try {
            this.products = await getProducts();
            this.filteredProducts = this.products;
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    },
    methods: {
        handleSearch(query: string | Event) {
            if (typeof query === 'string') {
                // Si se proporciona un valor
                this.filteredProducts = this.products.filter((product: any) =>
                    product.nombre.toLowerCase().includes(query.toLowerCase())
                );
            } else {
                // O si es un evento
                const value = (query.target as HTMLInputElement).value;
                this.filteredProducts = this.products.filter((product: any) =>
                    product.nombre.toLowerCase().includes(value.toLowerCase())
                );
            }
        },
        handleFilter(filter: (value: any) => boolean) {
            this.filteredProducts = this.products.filter((product:any) => {
                filter(product)
            });
        }
    }
});
</script>

<style lang="less">
.filters {
    background-color: #eeeeee;
}
</style>