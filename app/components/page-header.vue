<script setup lang="ts">
import { Plus } from "lucide-vue-next";

interface Props {
  title: string;
  subtitle: string;
  action?: {
    value: () => void;
    label: string;
  };
}

defineProps<Props>();
</script>
<template>
  <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
    <div>
      <h1 class="font-display text-3xl font-bold">{{ title }}</h1>
      <p class="text-muted-foreground mt-1">
        {{ subtitle }}
      </p>
    </div>
    <Button
      v-if="action"
      class="bg-primary hover:opacity-90 gap-2"
      @click="action.value"
    >
      <Plus class="w-4 h-4" /> {{ action.label }}
    </Button>
  </div>
</template>
