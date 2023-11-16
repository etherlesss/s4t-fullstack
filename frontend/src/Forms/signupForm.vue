<template>
    <div class="form-content">
        <div class="signup container-md w-75">
            <h2 class="w-25">Registro</h2>
            <Form class="row g-3">
                <div class="mb-3 col-12" v-for="{ as, name, label, children, ...attrs } in schema.fields" :key="name">
                    <label :for="name" class="form-label">{{ label }}</label>
                    <Field :as="as" :id="name" :class="attrs.class" :name="name" v-bind="attrs">
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
                        <select v-model="selectedRegion" class="form-control" id="Region">
                            <option v-for="region in regions" :value="region.id" :key="region.id">{{ region.name }}</option>
                        </select>
                    </div>
                    <div class="col-12" v-if="selectedRegion">
                        <label for="City">Selecciona una Ciudad</label>
                        <select v-model="selectedCity"  class="form-control" id="city">
                            <option v-for="city in cities[selectedRegion]" :value="city" :key="city">{{ city }}</option>
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
            selectedRegion: null,
            selectedCity:null,
            regions: citiesInfo.regions,
            cities: citiesInfo.cities,
        }
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