<template>
    <form class="container d-flex flex-column w-50">
        <select class="form-select mb-3" aria-label="Default select example">
            <option selected>Operacion a realizar</option>
            <option value="1">Agregar producto</option>
            <option value="2">Eliminar producto</option>
            <option value="3">Actualizar producto</option>
        </select>
    </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'AdminForm'
});
</script>