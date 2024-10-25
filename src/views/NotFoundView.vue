<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
function goHome(){
    router.push('/');
}
</script>
<template>
    <div class="flex flex-col justify-center h-[70vh] text-[#FFFED3]">
        <h1 class="text-4xl">Uh-Oh...</h1>
        <h3 class="text-xl mt-6">Sorry, the page you are looking for does not exist</h3>
        <button @click="goHome" class="text-lg mt-6 w-28 border border-[#FFB4C2] bg-[#FFB4C2] rounded-lg hover:bg-[#fc869b]">Go to Home</button>
    </div>
</template>