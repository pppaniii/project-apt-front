<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import CountryService from '@/services/CountryService';
import type { Detail } from '@/types';

const detail = ref<Detail | null>(null);
const route = useRoute();

onMounted(() => {
  const id = parseInt(route.params.id as string, 10);
  if (!isNaN(id)) {
    CountryService.getDetailById(id)
      .then(response => {
        detail.value = response.data;
      })
      .catch(error => {
        console.error('Failed to fetch details:', error)
      });
  }
});
</script>

<template>
  <div class="flex justify-center items-center h-[50vh] md:h-[60vh]">
    <table v-if="detail" class="w-[600px] h-[300px] border-collapse bg-[#FFFED3]">
      <thead>
        <tr class="p-2 h-16 text-center text-[#D1E9F6] text-xl bg-[#B1AFFF]">
          <th>Medal Type</th>
          <th>Sport</th>
        </tr>
      </thead>
      <tbody>
        <tr class="hover:bg-[#f6f5b1]">
          <td class="text-center p-2 text-[#35336b] font-medium text-lg">
            Gold
          </td>
          <td class="text-center p-2 text-[#35336b] font-medium text-lg">
            {{ detail.gold_medal_sport }}
          </td>
        </tr>
        <tr class="hover:bg-[#f6f5b1]">
          <td class="text-center p-2 text-[#35336b] font-medium text-lg">
            Silver
          </td>
          <td class="text-center p-2 text-[#35336b] font-medium text-lg">
            {{ detail.silver_medal_sport }}
          </td>
        </tr>
        <tr class="hover:bg-[#f6f5b1]">
          <td class="text-center p-2 text-[#35336b] font-medium text-lg">
            Bronze
          </td>
          <td class="text-center p-2 text-[#35336b] font-medium text-lg">
            {{ detail.bronze_medal_sport }}
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else>
      <p class="text-white">Loading details...</p>
    </div>
    
  </div>
</template>