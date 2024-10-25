<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useMessageStore } from './stores/message';
import { storeToRefs } from 'pinia';
const store = useMessageStore()
storeToRefs(store)
</script>

<template>
  <div id="layout" class="font-pixelify font-medium"> 
    <!-- <header class="bg-[#6a71a5] w-full py-4 shadow-md fixed top-0 left-0">
        <nav class="ml-20">
          <RouterLink class="text-[24px] font-bold text-[#ffec9c] no-underline hover:text-[#e95973]" 
            :to="{ name: 'medal-list-view' }">Home
          </RouterLink> 
        </nav>
    </header> -->
    <RouterView />
  </div>
</template>