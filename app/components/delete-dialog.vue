<script setup lang="ts">
interface Props {
  label: string;
  value: string;
  action: () => void | Promise<void>;
  modelValue: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{ (e: "update:modelValue", value: boolean): void }>();

// internal close handler
async function handleAction() {
  await props.action();
  emit("update:modelValue", false);
}
</script>

<template>
  <AlertDialog
    :open="props.modelValue"
    @update:open="emit('update:modelValue', $event)"
  >
    <AlertDialogContent class="bg-card">
      <AlertDialogHeader>
        <AlertDialogTitle>Delete {{ props.label }}</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete "<strong>{{ props.value }}</strong
          >"? This action cannot be undone.
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          class="bg-destructive hover:bg-destructive/90"
          @click="handleAction"
        >
          Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
