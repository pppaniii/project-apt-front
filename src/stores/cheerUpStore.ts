// src/stores/cheerUpStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCheerUpStore = defineStore('cheerUp', () => {
  const commentsByCountry = ref<Record<number, string[]>>({});

  function addComment(countryId: number, comment: string) {
    if (!commentsByCountry.value[countryId]) {
      commentsByCountry.value[countryId] = [];
    }
    commentsByCountry.value[countryId].push(comment);
  }

  function getComments(countryId: number) {
    return commentsByCountry.value[countryId] || [];
  }

  return {
    addComment,
    getComments
  };
});
