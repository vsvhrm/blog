<script setup lang="ts">
import ChevronLeftIcon from '@/assets/icons/chevron-left.svg?use';
import ChevronRightIcon from '@/assets/icons/chevron-right.svg?use';
import { computed, watch } from 'vue';
import { useRouter } from 'vue-router';

interface Props {
  modelValue: number;
  total: number;
  pageCount?: number;
}

const props = withDefaults(defineProps<Props>(), {
  pageCount: 10
});
const router = useRouter();

const currentPage = defineModel<number>({ required: true });

const pages = computed(() =>
  Array.from({ length: Math.ceil(props.total / props.pageCount) }, (_, i) => i + 1)
);

const hasPrevPage = computed(() => currentPage.value > 1);
const hasNextPage = computed(() => currentPage.value < pages.value.length);

function onClickPage(page: number) {
  currentPage.value = page;
}

function onClickPrev() {
  if (hasPrevPage.value) {
    currentPage.value--;
  }
}

function onClickNext() {
  if (hasNextPage.value) {
    currentPage.value++;
  }
}

watch(currentPage, async (page) => {
  const query = page === 1 ? {} : { page };
  await router.push({ query });
});
</script>

<template>
  <nav class="pagination" aria-label="Pagination navigation">
    <a
      v-if="hasPrevPage"
      :href="`${$route.path}?page=${currentPage - 1}`"
      class="pagination__link"
      aria-label="Previous page"
      rel="prev"
      @click.prevent="onClickPrev"
    >
      <ChevronLeftIcon width="16" height="16" aria-hidden="true" />
    </a>
    <ol class="pagination__list">
      <li v-for="(page, index) of pages" :key="`${page}-${index}`" class="pagination__item">
        <a
          :href="`${$route.path}?page=${page}`"
          class="pagination__link"
          :aria-label="`Page ${page}`"
          :aria-current="page === currentPage ? 'page' : undefined"
          @click.prevent="onClickPage(page)"
        >
          {{ page }}
        </a>
      </li>
    </ol>
    <a
      v-if="hasNextPage"
      :href="`${$route.path}?page=${currentPage + 1}`"
      class="pagination__link"
      aria-label="Next page"
      rel="next"
      @click.prevent="onClickNext"
    >
      <ChevronRightIcon width="16" height="16" aria-hidden="true" />
    </a>
  </nav>
</template>

<style>
.pagination {
  display: flex;
  gap: 8px;
}

.pagination__list {
  display: flex;
  gap: 8px;
  list-style: none;
}

.pagination__link {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  background-color: var(--color-smoke);
  border-radius: 12px;
  transition: all 0.2s ease-in-out;
}

.pagination__link[aria-current] {
  color: var(--color-light);
  background-color: var(--color-black);
}

.pagination__link:hover {
  color: inherit;
  background-color: var(--color-silver);
}
</style>
