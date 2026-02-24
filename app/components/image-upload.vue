<template>
  <div
    :class="[
      'mt-1.5 border-2 border-dashed rounded-xl p-4 transition-colors cursor-pointer',
      isDragging ? 'border-primary bg-primary/5' : 'border-border',
    ]"
    @dragover.prevent="handleDragOver"
    @dragleave.prevent="handleDragLeave"
    @drop.prevent="handleDrop"
    @click="openFilePicker"
  >
    <!-- Image Preview -->
    <div v-if="modelValue" class="relative">
      <img
        :src="modelValue"
        alt="Uploaded"
        class="w-full h-48 object-cover rounded-lg"
      />
      <Button
        variant="destructive"
        size="icon"
        class="absolute top-2 right-2 h-8 w-8"
        @click.stop="clearImage"
      >
        <X class="w-4 h-4" />
      </Button>
    </div>

    <!-- Upload Placeholder -->
    <div
      v-else
      class="flex flex-col items-center justify-center py-8 text-muted-foreground"
    >
      <ImageIcon class="w-10 h-10 mb-2" />
      <p class="text-sm font-medium">Drag & drop, paste, or click to upload</p>
      <p class="text-xs mt-1">PNG, JPG, GIF up to 10MB</p>
    </div>

    <!-- Hidden File Input -->
    <input
      type="file"
      accept="image/*"
      class="hidden"
      ref="fileInput"
      @change="handleFileSelect"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { X, ImageIcon } from "lucide-vue-next";
import { Button } from "@/components/ui/button";

/**
 * Props
 * - modelValue: v-model binding for the image URL/base64
 */
defineProps<{
  modelValue?: string;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const fileInput = ref<HTMLInputElement | null>(null);
const isDragging = ref(false);

function openFilePicker() {
  fileInput.value?.click();
}

function handleFileSelect(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (file) readFile(file);
}

function handleDrop(e: DragEvent) {
  const file = e.dataTransfer?.files?.[0];
  if (file) readFile(file);
  isDragging.value = false;
}

function handleDragOver() {
  isDragging.value = true;
}

function handleDragLeave() {
  isDragging.value = false;
}

function readFile(file: File) {
  const reader = new FileReader();
  reader.onload = () => emit("update:modelValue", reader.result as string);
  reader.readAsDataURL(file);
}

function clearImage() {
  emit("update:modelValue", "");
}
</script>
