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

// Mock fields to handle capital, currency, and languages that are not in Detail interface
const mockCapital = ref('Not Available');
const mockCurrency = ref('Not Available');
const mockLanguages = ref('Not Available');

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

        // Optionally, set some mock data for the fields not available in types.ts
        mockCapital.value = 'Capital City Example';  // You can replace this with actual data if available
        mockCurrency.value = 'Currency Example';    // Example data
        mockLanguages.value = 'English, French';    // Example languages
      })
      .catch(error => {
        console.error('Failed to fetch details:', error);
      });
  }
});
</script>

<template>
  <div class="w-full px-4 py-8">
    <!-- Top Section: Flag and Basic Country Info -->
    <div v-if="detail && medal" class="flex flex-col md:flex-row bg-[#FFFED3] rounded-lg shadow-md p-8">
      <!-- Country Flag on the Left -->
      <div class="flex justify-center md:w-1/3 mb-6 md:mb-0">
        <img :src="medal.flag_url" alt="Country flag" class="w-40 h-auto border-2 border-[#bbbbbb] rounded-md" />
      </div>
      
      <!-- Country Information on the Right -->
      <div class="md:w-2/3 md:pl-8">
        <h1 class="text-3xl font-bold text-[#26294D] mb-4">{{ detail.name }}</h1>
        <p><strong>Capital City:</strong> {{ mockCapital }}</p> <!-- Mock field -->
        <p><strong>Currency:</strong> {{ mockCurrency }}</p>   <!-- Mock field -->
        <p><strong>Continent:</strong> {{ detail.size }}</p>   <!-- Available in Detail type -->
        <p><strong>Population:</strong> {{ detail.population }}</p> <!-- Available in Detail type -->
        <p><strong>Official Languages:</strong> {{ mockLanguages }}</p> <!-- Mock field -->
      </div>
    </div>

    <!-- Country Description and Olympic History -->
    <div v-if="detail && medal" class="mt-10 bg-[#FFFED3] p-6 rounded-lg shadow-md">
      <h2 class="text-xl font-bold text-[#26294D] mb-4">Olympic History</h2>
      <p class="text-base">
        {{ detail.name }} is a nation located in {{ detail.size }}, with a population of approximately {{ detail.population }}. The capital city is {{ mockCapital }}, serving as the political and cultural hub of the country.
      </p>
      <p class="mt-4 text-base">
        {{ detail.name }} has a proud Olympic history, having first participated in the Olympics in [First Year of Participation]. Since then, the country has made [Number of Olympic Appearances] appearances in the Olympic Games. 
      </p>
      <p class="mt-4 text-base">
        {{ detail.name }} has earned a total of {{ medal.total_medals }} medals, including {{ medal.gold_medals }} gold, {{ medal.silver_medals }} silver, and {{ medal.bronze_medals }} bronze medals.
      </p>
      <p class="mt-4 text-base">
        This achievement highlights the dedication of the country's athletes and their commitment to excellence on the world stage.
      </p>
    </div>

    <!-- Loading State -->
    <div v-else class="text-white mt-6">
      <p>Loading details...</p>
    </div>
  </div>
</template>
