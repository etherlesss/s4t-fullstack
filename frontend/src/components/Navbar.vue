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
                    <li class="nav-item" v-if="isUserAdmin === true">
                        <router-link class="nav-link" to="/admin">Control panel</router-link>
                    </li>
                </ul>
                <form class="d-flex" role="search" v-if="$route.path !== '/search'">
                    <input class="form-control me-2" type="search" placeholder="Buscar" aria-label="Search">
                    <button class="btn btn-outline-success" type="submit"><i class="bi bi-search"></i></button>
                </form>
                <ul class="d-flex list-unstyled align-items-center">
                    <li class="nav-btn">
                        <router-link class="nav-link" to="/cart"><i class="bi bi-cart3 mx-3"></i></router-link>
                    </li>
                    <li class="logged-tab nav-item dropdown mt-3" v-if="isUserLogged === true">
                        <a class="nav-link dropdown-toggle nav-item" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Bienvenido, {{ username }}.
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Ver pefil</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="#">Configuraciones</a></li>
                        </ul>
                    </li>
                    <li class="nav-btn" v-if="isUserLogged === false">
                        <router-link class="nav-link" to="/login"><i class="bi bi-person-circle"></i></router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  data() {
    return {
      username: "",
      isUserAdmin: false,
      isUserLogged: false,
      links: [
        { name: 'Productos', url: '/search' },
        { name: 'Soporte al cliente', url: '/support' },
        { name: 'Sobre nosotros', url: '/about' }
      ]
    };
  },
  async mounted() {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        console.log(token)
        //tira error con axios, ahi ver que pasa
        const response = await axios.get('https://localhost:5000/get-token', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data.rol);
        if (response.data.rol === 1) {
          this.isUserAdmin = true;
        } else {
          this.isUserAdmin = false;
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
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