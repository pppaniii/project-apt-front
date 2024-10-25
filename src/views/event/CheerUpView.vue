<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useCheerUpStore } from '@/stores/cheerUpStore';
import { useRoute } from 'vue-router';

const route = useRoute();
const cheerUpStore = useCheerUpStore();
const countryId = parseInt(route.params.id as string, 10);

const newComment = ref('');
const comments = ref<string[]>([]);

onMounted(() => {
  comments.value = cheerUpStore.getComments(countryId);
});

function handleSubmit() {
  if (newComment.value.trim()) {
    cheerUpStore.addComment(countryId, newComment.value.trim());
    comments.value = cheerUpStore.getComments(countryId); // Update the comments list
    newComment.value = ''; // Clear the textarea
  }
}
</script>

<template>
  <div class="flex flex-col mt-7 items-center h-[50vh] md:h-[60vh]">
    <h1 class="text-[#D1E9F6] text-3xl mt-5">Cheer Up the Athlete!</h1>
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-2.5 items-end">
      <textarea
        v-model="newComment"
        placeholder="Write your comment here..."
        rows="4"
        required
        class="w-[300px] h-[100px] text-base mt-5 md:w-[400px] md:h-[150px]"
      ></textarea>
      <button type="submit" class="w-20 border-2 border-white rounded-lg text-lg text-[#ffec9c] hover:text-[#fc869b] bg-[#6a71a5] mt-3">Submit</button>
    </form>
    <div class="text-[#FFFED3] mt-7 text-center max-w-[500px] text-lg">
      <div v-if="comments.length">
        <h2 class="text-[#D1E9F6] text-2xl font-normal underline mb-5">Comments:</h2>
        <ul class="list-none p-0">
          <li
            v-for="(comment, index) in comments"
            :key="index"
            class="relative inline-block p-[10px_15px] mb-3 bg-[#ffec9c] rounded-lg shadow-md text-[#091e36] text-sm break-all"
          >
            {{ comment }}
            <span class="absolute bottom-[-20px] left-[15px] border-[10px] border-transparent border-t-[#ffec9c]"></span>
          </li>
        </ul>
      </div>
      <p class="rounded-lg bg-[#091e36]" v-else>
        No comments yet. Be the first to cheer up!
      </p>
    </div>
    
  </div>
</template>