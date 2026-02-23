<script setup lang="ts">
const { submit } = useLoginForm();
definePageMeta({
  layout: "auth",
});
</script>
<template>
  <form class="space-y-6" @submit.prevent="submit">
    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>Email*</FormLabel>
        <FormControl>
          <Input v-bind="componentField" type="email" placeholder="Email" />
        </FormControl>
        <FormDescription />
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="password">
      <FormItem>
        <FormLabel>Password*</FormLabel>
        <FormControl>
          <Input
            v-bind="componentField"
            type="password"
            placeholder="Password"
          />
        </FormControl>
        <FormDescription>
          This is a demo application, password is "securePassword"
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <div>
      <Button class="w-full" type="submit">Login</Button>
    </div>
  </form>
</template>
