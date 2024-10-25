<script setup lang = "ts">
import { useRouter } from 'vue-router';
const router = useRouter()
function retry(){
    router.go(0); // refresh the current page
}
</script>

<template>
    <div class="nt-error-container">
        <h1>Oops!</h1>
        <h3>It seems there was a problem connecting to the network.</h3>
        <p>Please check your internet connection and try again.</p>
        <div>
            <button @click="retry">Retry</button>
            <RouterLink to="/">Go to Home</RouterLink>
        </div>
    </div>
</template>

<style>
.nt-error-container {
    margin-top: 100px;
}
</style>