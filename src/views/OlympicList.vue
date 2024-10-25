<script setup lang="ts">
import OlympicCard from '@/components/OlympicCard.vue';
import type { Medal } from '@/types';
import { ref, watchEffect, computed, watch, onMounted, onBeforeUnmount } from 'vue';
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
const pageSizes = [1, 3, 5, 10];
const pageSize = ref(pageSizes[1]);
const route = useRoute();
const headerShrink = ref(false); // Add state to track if the header is shrunk

const updatePageSize = () => {
  router.push({
    name: 'medal-list-view',
    query: { ...route.query, pageSize: pageSize.value, page: 1 },
  });
};

// Detect if page size exists in the query params
if (route.query.pageSize) {
  pageSize.value = parseInt(route.query.pageSize.toString());
}

// Calculate if there's a next page
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalMedal.value / pageSize.value);
  return props.page < totalPages && medals.value.length > 0;
});

// Fetch medals based on page and pageSize
watchEffect(() => {
  const limit = pageSize.value;
  const page = props.page;

  OlympicService.getMedals(limit, page)
    .then((response: AxiosResponse<Medal[]>) => {
      medals.value = response.data;
      totalMedal.value = parseInt(response.headers['x-total-count'], 10);
    })
    .catch((error) => {
      if (error.response && error.response.status === 404) {
        router.push({ name: '404-resource', params: { resource: 'page' } });
      } else {
        router.push({ name: 'network-error' });
      }
    });
});

// Add scroll event listener
const handleScroll = () => {
  const scrollPosition = window.scrollY;
  if (scrollPosition > 100) {
    headerShrink.value = true; // Shrink the header when scrolling down
  } else {
    headerShrink.value = false; // Reset when at the top
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div :class="['headpart', headerShrink ? 'headpart-shrink' : '']">
    <img src="/src/assets/olympicIcon.png" alt="olympicIcon" class="w-[80px]" />
    <h1 class="head-topic">MEDAL TABLE</h1>
    <div class="head-select">
      <label class="head-detail">Country Per Page</label>
      <select id="page-size" v-model="pageSize" @change="updatePageSize">
        <option v-for="size in pageSizes" :key="size" :value="size">{{ size }}</option>
      </select>
    </div>
  </div>

  <div :class="['table-header-container', headerShrink ? 'table-header-shrink' : '']">
    <div class="table-header">
      <div class="order-header">Order</div>
      <div class="country-header">Name of Countries</div>
      <div class="medals-header">
        <img src="/src/assets/gold-medal.png" alt="Gold" class="medal-icon" />
        <img src="/src/assets/silver-medal.png" alt="Silver" class="medal-icon" />
        <img src="/src/assets/bronze-medal.png" alt="Bronze" class="medal-icon" />
        <img src="/src/assets/total-medal.png" alt="Total" class="medal-icon" />
      </div>
    </div>
  </div>

  <div>
    <OlympicCard v-for="(medal, index) in medals" :key="medal.id" :medal="medal" :order="(props.page - 1) * pageSize + index + 1" />
    <div class="pagination">
      <RouterLink class="prev-page" :to="{ name: 'medal-list-view', query: { page: props.page - 1 } }" rel="prev" v-if="props.page !== 1">
        &lt; Prev page
      </RouterLink>
      <RouterLink class="next-page" :to="{ name: 'medal-list-view', query: { page: props.page + 1 } }" rel="next" v-if="hasNextPage">
        Next page &gt;
      </RouterLink>
    </div>
  </div>
</template>

<style>
.headpart {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
  transition: all 0.3s ease;
}

.head-topic {
  font-size: 24px;
  font-weight: 600;
  text-align: center;
}

.head-select {
  margin-bottom: 20px;
}

#page-size {
  background-color: #F3DA97;
  width: 40px;
  border-radius: 5px;
  margin-left: 10px;
}

.table-header-container {
  background-color: #000;
  width: 100%;
  position: sticky;
  top: 68px;
  z-index: 100;
}

.table-header {
  width: 800px;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  padding: 20px;
  margin-bottom: 20px;
}

.order-header {
  flex: 0 0 100px;
  text-align: center;
}

.country-header {
  width: 280px;
}

.medals-header {
  width: 350px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
}

.medal-icon {
  width: 30px;
  height: 30px;
}

.pagination {
  display: flex;
  justify-content: space-between; 
  margin-top: 2rem;
  margin-bottom: 5rem;
  width: 100%;
}

.prev-page {
  width: 100px;
}

.next-page {
  margin-left: auto; 
  width: 100px; 
  text-align: right;
}

@media (max-width: 768px) {
  .table-header {
    flex-direction: row; 
    justify-content: space-between;
    padding: 10px 5px;
    width: 100%;
    box-sizing: border-box;
  }

  .card-order {
    flex: 0 0 50px; /* Shrink the order box a bit */
    text-align: center;
  }

  .card-contryname {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-start; 
    gap: 10px; 
  }

  .flag-img {
    width: 40px;
    height: auto;
  }

  .number-of-medal {
    display: flex;
    justify-content: space-between;
    width: 150px;
    text-align: center;
  }
  
  .pagination {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    width: 100%;
  }

  .prev-page, .next-page {
    width: auto;
  }
}
</style>
