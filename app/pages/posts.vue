<script setup lang="ts">
import { Edit } from "lucide-vue-next";
// import { posts as initialPosts } from "@/lib/mockData";

import type { ApiListResponse, Posts } from "~/interfaces";
// import type { Posts } from "~/interfaces/post.interface";
const {
  mode,
  deleteDialogOpen,
  postToDelete,
  modalOpen,
  selectedPost,
  handleCreate,
  handleView,
  handleEdit,
  handleDelete,
  toggleTrending,
  confirmDelete,
  handleClose,
} = usePostActions();

const header = {
  title: "Posts",
  subtitle: "Manage all your published and draft posts.",
  action: {
    label: "Create Post",
    value: handleCreate,
  },
};
// const posts = ref<Post[]>(initialPosts);
const { data: posts } = useAPI<ApiListResponse<Posts>>("/posts");
// if (!posts.value) {
//   throw createError("Data not found");
// }
</script>
<template>
  <div class="space-y-6">
    <PageHeader v-bind="header" />
    <PostFilter />
    <PostList
      v-if="posts?.data"
      :posts="posts?.data"
      @view="handleView"
      @edit="handleEdit"
      @delete="handleDelete"
      @toggle-trending="toggleTrending"
    />

    <ModalComponent
      v-model:open="modalOpen"
      :title="
        mode === 'create'
          ? 'Create New Post'
          : mode === 'edit'
            ? 'Edit Post'
            : 'View Post'
      "
    >
      <template #button>
        <Button
          v-if="mode === 'view' && selectedPost"
          variant="outline"
          size="sm"
          class="gap-2"
          @click="mode = 'edit'"
        >
          <Edit class="w-4 h-4" /> Edit
        </Button>
      </template>
      <PostView v-if="mode === 'view' && selectedPost" v-bind="selectedPost" />
      <PostForm
        v-else
        :post="selectedPost"
        :mode="mode"
        @cancel="handleClose"
      />
    </ModalComponent>
    <DeleteDialog
      v-if="postToDelete"
      v-model="deleteDialogOpen"
      label="Post"
      :value="postToDelete.title ?? ''"
      @confirm="confirmDelete"
    />
  </div>
</template>
