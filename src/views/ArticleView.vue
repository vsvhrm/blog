<script setup lang="ts">
import type { Post } from '@/types';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const postId = route.params.id as string;

const post = ref<Post | null>(null);

const url = new URL(`posts/${postId}`, import.meta.env.VITE_API_BASE_URL);
fetch(url)
  .then((response) => response.json())
  .then((json) => {
    post.value = json;
  });
</script>

<template>
  <h1 class="main__title">{{ post?.title }}</h1>
  <div class="article">
    <img
      class="article__image"
      src="https://dummyimage.com/1200x700/868686/fff"
      width="1200"
      height="700"
      alt=""
    />
    <p class="article__text">{{ post?.description }}</p>
  </div>
</template>

<style>
.article {
  display: flex;
  flex-direction: column;
}

.article__image {
  margin-bottom: 128px;
}

.article__text {
  font-size: 36px;
  max-width: 700px;
}
</style>
