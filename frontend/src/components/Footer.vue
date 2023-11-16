<template>
    <footer class="mt-5">
        <div class="footer-content">
            <router-link to="/"><img id="footer-logo" src="../assets/logo_big.png" alt="Sec for tech logo"></router-link>
            <div class="links top">
                <ul class="links-list list-group list-unstyled">
                    <li v-for="link in links">
                        <router-link class="nav-link" :to="link.url">{{ link.name }}</router-link>  
                    </li>
                </ul>
            </div>
            <div class="links bottom">
                <div>
                    <a class="link-light" href="https://github.com/etherlesss/s4t-vue" target="_blank"><i
                            class="bi bi-github" style="font-size: 24px;"></i></a>
                </div>
            </div>
        </div>
    </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            links: [
                { name: 'Productos', url: '/search' },
                { name: 'Sobre nosotros', url: '/about'},
                { name: 'Soporte al cliente', url: '/support'}
            ]
        };
    },
    name: 'Footer'
})
</script>

<style lang="less">
@bg-col: #121212; // Background color
@fg-col: #ffffff; // Foreground color
footer {
    background-color: @bg-col;
    color: @fg-col;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.footer-content {
    padding: 2%;
}

footer .top {
    border-bottom: 2px solid @fg-col;
}

footer .bottom {
    padding: 20px;
}

footer h2 {
    font-size: 24px;
}

.links-list > li{
    margin-block: 10px;
}

.links-list {
    margin-bottom: 20px;
}
</style>