
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import OlympicService from '@/services/OlympicService';
import type { Medal } from '@/types';

const medal = ref<Medal | null>(null);
const route = useRoute();

onMounted(() => {
  const id = parseInt(route.params.id as string, 10);
  if (!isNaN(id)) {
    OlympicService.getMedalByCountryName(id)
      .then(response => {
        medal.value = response.data;
      })
      .catch(error => {
        console.error('Failed to fetch medal details:', error)
      });
  }
});
</script>

<template>
  <div class="flex justify-center items-center h-[50vh] md:h-[60vh]">
    <table v-if="medal" class="w-[450px] h-[350px] mt-7 border-collapse bg-[#FFFED3]">
      <thead>
        <tr class="p-2 h-16 text-center text-[#D1E9F6] text-xl bg-[#B1AFFF]">
          <th>Medal Type</th>
          <th>Count</th>
        </tr>
      </thead>
      <tbody>
        <tr class="p-2 text-center text-lg text-[#35336b] font-medium hover:bg-[#f6f5b1]">
          <td>Gold</td>
          <td>{{ medal.gold_medals }}</td>
        </tr>
        <tr class="p-2 text-center text-lg text-[#35336b] font-medium hover:bg-[#f6f5b1]">
          <td>Silver</td>
          <td>{{ medal.silver_medals }}</td>
        </tr>
        <tr class="p-2 text-center text-lg text-[#35336b] font-medium hover:bg-[#f6f5b1]">
          <td>Bronze</td>
          <td>{{ medal.bronze_medals }}</td>
        </tr>
        <tr class="p-2 text-center text-lg text-[#35336b] font-medium hover:bg-[#f6f5b1]">
          <td>Total</td>
          <td>{{ medal.total_medals }}</td>
        </tr>
        <tr class="p-2 text-center text-lg text-[#35336b] font-medium hover:bg-[#f6f5b1]">
          <td>Rank</td>
          <td>{{ medal.rank }}</td>
        </tr>
      </tbody>
    </table>
    <div v-else class="text-white">
      <p>Loading details...</p>
    </div>
    
  </div>
</template>