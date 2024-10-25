<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import CountryService from '@/services/CountryService';
import { useCheerUpStore } from '@/stores/cheerUpStore'; // Import the store
import type { Detail } from '@/types';

const detail = ref<Detail | null>(null);
const route = useRoute();
const cheerUpStore = useCheerUpStore(); // Use the cheerUpStore

const newComment = ref('');
const comments = ref<string[]>([]);

// Fetch comments and details for the current country or sport
onMounted(() => {
  const id = parseInt(route.params.id as string, 10);
  if (!isNaN(id)) {
    CountryService.getDetailById(id)
      .then(response => {
        detail.value = response.data;
      })
      .catch(error => {
        console.error('Failed to fetch details:', error);
      });

    comments.value = cheerUpStore.getComments(id); // Fetch existing comments
  }
});

// Handle comment submission
function handleSubmit() {
  const id = parseInt(route.params.id as string, 10);
  if (newComment.value.trim()) {
    cheerUpStore.addComment(id, newComment.value.trim()); // Add comment to store
    comments.value = cheerUpStore.getComments(id); // Update the comments list
    newComment.value = ''; // Clear the input
  }
}
</script>

<template>
  <div class="flex flex-col justify-center items-center">
    <!-- Medal Detail Table -->
    <table v-if="detail" class="w-[600px] h-[300px] border-collapse bg-[#FFFED3] mb-10">
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

    <!-- Cheer Up Section and Comments -->
    <div class="w-full flex flex-col md:flex-row justify-between mt-8">

      <!-- Cheer Up Form (Left Column) -->
      <div class="cheer-up-section w-full md:w-1/2 pr-6">
        <h2 class="text-xl text-[#26294D]">Cheer Up Your Athlete Here</h2>
        <form @submit.prevent="handleSubmit" class="flex flex-col gap-2.5">
          <textarea
            v-model="newComment"
            placeholder="Write your comment here..."
            rows="4"
            required
            class="w-full text-base mt-5 p-2"
          ></textarea>
          <button
            type="submit"
            class="w-28 border-2 border-white rounded-lg text-lg text-[#ffec9c] hover:text-[#fc869b] bg-[#6a71a5] mt-3"
          >
            Submit
          </button>
        </form>
      </div>

      <!-- Comments Section (Right Column) -->
      <div class="comments-section w-full md:w-1/2 pl-6">
        <h2 class="text-xl text-[#26294D]">Comments</h2>
        <ul v-if="comments.length" class="list-none mt-5">
          <li
            v-for="(comment, index) in comments"
            :key="index"
            class="p-2 bg-[#ffec9c] mb-2 rounded-lg"
          >
            <strong class="block text-[#091e36]">Username{{ index + 1 }}:</strong> 
            {{ comment }}
          </li>
        </ul>
        <p v-else class="mt-4">No comments yet. Be the first to cheer up!</p>
      </div>

    </div>
  </div>
</template>
