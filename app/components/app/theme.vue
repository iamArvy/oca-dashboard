<script setup lang="ts">
const { currentTheme, updateTheme } = useTheme();
</script>

<template>
  <Button
    variant="ghost"
    size="icon"
    class="text-muted-foreground hover:text-foreground"
    @click="updateTheme(currentTheme === 'dark' ? 'light' : 'dark')"
  >
    <Icon
      :name="currentTheme === 'dark' ? 'lucide:sun' : 'lucide:moon'"
      mode="svg"
      class="w-5 h-5"
    />
  </Button>
</template>
