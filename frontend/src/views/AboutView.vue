<template>
    <Navbar />
    <div class="container text-center">
        <h1 id="section-title">Hola, somos Sech 4 Tech.</h1>
        <div v-for="info in about" :key="info.id" class="my-5">
            <h3>{{ info.pregunta }}</h3>
            <p>{{ info.respuesta }}</p>
        </div>
    </div>
    <Footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import aboutData from '@/json/aboutData.json';

export default defineComponent({
    name: 'AboutView',
    components: {
        Navbar,
        Footer
    },
    data() {
        return {
            about: aboutData
        }
    },
    // SEO
    mounted() {
        document.title = 'S4T | Sobre nosotros';
    },
});
</script>