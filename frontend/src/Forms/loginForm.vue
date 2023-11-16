<template>
    <div class="form-content">
        <div class="main-content container-md w-75">
            <h2 class="w-25">Iniciar sesión</h2>
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
                    <div class="form-text">{{ attrs.help }}</div>

                </div>
                <div class="mb-3 col-12">
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1">
                        <label class="form-check-label" for="exampleCheck1">Recuérdame</label>
                    </div>
                    <label class="form-check-label" for="exampleCheck1">¿No tienes cuenta? Registrate
                        <router-link to="/signup">aquí</router-link>.
                    </label>
                </div>
                <div class="mb-3 col-12">
                    <button type="submit" class="btn btn-primary main-btn">Iniciar sesión</button>
                </div>
            </Form>
        </div>
    </div>
</template>
  
<script lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate';

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
};
</script>
  
<style lang="less">
.error-message {
    color: red;
}


.main-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

h2 {
    font-size: 24px;
    width: 100%;
    padding: 0 0 10px;
    border-bottom: 2px solid #121212;
    text-align: center;
}
</style>
  