<script setup lang="ts">
import OlympicCard from '@/components/OlympicCard.vue';
import type { Medal } from '@/types';
import { ref, watchEffect, computed, watch } from 'vue';
import OlympicService from '@/services/OlympicService';
import type { AxiosResponse } from 'axios';
import { useRoute, useRouter } from 'vue-router';

// Define the props for the component
const props = defineProps<{
  limit: number;
  page: number;
}>();

const medals = ref<Medal[]>([]);
const totalMedal = ref<number>(0);
const router = useRouter();
const pageSizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const pageSize = ref(pageSizes[1]);
const route = useRoute();

const updatePageSize = () => {
  // Update the page size and reset to page 1
  router.push({
    name: 'medal-list-view',
    query: { ...route.query, pageSize: pageSize.value, page: 1 },
  });
};

watch(
  () => route.query.pageSize,
  (newSize) => {
    if (newSize) {
      pageSize.value = parseInt(newSize.toString());
    }
  }
);

// Set pageSize based on route query if it exists
if (route.query.pageSize) {
  pageSize.value = parseInt(route.query.pageSize.toString());
}

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalMedal.value / pageSize.value); // Use pageSize.value here
  return props.page < totalPages && medals.value.length > 0;
});

// Fetch medals whenever page or pageSize changes
watchEffect(() => {
  const limit = pageSize.value; // Use the current page size as the limit
  const page = props.page;

  OlympicService.getMedals(limit, page)
    .then((response: AxiosResponse<Medal[]>) => {
      medals.value = response.data;
      totalMedal.value = parseInt(response.headers['x-total-count'], 10);
    })
    .catch((error) => {
      console.log(error);
      if (error.response && error.response.status === 404) {
        router.push({ name: '404-resource', params: { resource: 'page' } });
      } else {
        router.push({ name: 'network-error' });
      }
    });
});
</script>

<template>
  <div>
    <img src="/src/assets/olympicIcon.png" alt="olympicIcon" class="w-[80px]">
    <h1 class="text-4xl text-[#26294D]">Medal Table</h1>
    <div>
      <label class="text-xl font-medium text-[#FFB4C2] mr-2.5" for="page-size">countries per page</label>
      <select id="page-size" class="rounded-lg" v-model="pageSize" @change="updatePageSize">
        <option
          v-for="size in pageSizes"
          :key="size"
          :value="size"
          >{{ size }}</option
        >
      </select>
    </div>
  </div>
  <div class="mt-12 flex flex-col items-center">
    <OlympicCard v-for="medal in medals" :key="medal.id" :medal="medal" />
    <div class="mt-8 flex gap-12 text-center">
      <RouterLink :to="{ name: 'medal-list-view', query: { page: props.page - 1 } }" rel="prev" v-if="props.page != 1"
        class="w-28 border-2 border-white rounded-lg text-lg font-bold text-[#FFEC9C] bg-[#6A71A5] hover:text-[#fc869b]">
          Prev page
      </RouterLink>
      <RouterLink :to="{ name: 'medal-list-view', query: { page: props.page + 1 } }" rel="next" v-if="hasNextPage"
        class="w-28 border-2 border-white rounded-lg text-lg font-bold text-[#FFEC9C] bg-[#6A71A5] hover:text-[#fc869b]">
          Next page
      </RouterLink>
    </div>
  </div>
</template>