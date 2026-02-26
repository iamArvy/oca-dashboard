import { ref } from "vue";
import type { Feed } from "~/interfaces";

type FeedMode = "edit" | "create";

export function useFeedActions() {
  const { success } = useToast();
  const mode = ref<FeedMode>("create");
  const modalOpen = ref(false);
  const selectedItem = ref<Feed | null>(null);

  const deleteDialogOpen = ref(false);
  const itemToDelete = ref<Feed | null>(null);

  function handleCreate() {
    selectedItem.value = null;
    mode.value = "create";
    modalOpen.value = true;
  }

  function handleEdit(item: Feed) {
    selectedItem.value = item;
    mode.value = "edit";
    modalOpen.value = true;
  }

  function handleDelete(item: Feed) {
    itemToDelete.value = item;
    deleteDialogOpen.value = true;
  }

  function confirmDelete() {
    if (!itemToDelete.value) return;
    // Add function to delete post
    success("Feed deleted", "The feed has been deleted successfully.");
    deleteDialogOpen.value = false;
    itemToDelete.value = null;
  }

  function handleClose() {
    modalOpen.value = false;
  }

  return {
    mode,
    selectedItem,
    modalOpen,
    itemToDelete,
    deleteDialogOpen,
    handleCreate,
    handleDelete,
    confirmDelete,
    handleEdit,
    handleClose,
  };
}
