<template>
    <div class="container w-75 indexer-container p-5">
        <form class="d-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="Buscar producto..." aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Buscar</button>
        </form>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Indexer'
});
</script>

<style lang="less">
.indexer-container {
    background-color: #eeeeee;
    border-radius: 10px;
    margin-block: 3%;
}
</style>