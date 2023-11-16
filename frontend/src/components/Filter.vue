<template>
    <div class="sidebar-content">
        <h2 id="section-title">Filtros</h2>
        <section>
            <h4>Disponibilidad</h4>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="">
                <label class="form-check-label" for="">
                    Mostrar productos agotados
                </label>
            </div>
        </section>
        <section>
            <h4>Categorias</h4>
            <ul class="list-group list-unstyled">
                <li v-for="category in categories">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="">
                        <label class="form-check-label" for="">
                            {{ category }}
                        </label>
                    </div>
                </li>
            </ul>
        </section>
        <section>
            <h4>Marcas</h4>
            <ul class="list-group list-unstyled">
                <li v-for="brand in brands">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="">
                        <label class="form-check-label" for="">
                            {{ brand }}
                        </label>
                    </div>
                </li>
            </ul>
        </section>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getFilters, getCategories } from "../api/utils";

export default defineComponent({
    data() {
        return {
            brands: [] as string[],
            categories: [] as string[]
        }
    },
    async mounted() {
        try {
            this.brands = await getFilters();
            this.categories = await getCategories();
        } catch (error) {
            console.error("Error fetching filters:", error);
        }
    },
    name: 'Filters'
})
</script>