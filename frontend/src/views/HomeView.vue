<template>
    <header class="motd">No olvides revisar nuestras ofertas!</header>
    <Navbar />
    <Carousel />
    <section class="container">
        <h2 id="section-title">Productos recomendados</h2>
        <RecommendedCards />
    </section>
    <Footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import Carousel from '@/components/Carousel.vue';
import RecommendedCards from '@/components/cards/Recommended.vue';

import {AuthState, validateAuthToken} from '../functions/localStorage';
import {fetchApi} from '../functions/auth';
import { Ref } from 'vue';


const Inicio = () =>{
    
}

export default defineComponent({
    name: 'HomeView',
    components: {
        Navbar,
        Carousel,
        RecommendedCards,
        Footer
    },
    // SEO
    mounted() {
        document.title = 'S4T | Security for Technology';



    },
});
</script>

<style lang="less">
@import '../styles/styles.less';
</style>