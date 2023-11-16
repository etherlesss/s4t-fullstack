<template>
    <Navbar />
    <Qna />
    <Footer />
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from '@/components/Navbar.vue'; // @ is an alias to /src
import Footer from '@/components/Footer.vue';
import Qna from '@/components/Qna.vue';

export default defineComponent({
    name: 'SupportView',
    components: {
        Navbar,
        Qna,
        Footer
    },
    // SEO
    mounted() {
        document.title = 'S4T | Soporte al cliente';
    },
});
</script>