<template>
    <div class="d-flex flex-row">
        <LoginSidebar />
        <loginForm :schema="formSchema"/>
    </div>
    <div class="d-md-none">
        <div id="secondaryLogin" class="secondary-container">
            <p>Continuar usando</p>
            <ul class="list-unstyled">
                <li>
                    <a class="link-dark" href="#"><i class="bi bi-google"></i></a>
                </li>
                <li>
                    <a class="link-dark" href="#"><i class="bi bi-facebook"></i></a>
                </li>
            </ul>
            <div class="back-btn">
            <router-link class="link-dark bottom-hint d-flex align-items-center p-2 gap-2" to="/">
                <i class="bi bi-arrow-left fs-5"></i>
                <p class="mb-0 fs-5">Volver al inicio</p>
            </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LoginSidebar from '@/components/sidebars/Login.vue';
import loginForm from '@/Forms/loginForm.vue';
import * as Yup from 'yup';

export default defineComponent({
    name: 'LoginView',
    components: {
        LoginSidebar,
        loginForm
    },
    // SEO
    mounted() {
        document.title = 'S4T | Inicio de sesión';
    }, 
    data:() => {
        const formSchema={
            fields:[
                {
                    label:'Correo Electronico',
                    name: 'email',
                    as: 'input',
                    class:'form-control',
                    help:'Nunca compartiremos su correo con terceros.',
                    rules: Yup.string().email("Ingresar un Correo Valido").required("Campo Obligatorio")
                },
                {
                    label:'Contraseña',
                    name: 'password',
                    as:'input',
                    type:'password',
                    class:'form-control',
                    help:'Nunca le preguntaremos por su contraseña.',
                    rules: Yup.string().required("Campo Obligatorio")
                },
            ],
        };
        return{
            formSchema,
        };
    }
});
</script>

<style lang="less">
.form-content {
    flex-grow: 1;
}

.page{
    display: flex;
}

.form-title {
    font-size: 24px;
    width: 100%;
    padding: 0 0 10px;
    border-bottom: 2px solid #121212;
    text-align: center;
}

.main-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

#secondaryLogin{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.secondary-container ul{
    display: flex;
}

.secondary-container li{
    font-size: 30px;
    padding-left: 10px;
    padding-right: 10px;
}

</style>