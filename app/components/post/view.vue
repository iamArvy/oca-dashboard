<script setup lang="ts">
import { BarChart3, Calendar } from "lucide-vue-next";
import User from "../app/user.vue";

import type { Post } from "~/interfaces";
import { PostStatus } from "~/enums";

defineProps<Post>();
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-wrap gap-4 text-sm text-muted-foreground">
      <div class="flex items-center gap-2">
        <User class="w-4 h-4" />{{ author }}
      </div>
      <div class="flex items-center gap-2">
        <Calendar class="w-4 h-4" />{{
          new Date(createdAt).toLocaleDateString()
        }}
      </div>
      <div class="flex items-center gap-2">
        <BarChart3 class="w-4 h-4" />{{ views.toLocaleString() }}
        views
      </div>
      <Badge
        :variant="status === PostStatus.PUBLISHED ? 'default' : 'secondary'"
      >
        {{ status }}
      </Badge>
    </div>
    <div v-if="image" class="rounded-xl overflow-hidden">
      <img :src="image" :alt="title" class="w-full h-64 object-cover" />
    </div>
    <h2 class="font-display text-2xl font-bold">{{ title }}</h2>
    <p class="text-muted-foreground text-lg leading-relaxed">
      {{ excerpt }}
    </p>
    <div class="prose prose-sm dark:prose-invert max-w-none" v-html="content" />
    <div v-if="tags?.length" class="flex flex-wrap gap-2">
      <Badge v-for="tag in tags" :key="tag" variant="outline">{{ tag }}</Badge>
    </div>
  </div>
</template>
