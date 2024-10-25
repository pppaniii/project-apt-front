<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useMessageStore } from './stores/message';
import { storeToRefs } from 'pinia';
const store = useMessageStore()
storeToRefs(store)
</script>

<template>
  <div id="layout" class="font-regular"> 
    <header class="bg-[#D3B965] w-full py-4 shadow-md fixed top-0 left-0">
        <nav class="ml-16">
          <RouterLink class="text-[24px] text-[#FBF4DF] font-bold no-underline hover:text-[#001231] font-cinzel" 
            :to="{ name: 'medal-list-view' }">APT
          </RouterLink> 
          <RouterLink class="text-[18px] text-[#FBF4DF] no-underline hover:text-[#001231] ml-10" 
            :to="{ name: 'medal-list-view' }">Home
          </RouterLink> 
          <RouterLink class="text-[18px] text-[#FBF4DF] no-underline hover:text-[#001231] ml-10" 
            :to="{ name: 'network-error' }">Error
          </RouterLink> 
        </nav>
    </header>
    <RouterView />
  </div>
</template>