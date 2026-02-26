import { ref } from "vue";
import type { Topic } from "~/interfaces";

type TopicMode = "edit" | "create";
type TopicType = "topic" | "subtopic";

export function useTopicActions() {
  const { success } = useToast();
  const mode = ref<TopicMode>("create");
  const type = ref<TopicType>("topic");
  const modalOpen = ref(false);
  const selectedItem = ref<Topic | null>(null);

  const deleteDialogOpen = ref(false);
  const itemToDelete = ref<Topic | null>(null);

  function handleCreate() {
    selectedItem.value = null;
    mode.value = "create";
    modalOpen.value = true;
  }

  function handleCreateSubtopic(topic: Topic) {
    alert(topic.id);
    selectedItem.value = topic;
    mode.value = "create";
    type.value = "subtopic";
    modalOpen.value = true;
  }

  function handleEdit(topic: Topic) {
    selectedItem.value = topic;
    mode.value = "edit";
    modalOpen.value = true;
  }

  function handleDelete(topic: Topic) {
    itemToDelete.value = topic;
    deleteDialogOpen.value = true;
  }

  function confirmDelete() {
    if (!itemToDelete.value) return;
    if (itemToDelete.value.parent) {
      // Add function to delete post
      success("Topic deleted", "The topic has been deleted successfully.");
    } else {
      success(
        "Subtopic deleted",
        "The subtopic has been deleted successfully.",
      );
    }
    deleteDialogOpen.value = false;
    itemToDelete.value = null;
  }

  function handleClose() {
    modalOpen.value = false;
  }

  return {
    mode,
    type,
    selectedItem,
    modalOpen,
    itemToDelete,
    deleteDialogOpen,
    handleCreate,
    handleDelete,
    confirmDelete,
    handleEdit,
    handleCreateSubtopic,
    handleClose,
  };
}
