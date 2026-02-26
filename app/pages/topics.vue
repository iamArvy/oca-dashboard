<script setup lang="ts">
import type { ApiListResponse, Topics } from "~/interfaces";

const {
  mode,
  type,
  deleteDialogOpen,
  itemToDelete,
  modalOpen,
  selectedItem,
  handleCreate,
  handleEdit,
  handleDelete,
  confirmDelete,
  handleCreateSubtopic,
  handleClose,
} = useTopicActions();

const header = {
  title: "Topics",
  subtitle: "Manage your content topics.",
  action: {
    label: "Create Topic",
    value: handleCreate,
  },
};
const { data: topics } = useAPI<ApiListResponse<Topics>>("/topics");
</script>
<template>
  <div class="space-y-6">
    <PageHeader v-bind="header" />
    <TopicFilter />
    <TopicList
      v-if="topics?.data"
      :topics="topics?.data"
      @create-subtopic="handleCreateSubtopic"
      @edit="handleEdit"
      @delete="handleDelete"
    />
    <ModalComponent
      v-model:open="modalOpen"
      :title="
        mode === 'create'
          ? 'Create New Topic'
          : mode === 'edit'
            ? 'Edit Topic'
            : 'Create Subtopic'
      "
    >
      <TopicForm
        :topic="selectedItem"
        :mode="mode"
        :type="type"
        @cancel="handleClose"
      />
    </ModalComponent>
    <DeleteDialog
      v-if="itemToDelete"
      v-model="deleteDialogOpen"
      :label="itemToDelete.parent ? 'Subtopic' : 'Topic'"
      :value="itemToDelete.name ?? ''"
      @confirm="confirmDelete"
    />
  </div>
</template>
