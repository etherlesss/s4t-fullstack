<template>
    <Navbar />
        <main class="container text-center">
            <h1>Panel de control de S4T</h1>
            <AdminForm />
        </main>
    <Footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from '@/components/Navbar.vue'; // @ is an alias to /src
import Footer from '@/components/Footer.vue';
import AdminForm from '@/Forms/adminForm.vue';

export default defineComponent({
    name: 'AdminView',
    components: {
        Navbar,
        AdminForm,
        Footer
    },
    // SEO
    mounted() {
        document.title = 'S4T | Panel de Control';
    },
});
</script>