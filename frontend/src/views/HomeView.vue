<template>
    <header class="motd">No olvides revisar nuestras ofertas!</header>
    <Navbar />
    <Carousel />
    <section class="container">
        <h2 id="section-title">Ofertas del día</h2>
        <Card />
    </section>
    <Footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import Carousel from '@/components/Carousel.vue';
import Card from '@/components/Card.vue';

export default defineComponent({
    name: 'HomeView',
    components: {
        Navbar,
        Carousel,
        Card,
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