<template>
    <div id="carouselExampleAutoplaying" class="carousel slide mb-5" data-bs-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item" v-for="img in carouselContent" :key="img.id" :class="{'active': img.id == 1}">
                <img :src="img.src" class="d-block w-100" :alt="img.alt">
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import carData from '../json/carouselData.json'

export default defineComponent({
    data() {
        return {
            carouselContent: carData
        }
    },
    name: 'Carousel'
});
</script>