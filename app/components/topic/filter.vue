<script setup lang="ts">
import { useDebounceFn } from "@vueuse/core";
import { Search, Filter as FilterIcon } from "lucide-vue-next";
import { categories } from "~/lib/mockData";

interface PostFilter {
  q?: string;
  category?: string;
  status?: string;
}

const { query } = useRoute();
const { push } = useRouter();
const filters = ref<PostFilter>({
  q: (query.q as string) || "",
  category: (query.category as string) || "",
  status: (query.status as string) || "",
});

const applyFilters = useDebounceFn(() => {
  push({ name: "posts", query: filters.value });
}, 300);

watch(filters, applyFilters, { deep: true });
</script>

<template>
  <div class="bg-card rounded-2xl p-4 card-interactive">
    <div class="flex flex-col sm:flex-row gap-3">
      <div class="relative flex-1">
        <Search
          class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
        />
        <Input
          v-model="filters.q"
          placeholder="Search posts..."
          class="pl-10"
        />
      </div>

      <Select v-model="filters.category">
        <SelectTrigger class="w-full sm:w-40">
          <FilterIcon class="w-4 h-4 mr-2" />
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent class="bg-card">
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem v-for="cat in categories" :key="cat.id" :value="cat.slug">
            {{ cat.name }}
          </SelectItem>
        </SelectContent>
      </Select>

      <!-- Status Filter -->
      <Select v-model="filters.status">
        <SelectTrigger class="w-full sm:w-36">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent class="bg-card">
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="published">Published</SelectItem>
          <SelectItem value="draft">Draft</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
</template>
