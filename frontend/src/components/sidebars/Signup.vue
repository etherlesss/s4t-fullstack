<template>
    <aside class="signup-sidebar d-none d-md-block">
        <div >
            <h1>Bienvenido</h1>
            <div id="secondaryPrimary" class="secondary-container">
                <p>Continuar usando</p>
                <ul class="list-unstyled">
                    <li>
                        <a class="link-light" href="#"><i class="bi bi-google"></i></a>
                    </li>
                    <li>
                        <a class="link-light" href="#"><i class="bi bi-facebook"></i></a>
                    </li>
                </ul>
            </div>
            <div class="back-btn">
            <router-link class="link-light bottom-hint d-flex align-items-center p-2 gap-2" to="/">
                <i class="bi bi-arrow-left fs-5"></i>
                <p class="mb-0 fs-5">Volver al inicio</p>
            </router-link>
        </div>
        </div>
    </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'SignupSidebar'
});
</script>

<style lang="less">


.signup-sidebar {
    background-color: #121212;
    color: #ffffff;
    width: 30vw;
    height: 150vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding-top: 100px;
}

.signup-sidebar p {
    font-size: 24px;
}

.signup-sidebar ul {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
}

.signup-sidebar .bi {
    font-size: 32px;
}

.back-btn{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.secondary-container {
    margin-top: 20vh;
}
</style>