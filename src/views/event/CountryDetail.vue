<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import CountryService from '@/services/CountryService';
import OlympicService from '@/services/OlympicService';
import type { Detail } from '@/types';
import type { Medal } from '@/types';

const detail = ref<Detail | null>(null);
const medal = ref<Medal | null>(null);
const route = useRoute();

onMounted(() => {
  const id = parseInt(route.params.id as string, 10);
  if (!isNaN(id)) {
    OlympicService.getMedalByCountryName(id)
      .then(response => {
        medal.value = response.data;
        return CountryService.getDetailById(response.data.id);
      })
      .then(response => {
        detail.value = response.data;
      })
      .catch(error => {
        console.error('Failed to fetch details:', error);
      });
  }
});
</script>

<template>
  <div class="flex justify-center items-center h-[50vh] md:h-[60vh]">
    <div v-if="detail && medal" class="mt-8 w-[350px] p-5 bg-[#FFFED3] rounded-[50px] shadow-md text-center relative">
      <div class="absolute top-[-50px] left-1/2 transform -translate-x-1/2">
        <img :src="medal.flag_url" alt="Country flag" class="w-40 border-2 border-[#bbbbbb] rounded-md object-cover"/>
      </div>
      <div class="mt-16 mb-8">
        <h1 class="text-[#B1AFFF] text-3xl mb-2">{{ detail.name }}</h1>
        <p class="font-medium text-base text-[#35336b]">Continent size: {{ detail.size }}</p>
        <p class="font-medium text-base text-[#35336b]">Population: {{ detail.population }}</p>
      </div>  
    </div>
    <div v-else class="text-white">
      <p>Loading details...</p>
    </div>
  </div>
</template>