<script setup lang="ts">
import { ref, reactive, watch, computed, onBeforeUnmount } from "vue";
import { type Post, categories, tags as allTags } from "@/lib/mockData";
import RichTextEditor from "./RichTextEditor.vue";
// import { useDialog } from "@/composables/useDialog";

// Props
defineProps<{
  open: boolean;
  post?: Post | null;
  mode: "view" | "edit" | "create";
}>();

defineEmits<{
  (e: "update:open", open: boolean): void;
  (e: "save", post: Partial<Post>): void;
}>();

const props = defineProps<any>();
const emit = defineEmits<any>();

// State
const mode = ref(props.mode);
const formData = reactive<Partial<Post>>({
  title: "",
  excerpt: "",
  content: "",
  category: "",
  subcategory: "",
  author: "",
  image: "",
  status: "draft",
  tags: [],
});
const tagInput = ref("");
const isDragging = ref(false);

// Derived
const selectedCategory = computed(() =>
  categories.find((c) => c.name === formData.category),
);
const isViewMode = computed(() => mode.value === "view");

// Watch props to initialize form
watch(
  () => [props.post, props.mode],
  () => {
    mode.value = props.mode;
    if (props.post) {
      Object.assign(formData, {
        title: props.post.title,
        excerpt: props.post.excerpt,
        content: props.post.content,
        category: props.post.category,
        subcategory: props.post.subcategory || "",
        author: props.post.author,
        image: props.post.image,
        status: props.post.status || "published",
        tags: props.post.tags || [],
      });
    } else {
      Object.assign(formData, {
        title: "",
        excerpt: "",
        content: "",
        category: "",
        subcategory: "",
        author: "",
        image: "",
        status: "draft",
        tags: [],
      });
    }
  },
  { immediate: true },
);

// Image Upload Handlers
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
    const url = URL.createObjectURL(file);
    formData.image = url;
  }
};
const handlePaste = (e: ClipboardEvent) => {
  const items = e.clipboardData?.items;
  if (!items) return;
  for (let i = 0; i < items.length; i++) {
    if (items[i].type.startsWith("image/")) {
      const file = items[i].getAsFile();
      if (file) formData.image = URL.createObjectURL(file);
      break;
    }
  }
};
const handleFileSelect = (e: Event) => {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  if (file && file.type.startsWith("image/")) {
    formData.image = URL.createObjectURL(file);
  }
};

// Tags
const addTag = (tag: string) => {
  if (tag && !formData.tags?.includes(tag)) {
    formData.tags?.push(tag);
  }
  tagInput.value = "";
};
const removeTag = (tag: string) => {
  formData.tags = formData.tags?.filter((t) => t !== tag) || [];
};

// Save
const handleSave = () => {
  emit("save", { ...(props.post ?? {}), ...formData });
  emit("update:open", false);
};

// Revoke blob URLs on unmount
onBeforeUnmount(() => {
  if (formData.image?.startsWith("blob:")) URL.revokeObjectURL(formData.image);
});
</script>

<template>
  <Dialog :open="props.open" @update:open="$emit('update:open', $event)">
    <DialogContent
      class="max-w-4xl max-h-[90vh] overflow-y-auto bg-card"
      @paste="handlePaste"
    >
      <DialogHeader>
        <div class="flex items-center justify-between">
          <DialogTitle class="font-display text-xl">
            {{
              mode === "create"
                ? "Create New Post"
                : mode === "edit"
                  ? "Edit Post"
                  : "View Post"
            }}
          </DialogTitle>
          <Button
            v-if="isViewMode && props.post"
            variant="outline"
            size="sm"
            @click="mode = 'edit'"
            class="gap-2"
          >
            <Edit class="w-4 h-4" /> Edit
          </Button>
        </div>
      </DialogHeader>

      <!-- VIEW MODE -->
      <div v-if="isViewMode && props.post" class="space-y-6">
        <div class="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div class="flex items-center gap-2">
            <User class="w-4 h-4" />{{ props.post.author }}
          </div>
          <div class="flex items-center gap-2">
            <Calendar class="w-4 h-4" />{{
              new Date(props.post.date).toLocaleDateString()
            }}
          </div>
          <div class="flex items-center gap-2">
            <Clock class="w-4 h-4" />{{ props.post.readTime }}
          </div>
          <div class="flex items-center gap-2">
            <BarChart3 class="w-4 h-4" />{{ props.post.views.toLocaleString() }}
            views
          </div>
          <Badge
            :variant="
              props.post.status === 'published' ? 'default' : 'secondary'
            "
            >{{ props.post.status || "published" }}</Badge
          >
        </div>
        <div v-if="props.post.image" class="rounded-xl overflow-hidden">
          <img
            :src="props.post.image"
            :alt="props.post.title"
            class="w-full h-64 object-cover"
          />
        </div>
        <h2 class="font-display text-2xl font-bold">{{ props.post.title }}</h2>
        <p class="text-muted-foreground text-lg leading-relaxed">
          {{ props.post.excerpt }}
        </p>
        <div
          class="prose prose-sm dark:prose-invert max-w-none"
          v-html="props.post.content"
        />
        <div v-if="props.post.tags?.length" class="flex flex-wrap gap-2">
          <Badge v-for="tag in props.post.tags" :key="tag" variant="outline">{{
            tag
          }}</Badge>
        </div>
      </div>

      <!-- EDIT / CREATE MODE -->
      <div v-else class="space-y-6">
        <!-- Featured Image -->
        <div>
          <Label>Featured Image</Label>
          <div
            :class="[
              'mt-1.5 border-2 border-dashed rounded-xl p-4 transition-colors cursor-pointer',
              isDragging ? 'border-primary bg-primary/5' : 'border-border',
            ]"
            @dragover.prevent="handleDragOver"
            @dragleave.prevent="handleDragLeave"
            @drop.prevent="handleDrop"
            @click="$refs.fileInput.click()"
          >
            <div v-if="formData.image" class="relative">
              <img
                :src="formData.image"
                alt="Featured"
                class="w-full h-48 object-cover rounded-lg"
              />
              <Button
                variant="destructive"
                size="icon"
                class="absolute top-2 right-2 h-8 w-8"
                @click.stop="formData.image = ''"
              >
                <X class="w-4 h-4" />
              </Button>
            </div>
            <div
              v-else
              class="flex flex-col items-center justify-center py-8 text-muted-foreground"
            >
              <ImageIcon class="w-10 h-10 mb-2" />
              <p class="text-sm font-medium">
                Drag & drop, paste, or click to upload
              </p>
              <p class="text-xs mt-1">PNG, JPG, GIF up to 10MB</p>
            </div>
            <input
              type="file"
              accept="image/*"
              class="hidden"
              ref="fileInput"
              @change="handleFileSelect"
            />
          </div>
          <Input
            class="mt-2"
            placeholder="Or paste image URL..."
            v-model="formData.image"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="col-span-2">
            <Label>Title</Label>
            <Input
              v-model="formData.title"
              placeholder="Enter post title"
              class="mt-1.5"
            />
          </div>

          <div>
            <Label>Category</Label>
            <Select v-model="formData.category">
              <SelectTrigger class="mt-1.5"
                ><SelectValue placeholder="Select category"
              /></SelectTrigger>
              <SelectContent class="bg-card">
                <SelectItem
                  v-for="cat in categories"
                  :key="cat.id"
                  :value="cat.name"
                  >{{ cat.name }}</SelectItem
                >
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Subcategory</Label>
            <Select
              v-model="formData.subcategory"
              :disabled="!selectedCategory?.subcategories?.length"
            >
              <SelectTrigger class="mt-1.5"
                ><SelectValue placeholder="Select subcategory"
              /></SelectTrigger>
              <SelectContent class="bg-card">
                <SelectItem
                  v-for="sub in selectedCategory?.subcategories || []"
                  :key="sub.id"
                  :value="sub.name"
                  >{{ sub.name }}</SelectItem
                >
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Status</Label>
            <Select v-model="formData.status">
              <SelectTrigger class="mt-1.5"
                ><SelectValue placeholder="Select status"
              /></SelectTrigger>
              <SelectContent class="bg-card">
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="pending">Pending Review</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Author</Label>
            <Input
              v-model="formData.author"
              placeholder="Author name"
              class="mt-1.5"
            />
          </div>

          <!-- Tags -->
          <div class="col-span-2">
            <Label>Tags</Label>
            <div class="mt-1.5 flex flex-wrap gap-2 mb-2">
              <Badge
                v-for="tag in formData.tags"
                :key="tag"
                variant="secondary"
                class="gap-1 pr-1"
              >
                {{ tag }}
                <button
                  @click="removeTag(tag)"
                  class="ml-1 hover:text-destructive"
                >
                  <X class="w-3 h-3" />
                </button>
              </Badge>
            </div>
            <div class="flex gap-2">
              <Input
                placeholder="Add tag..."
                v-model="tagInput"
                @keydown.enter.prevent="addTag(tagInput)"
              />
              <Select @update:modelValue="addTag">
                <SelectTrigger class="w-40"
                  ><SelectValue placeholder="Quick add"
                /></SelectTrigger>
                <SelectContent class="bg-card">
                  <SelectItem
                    v-for="tag in allTags
                      .filter((t) => !formData.tags.includes(t.name))
                      .slice(0, 8)"
                    :key="tag.id"
                    :value="tag.name"
                  >
                    {{ tag.name }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div class="col-span-2">
            <Label>Excerpt</Label>
            <Textarea
              v-model="formData.excerpt"
              placeholder="Brief summary of the post"
              class="mt-1.5"
              rows="3"
            />
          </div>

          <div class="col-span-2">
            <Label>Content</Label>
            <RichTextEditor v-model="formData.content" />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" @click="$emit('update:open', false)"
            >Cancel</Button
          >
          <Button class="bg-primary hover:opacity-90" @click="handleSave">
            {{ mode === "create" ? "Create Post" : "Save Changes" }}
          </Button>
        </DialogFooter>
      </div>
    </DialogContent>
  </Dialog>
</template>
