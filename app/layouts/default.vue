<script setup lang="ts"></script>

<template>
  <SidebarProvider>
    <div class="min-h-screen flex w-full bg-muted/30">
      <!-- Sidebar -->
      <LayoutSidebar />

      <!-- Main Content -->
      <div class="flex-1 flex flex-col min-w-0">
        <!-- Header -->
        <LayoutHeader />

        <!-- Page Content -->
        <main class="flex-1 p-4 md:p-6 overflow-auto">
          <slot />
        </main>
      </div>
    </div>
  </SidebarProvider>
</template>
