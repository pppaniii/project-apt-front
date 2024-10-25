<script setup lang="ts">
import type { Medal } from '@/types';
import { RouterLink } from 'vue-router';

const props = defineProps<{
    medal: Medal
}>()
</script>

<template>
    <RouterLink class="no-underline" :to="{ name: 'country-detail', params: { id: props.medal.id } }">
        <div class="w-[95%] max-w-[95%] p-2.5 cursor-pointer mx-auto border border-black rounded-lg mb-4 bg-[#FFFFFF] flex flex-col items-center gap-2 hover:bg-[#D1E9F6]
                    md:w-[800px] md:flex-row md:justify-between md:p-2.5">
            <div class="w-full flex justify-center gap-3 md:w-1/5 md:gap-0">
                <img :src="medal.flag_url" alt="Country flag" class="max-w-[30%] h-auto border border-[#bbbbbb] md:max-w-[80px] md:ml-8" />
            </div>
            <div class="w-full text-[#B1AFFF] text-[20px] font-black text-center mt-2 md:text-2xl md:mt-0 md:mx-4">
                {{ props.medal.name }}
            </div>
            <div class="w-full flex items-center gap-1 text-[#B1AFFF] text-[18px] font-medium justify-center 
                        md:w-1/3 md:gap-4 md:text-xl md:mr-6">
                <p>{{ props.medal.gold_medals }}</p>
                <p>{{ props.medal.silver_medals }}</p>
                <p>{{ props.medal.bronze_medals }}</p>
            </div>
        </div>
    </RouterLink>
</template>