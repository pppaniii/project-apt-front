<script setup lang="ts">
import { ref } from 'vue';
import CountryService from '@/services/CountryService';
import OlympicService from '@/services/OlympicService';
import { RouterView } from 'vue-router';
import { useRouter } from 'vue-router';
import type { Medal } from '@/types';
import type { Detail } from '@/types';

const medal = ref<Medal | null>(null);
const detail = ref<Detail | null>(null);
const router = useRouter();

const props = defineProps({
    id: String,
});

OlympicService.getMedalByCountryName(Number(props.id))
    .then((response) => {
        medal.value = response.data;
    })
    .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 404) {
            router.push({ name: '404-resource', params: { resource: 'medal' } });
        } else {
            router.push({ name: 'network-error' });
        }
    });

CountryService.getDetailById(Number(props.id))
    .then((response) => {
        detail.value = response.data;
    })
    .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 404) {
            router.push({ name: '404-resource', params: { resource: 'detail' } });
        } else {
            router.push({ name: 'network-error' });
        }
    });
</script>

<template>
    <div v-if="medal">
        <div id="nav" class="mt-36 text-[#FFB4C2] text-center items-center inline-flex gap-2">
            <RouterLink
                :to="{ name: 'country-detail', params: { id } }"
                class="font-bold text-[20px] mx-0 hover:text-[#fc869b] no-underline md:inline-block md:mx-4 md:my-2"
                >Country Detail
            </RouterLink>
            |
            <RouterLink
                :to="{ name: 'medal-detail', params: { id } }"
                class="font-bold text-[20px] mx-0 hover:text-[#fc869b] no-underline md:inline-block md:mx-4 md:my-2"
                >Medal Table
            </RouterLink>
            |
            <RouterLink
                :to="{ name: 'sport-detail', params: { id } }"
                class="font-bold text-[20px] mx-0 hover:text-[#fc869b] no-underline md:inline-block md:mx-4 md:my-2"
                >Sports Detail
            </RouterLink>
            |
            <RouterLink
                :to="{ name: 'cheerup-view', params: { id } }"
                class="font-bold text-[20px] mx-0 hover:text-[#fc869b] no-underline md:inline-block md:mx-4 md:my-2"
                >Cheer Up
            </RouterLink>
       </div>
        
        <RouterView :medal="medal" ></RouterView>
    </div>
</template>