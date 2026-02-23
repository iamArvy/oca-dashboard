<template>
  <div class="container-lg">
    <slot name="header" />
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
      <!-- Main Content -->
      <div class="lg:col-span-2 space-y-8">
        <slot name="main" />
      </div>

      <!-- Sidebar -->
      <aside class="space-y-6">
        <slot name="sidebar" />
      </aside>
    </div>
    <slot />
  </div>
</template>