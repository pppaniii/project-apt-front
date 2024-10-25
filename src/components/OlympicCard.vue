<script setup lang="ts">
import type { Medal } from '@/types';
import { RouterLink } from 'vue-router';

const props = defineProps<{
    medal: Medal
    order: number;
}>()

</script>

<template>
    <RouterLink class="Card" :to="{ name: 'country-detail', params: { id: props.medal.id } }">
        <div class="card-container">
            <div class="card-order">{{ props.order }}</div>
            <div class="card-contryname">
                <img :src="medal.flag_url" alt="Country flag" class="flag-img"/>
                <p>{{ props.medal.name }}</p>
            </div>
            <div class="number-of-medal">
                <p>{{ props.medal.gold_medals }}</p>
                <p>{{ props.medal.silver_medals }}</p>
                <p>{{ props.medal.bronze_medals }}</p>
                <p>{{ props.medal.total_medals }}</p>
            </div>
        </div>
    </RouterLink>
</template>

<style>

.card-container {
    background-color: #fff;
    width: 800px;
    height: 80px;
    border: 1px solid black;
    border-radius: 10px;
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    padding: 15px;
    cursor: pointer;
}

.card-container:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.card-order {
    flex: 0 0 100px;
    text-align: center;
}

.card-contryname {
    width: 300px;
    display: flex;
    align-items: center;
    gap: 40px;
    margin-left: 10px;
}

.flag-img {
    width: 80px;
    height: auto;
    border: 1px solid #c4c4c4;
}

.number-of-medal {
    width: 300px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

@media (max-width: 768px) {
  .card-container {
    padding: 10px; 
    margin-bottom: 10px;
    max-width: 100%; 
  }

  .card-order {
    flex: 0 0 40px; 
    font-size: 14px; 
  }

  .card-contryname {
    gap: 8px;
  }

  .flag-img {
    width: 30px; 
  }

  .number-of-medal {
    width: 120px; 
    font-size: 14px;
  }
}

</style>