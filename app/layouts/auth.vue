<script setup lang="ts">
const { appName } = useAppConfig();
</script>
<template>
  <main
    class="mx-auto my-auto w-fit h-screen flex flex-col items-center justify-center"
  >
    <Card>
      <CardHeader>
        <CardTitle>
          <h1
            @click="navigateTo('/')"
            class="text-center font-bold text-2xl cursor-pointer"
          >
            {{ appName }}
          </h1>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <slot />
      </CardContent>
    </Card>
  </main>
</template>
