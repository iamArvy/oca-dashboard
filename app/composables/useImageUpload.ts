export function useImageUpload(image: string) {
  const isDragging = ref(false);

  const handleFileSelect = (e: Event) => {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file && file.type.startsWith("image/")) {
      image = URL.createObjectURL(file);
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    isDragging.value = true;
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    isDragging.value = false;
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    isDragging.value = false;
    const file = e.dataTransfer?.files[0];
    if (file && file.type.startsWith("image/")) {
      image = URL.createObjectURL(file);
    }
  };

  const handlePaste = (e: ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (let i = 0; i < items.length; i++) {
      if (items[i]?.type?.startsWith("image/")) {
        const file = items[i]?.getAsFile();
        if (file) image = URL.createObjectURL(file);
        break;
      }
    }
  };

  onBeforeUnmount(() => {
    if (image?.startsWith("blob:")) URL.revokeObjectURL(image);
  });

  return {
    handleFileSelect,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handlePaste,
  };
}
