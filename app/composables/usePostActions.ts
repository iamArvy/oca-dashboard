import { ref } from "vue";
import type { Post } from "~/interfaces";

type PostMode = "view" | "edit" | "create";

export function usePostActions() {
  const { success } = useToast();
  const mode = ref<PostMode>("create");
  const modalOpen = ref(false);
  const selectedPost = ref<Post | null>(null);

  const deleteDialogOpen = ref(false);
  const postToDelete = ref<Post | null>(null);

  function handleCreate() {
    selectedPost.value = null;
    mode.value = "create";
    modalOpen.value = true;
  }

  function handleView(post: Post) {
    selectedPost.value = post;
    mode.value = "view";
    modalOpen.value = true;
  }

  function handleEdit(post: Post) {
    selectedPost.value = post;
    mode.value = "edit";
    modalOpen.value = true;
  }

  function handleDelete(post: Post) {
    postToDelete.value = post;
    deleteDialogOpen.value = true;
  }

  function confirmDelete() {
    if (postToDelete.value) {
      // posts.value = posts.value.filter((p) => p.id !== postToDelete.value?.id);
      // Add function to delete post
      success("Post deleted", "The post has been deleted successfully.");
    }
    deleteDialogOpen.value = false;
    postToDelete.value = null;
  }

  function handleClose() {
    modalOpen.value = false;
  }

  function toggleTrending(post: Post) {
    // Add function to update featured
    success(
      post.isTrending ? "Removed from trending" : "Added to trending",
      `"${post.title}" has been ${
        post.isTrending ? "removed from" : "added to"
      } trending.`,
    );
  }

  return {
    mode,
    selectedPost,
    modalOpen,
    postToDelete,
    deleteDialogOpen,
    handleCreate,
    handleDelete,
    confirmDelete,
    toggleTrending,
    handleView,
    handleEdit,
    handleClose,
  };
}
