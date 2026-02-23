<script setup lang="ts">
import { Search } from "lucide-vue-next";
</script>

<template>
  <header
    class="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border"
  >
    <div class="flex items-center justify-between h-16 px-4 md:px-6">
      <div class="flex items-center gap-4">
        <SidebarTrigger class="text-muted-foreground hover:text-foreground" />

        <div class="hidden md:flex relative">
          <Search
            class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
          />
          <Input
            placeholder="Search..."
            class="pl-10 w-64 bg-muted/50 border-0 focus-visible:ring-primary"
          />
        </div>
      </div>

      <div class="flex items-center gap-2">
        <!-- <NotificationsPopover /> -->
        <AppTheme />
        <AppUser />
      </div>
    </div>
  </header>
</template>
