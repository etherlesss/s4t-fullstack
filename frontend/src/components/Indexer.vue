<template>
    <div class="container w-75 indexer-container p-5">
        <div class="d-flex">
            <input class="form-control me-2" type="search" placeholder="Buscar producto..." aria-label="Search" @change="onSearch">
            <button class="btn btn-outline-success" type="submit" @click="search">Buscar</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Indexer',
    methods: {
        onSearch(event: any) {
            const value = event.target.value;
            this.$emit('search', value);
        },
        search() {
            const value = (this.$el.querySelector('input') as HTMLInputElement).value;
            this.$emit('search', value);
        }
    }
});
</script>

<style lang="less">
.indexer-container {
    background-color: #eeeeee;
    border-radius: 10px;
    margin-block: 3%;
}
</style>