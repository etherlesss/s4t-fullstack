<template>
    <form class="container d-flex flex-column w-75">
        <select class="form-select mb-3" v-model="selectedOption" aria-label="Default select example">
            <option disabled selected value="">Operacion a realizar</option>
            <option value="1">Agregar producto</option>
            <option value="2">Eliminar producto</option>
            <option value="3">Actualizar producto</option>
        </select>
        <div v-if="selectedOption === '1'">
            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="floatingInput" placeholder="Ej: 1, 2, 3...">
                <label for="floatingInput">ID del producto</label>
            </div>
            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="floatingInput" placeholder="Ej: Audífonos Logitech G233 Prodigy">
                <label for="floatingInput">Nombre del producto</label>
            </div>
            <div class="form-floating mb-3">
                <textarea class="form-control" placeholder="Descripción del producto" id="floatingTextarea" style="height: 200px;" maxlength="500"></textarea>
                <label for="floatingTextarea">Descripción del producto</label>
            </div>
            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="floatingInput" placeholder="Ej: 29990">
                <label for="floatingInput">Precio del producto</label>
            </div>
            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="floatingInput" placeholder="Ej: 2">
                <label for="floatingInput">Stock del producto</label>
            </div>
            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="floatingInput" placeholder="Ej: imagen">
                <label for="floatingInput">Imagen del producto (URL)</label>
            </div>
            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="floatingInput" placeholder="Ej: 29990">
                <label for="floatingInput">Marca</label>
            </div>
            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="floatingInput" placeholder="Ej: 29990">
                <label for="floatingInput">Categoría</label>
            </div>
            <input class="btn btn-primary main-btn" type="submit" value="Enviar">
        </div>

        <div v-else-if="selectedOption === '2'">
            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="floatingInput" placeholder="Ej: 1, 2, 3...">
                <label for="floatingInput">ID del producto</label>
            </div>
            <input class="btn btn-primary main-btn" type="submit" value="Enviar">
        </div>
        
        <div v-else-if="selectedOption === '3'">
            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="floatingInput" placeholder="Ej: 1, 2, 3...">
                <label for="floatingInput">ID del producto</label>
            </div>
            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="floatingInput" placeholder="Ej: Audífonos Logitech G233 Prodigy">
                <label for="floatingInput">Nombre del producto</label>
            </div>
            <div class="form-floating mb-3">
                <textarea class="form-control" placeholder="Descripción del producto" id="floatingTextarea" style="height: 200px;" maxlength="500"></textarea>
                <label for="floatingTextarea">Descripción del producto</label>
            </div>
            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="floatingInput" placeholder="Ej: 29990">
                <label for="floatingInput">Precio del producto</label>
            </div>
            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="floatingInput" placeholder="Ej: 2">
                <label for="floatingInput">Stock del producto</label>
            </div>
            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="floatingInput" placeholder="Ej: imagen">
                <label for="floatingInput">Imagen del producto (URL)</label>
            </div>
            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="floatingInput" placeholder="Ej: 29990">
                <label for="floatingInput">Marca</label>
            </div>
            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="floatingInput" placeholder="Ej: 29990">
                <label for="floatingInput">Categoría</label>
            </div>
            <input class="btn btn-primary main-btn" type="submit" value="Enviar">
        </div>
    </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'AdminForm',
    data() {
        return {
            selectedOption: ''
        }
    }
});
</script>