<script setup lang="ts">
interface Props {
  open: boolean;
  title: string;
}

interface Emits {
  (e: "update:open", open: boolean): void;
  // (e: "save", post: Partial<Post>): void;
}

const props = defineProps<Props>();
defineEmits<Emits>();

// const { mode, isViewMode } = usePostEditor(props.post, props.mode);

// const handleSave = (data: Partial<Post>) => {
//   emit("save", { ...(props.post ?? {}), ...data });
//   emit("update:open", false);
// };
</script>

<template>
  <Dialog :open="props.open" @update:open="$emit('update:open', $event)">
    <DialogContent class="max-w-4xl max-h-[90vh] overflow-y-auto bg-card">
      <DialogHeader>
        <div class="flex items-center justify-between">
          <DialogTitle class="font-display text-xl">
            {{ title }}
          </DialogTitle>
          <slot name="button" />
        </div>
      </DialogHeader>
      <slot />
    </DialogContent>
  </Dialog>
</template>
