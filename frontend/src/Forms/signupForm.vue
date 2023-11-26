<template>
    <div class="form-content">
        <div class="signup container-md w-75">
            <h2 class="w-25">Registro</h2>
            <Form class="row g-3" @submit="submitForm">
                <div class="mb-3 col-12" v-for="{ as, name, label, children, ...attrs } in schema.fields" :key="name">
                    <label :for="name" class="form-label">{{ label }}</label>
                    <Field :as="as" :id="name" :class="attrs.class" :name="name" v-bind="attrs" v-model="formData[name]">
                        <template v-if="children && children.length">
                            <component v-for="({ tag, text, ...childAttrs }, idx) in children" :key="idx" :is="tag"
                                v-bind="childAttrs">
                                {{ text }}
                            </component>
                        </template>
                        

                    </Field>
                    <ErrorMessage :name="name" class="error-message" />
                </div>
                <div>
                    <div class="col-12">
                        <label for="Region">Selecciona una Región</label>
                        <select v-model="formData.selectedRegion" class="form-control" id="Region">
                            <option v-for="region in regions" :value="region.id" :key="region.id">{{ region.name }}</option>
                        </select>
                    </div>
                    <div class="col-12" v-if="formData.selectedRegion">
                        <label for="City">Selecciona una Ciudad</label>
                        <select v-model="formData.selectedCity"  class="form-control" id="city">
                            <option v-for="city in cities[formData.selectedRegion]" :value="city" :key="city">{{ city }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-12">
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1">
                        <label class="form-check-label" for="exampleCheck1">Acepto los <a href="#">términos y
                                condiciones</a>.</label>
                    </div>
                    <label class="form-check-label" for="exampleCheck1">¿Ya tienes cuenta? Inicia sesión <router-link
                            to="/login">aquí</router-link>.</label>
                </div>
                <div class="col-12">
                    <button type="submit" class="btn btn-primary main-btn" id="btnSignUp">Registrarse</button>
                </div>
            </Form>
        </div>
    </div>
</template>

<script lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate';
import citiesInfo from '../json/signup_data.json';
import axios from 'axios';

export default {
    name: 'loginForm',
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    props: {
        schema: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            formData: {
                User: '',
                Rut: '',
                email: '',
                Password: '',
                ConfirmPassword: '',
                selectedRegion: [],
                selectedCity: [],
            },
            selectedRegion: null,
            selectedCity: null,
            regions: citiesInfo.regions,
            cities: citiesInfo.cities,
        };
    },
    methods: {
        async submitForm() {
            try {
                //en mi cabeza tiene sentido
                const verify = await axios.post('http://localhost:5000/register',{

                    rut:(this as any).formData.Rut,
                    nombre_usuario:(this as any).formData.User,
                    mail:(this as any).formData.email,
                    contrasenya:(this as any).formData.Password,
                    region:(this as any).formData.selectedRegion,
                    ciudad:(this as any).formData.selectedCity,
                });
            }
            catch(error){
                console.log(error);
            }
        },
    },
};
</script>
<style lang="less">
.error-message {
    color: red;
}

.signup {
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 50px;
    padding-bottom: 50px;
}

.signup h2 {
    font-size: 24px;
    width: 100%;
    padding: 0 0 10px;
    border-bottom: 2px solid #121212;
    text-align: center;
}
</style>