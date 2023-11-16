<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary mb-5">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/"><img id="nav-logo" src="../assets/logo_big.png"
                    alt="Sec for tech logo"></router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02"
                aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item" v-for="link in links">
                        <router-link class="nav-link" :to="link.url">{{ link.name }}</router-link>
                    </li>
                </ul>
                <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Buscar" aria-label="Search">
                    <button class="btn btn-outline-success" type="submit"><i class="bi bi-search"></i></button>
                </form>
                <ul class="d-flex list-unstyled">
                    <li class="nav-btn">
                        <router-link class="nav-link" to="/cart"><i class="bi bi-cart3 mx-3"></i></router-link>
                    </li>
                    <li class="nav-btn">
                        <router-link class="nav-link" to="/login"><i class="bi bi-person-circle"></i></router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            links: [
                { name: 'Productos', url: '/search' },
                { name: 'Soporte al cliente', url: '/support' },
                { name: 'Sobre nosotros', url: '/about' }
            ]
        };
    },
    name: 'Navbar'
});
</script>

<style lang="less">
@bg-col: #121212; // Background color
@fg-col: #ffffff; // Foreground color
.navbar {
    background-color: @bg-col !important;
}

.nav-link {
    color: @fg-col !important;
}

.navbar-toggler {
    border: none;
    box-shadow: none !important;
}

.navbar-toggler-icon {
    filter: brightness(0%) invert();
}
</style>