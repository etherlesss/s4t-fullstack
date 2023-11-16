<template>
    <div class="summary right-container align-self-start d-flex flex-column w-100 w-md-25 p-3">
        <h2 id="section-title" class="summary-title">Resumen</h2>
        <div class="summary-content">
            <ul class="list-unstyled">
                <li class="d-flex justify-content-between">
                    <p>Subtotal</p>
                    <p>$99.99</p>
                </li>
                <li class="d-flex justify-content-between">
                    <p>Envío</p>
                    <p>$99.99</p>
                </li>
                <li class="d-flex justify-content-between">
                    <p>Total</p>
                    <p>$99.99</p>
                </li>
            </ul>
        </div>
        <div class="col text-center">
            <button class="btn btn-primary main-btn">Pagar</button>
        </div>
    </div>
</template>

<style lang="less">
.right-container {
    background-color: #ffffff;
    border-radius: 5px;
    margin-block: 12px;
}

.summary-title {
    font-size: 24px;
}

@media (min-width: 768px) {
    .right-container {
        flex: 0 0 25%;
        max-width: 25%;
    }
}
</style>