<script setup lang="ts">
interface Props {
  label: string;
  value: string;
  // action: () => void | Promise<void>;
  modelValue: boolean;
}

// ✅ Define emits interface separately
interface Emit {
  (e: "update:model-value", value: boolean): void;
  (e: "confirm"): void;
}

defineProps<Props>();
defineEmits<Emit>();
</script>

<template>
  <AlertDialog :open="modelValue">
    <AlertDialogContent class="bg-card">
      <AlertDialogHeader>
        <AlertDialogTitle>Delete {{ label }}</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete "<strong>{{ value }}</strong
          >"? This action cannot be undone.
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter>
        <AlertDialogCancel @click="$emit('update:model-value', false)"
          >Cancel</AlertDialogCancel
        >
        <AlertDialogAction
          class="bg-destructive hover:bg-destructive/90"
          @click="$emit('confirm')"
        >
          Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
