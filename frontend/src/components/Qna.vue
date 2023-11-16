<template>
    <div class="container">
        <div class="row">
            <div class="col-12 col-md-6 offset-md-3">
                <div class="content d-flex flex-column text-center">
                    <h1 id="section-title">PREGUNTAS FRECUENTES</h1>
                    <ul class="qna list-unstyled mt-4">
                        <li v-for="question in questions" :key="question.id">
                            <h2>{{ question.pregunta }}</h2>
                            <p>{{ question.respuesta }}</p>
                        </li>
                    </ul>
                    <p class="mt-4">¿Tiene una duda y no está aquí? Escríbanos <a href="#">aquí</a>.</p>
                    <a href="#">Términos y condiciones.</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import qnaData from '../json/qnaData.json';

export default defineComponent({
    data() {
        return {
            questions: qnaData
        }
    },
    name: 'Qna'
});
</script>