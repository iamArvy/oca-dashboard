<script setup lang="ts">
import type { ApiListResponse, Feeds } from "~/interfaces";

const {
  mode,
  deleteDialogOpen,
  itemToDelete,
  modalOpen,
  selectedItem,
  handleCreate,
  handleEdit,
  handleDelete,
  confirmDelete,
  handleClose,
} = useFeedActions();

const header = {
  title: "Feeds",
  subtitle: "Manage website's RSS Feeds.",
  action: {
    label: "Create Feed",
    value: handleCreate,
  },
};
const { data: feeds } = useAPI<ApiListResponse<Feeds>>("/feeds");
</script>
<template>
  <div class="space-y-6">
    <PageHeader v-bind="header" />
    <FeedFilter />
    <FeedList
      v-if="feeds?.data"
      :feeds="feeds?.data"
      @edit="handleEdit"
      @delete="handleDelete"
    />
    <ModalComponent
      v-model:open="modalOpen"
      :title="mode === 'create' ? 'Create New Feed' : 'Edit Feed'"
    >
      <FeedForm :feed="selectedItem" :mode="mode" @cancel="handleClose" />
    </ModalComponent>
    <DeleteDialog
      v-if="itemToDelete"
      v-model="deleteDialogOpen"
      label="Feed"
      :value="itemToDelete.name ?? ''"
      @confirm="confirmDelete"
    />
  </div>
</template>
