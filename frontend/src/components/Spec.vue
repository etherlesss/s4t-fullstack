<template>
    <div class="w-100" v-for="specLbl in specLbls">
        <h5 class="fw-bold">{{ specLbl }}</h5>
        <ul class="spec-list list-unstyled d-flex flex-wrap gap-5">
            <li v-for="spec in specs">
                <p class="fw-bold">{{ spec.titulo }}</p>
                <p>{{ spec.descripcion }}</p>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    data() {
        return {
            specLbls: ['Categoria1', 'Categoria2', 'Categoria3'],
            specs: [
                { titulo: 'Titulo1', descripcion: 'Descripcion1' },
                { titulo: 'Titulo2', descripcion: 'Descripcion2' },
                { titulo: 'Titulo3', descripcion: 'Descripcion3' },
                { titulo: 'Titulo4', descripcion: 'Descripcion4' },
                { titulo: 'Titulo5', descripcion: 'Descripcion5' },
                { titulo: 'Titulo6', descripcion: 'Descripcion6' },
                { titulo: 'Titulo7', descripcion: 'Descripcion7' },
            ]
        }
    },
    name: 'Spec'
})
</script>