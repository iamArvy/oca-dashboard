<script setup lang="ts">
import { ArrowDownRight, ArrowUpRight } from "lucide-vue-next";

interface Props {
  title: string;
  value: string | number;
  change: string;
  trend: "up" | "down";
  icon: Component;
}
defineProps<Props>();
</script>
<template>
  <div class="bg-card rounded-2xl p-6 card-interactive">
    <div class="flex items-start justify-between">
      <div>
        <p class="text-sm text-muted-foreground mb-1">{{ title }}</p>
        <p class="text-3xl font-bold font-display">
          {{ typeof value === "number" ? value.toLocaleString() : value }}
        </p>
        <p
          class="text-sm mt-2 flex items-center gap-1"
          :class="trend === 'up' ? 'text-green-600' : 'text-red-600'"
        >
          <ArrowUpRight v-if="trend === 'up'" class="w-4 h-4" />
          <ArrowDownRight v-else class="w-4 h-4" /> {{ change }}
        </p>
      </div>
      <div
        class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center"
      >
        <component :is="icon" class="w-6 h-6 text-primary" />
      </div>
    </div>
  </div>
</template>
