<!-- <script setup lang="ts">
import { ref, reactive, computed } from "vue";
import {
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  FolderOpen,
  ChevronRight,
} from "lucide-vue-next";
// import { useToast } from "@/composables/useToast"; // adjust to your composable
import {
  categories as initialCategories,
  type Category,
  type Subcategory,
} from "@/lib/mockData";

const categories = ref<Category[]>(initialCategories);
const searchQuery = ref("");
const modalOpen = ref(false);
const subcategoryModalOpen = ref(false);
const deleteDialogOpen = ref(false);

const selectedCategory = ref<Category | null>(null);
const selectedSubcategory = ref<Subcategory | null>(null);

const itemToDelete = ref<{
  type: "category" | "subcategory";
  id: string;
  parentId?: string;
} | null>(null);

const formData = reactive({ name: "", slug: "", description: "" });
const subFormData = reactive({ name: "", slug: "" });

const { toast } = useToast();

const filteredCategories = computed(() =>
  categories.value.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  ),
);

function handleCreateCategory() {
  selectedCategory.value = null;
  formData.name = "";
  formData.slug = "";
  formData.description = "";
  modalOpen.value = true;
}

function handleEditCategory(category: Category) {
  selectedCategory.value = category;
  formData.name = category.name;
  formData.slug = category.slug;
  formData.description = category.description || "";
  modalOpen.value = true;
}

function handleSaveCategory() {
  if (selectedCategory.value) {
    categories.value = categories.value.map((c) =>
      c.id === selectedCategory.value?.id
        ? {
            ...c,
            name: formData.name,
            slug: formData.slug,
            description: formData.description,
          }
        : c,
    );
    toast({
      title: "Category updated",
      description: "The category has been updated successfully.",
    });
  } else {
    const newCategory: Category = {
      id: String(categories.value.length + 1),
      name: formData.name,
      slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-"),
      description: formData.description,
      count: 0,
      subcategories: [],
    };
    categories.value.push(newCategory);
    toast({
      title: "Category created",
      description: "The category has been created successfully.",
    });
  }
  modalOpen.value = false;
}

function handleCreateSubcategory(category: Category) {
  selectedCategory.value = category;
  selectedSubcategory.value = null;
  subFormData.name = "";
  subFormData.slug = "";
  subcategoryModalOpen.value = true;
}

function handleEditSubcategory(category: Category, subcategory: Subcategory) {
  selectedCategory.value = category;
  selectedSubcategory.value = subcategory;
  subFormData.name = subcategory.name;
  subFormData.slug = subcategory.slug;
  subcategoryModalOpen.value = true;
}

function handleSaveSubcategory() {
  if (!selectedCategory.value) return;

  if (selectedSubcategory.value) {
    categories.value = categories.value.map((c) =>
      c.id === selectedCategory.value?.id
        ? {
            ...c,
            subcategories: c.subcategories?.map((s) =>
              s.id === selectedSubcategory.value?.id
                ? { ...s, name: subFormData.name, slug: subFormData.slug }
                : s,
            ),
          }
        : c,
    );
    toast({ title: "Subcategory updated" });
  } else {
    const newSub: Subcategory = {
      id: `${selectedCategory.value.id}-${(selectedCategory.value.subcategories?.length || 0) + 1}`,
      name: subFormData.name,
      slug:
        subFormData.slug || subFormData.name.toLowerCase().replace(/\s+/g, "-"),
      count: 0,
    };
    categories.value = categories.value.map((c) =>
      c.id === selectedCategory.value?.id
        ? { ...c, subcategories: [...(c.subcategories || []), newSub] }
        : c,
    );
    toast({ title: "Subcategory created" });
  }
  subcategoryModalOpen.value = false;
}

function handleDelete(
  type: "category" | "subcategory",
  id: string,
  parentId?: string,
) {
  itemToDelete.value = { type, id, parentId };
  deleteDialogOpen.value = true;
}

function confirmDelete() {
  if (!itemToDelete.value) return;

  if (itemToDelete.value.type === "category") {
    categories.value = categories.value.filter(
      (c) => c.id !== itemToDelete.value?.id,
    );
    toast({ title: "Category deleted", variant: "destructive" });
  } else if (itemToDelete.value.parentId) {
    categories.value = categories.value.map((c) =>
      c.id === itemToDelete.value?.parentId
        ? {
            ...c,
            subcategories: c.subcategories?.filter(
              (s) => s.id !== itemToDelete.value?.id,
            ),
          }
        : c,
    );
    toast({ title: "Subcategory deleted", variant: "destructive" });
  }
  deleteDialogOpen.value = false;
  itemToDelete.value = null;
}
</script>

<template>
  <div class="space-y-6">
    Page Header
    <div
      class="flex flex-col md:flex-row md:items-center justify-between gap-4"
    >
      <div>
        <h1 class="font-display text-3xl font-bold">Categories</h1>
        <p class="text-muted-foreground mt-1">
          Manage your content categories and subcategories.
        </p>
      </div>
      <Button
        class="bg-primary hover:opacity-90 gap-2"
        @click="handleCreateCategory"
      >
        <Plus class="w-4 h-4" />
        New Category
      </Button>
    </div>

    Search
    <div class="bg-card rounded-2xl p-4 card-interactive">
      <div class="relative max-w-md">
        <Search
          class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
        />
        <Input
          v-model="searchQuery"
          placeholder="Search categories..."
          class="pl-10"
        />
      </div>
    </div>

    Categories Table
    <div class="bg-card rounded-2xl card-interactive overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead class="w-[40%]">Category</TableHead>
            <TableHead>Posts</TableHead>
            <TableHead>Subcategories</TableHead>
            <TableHead class="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-for="category in filteredCategories" :key="category.id">
            <TableRow class="hover:bg-muted/50">
              <TableCell>
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"
                  >
                    <FolderOpen class="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p class="font-medium">{{ category.name }}</p>
                    <p class="text-xs text-muted-foreground">
                      /{{ category.slug }}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>{{ category.count }}</TableCell>
              <TableCell>{{ category.subcategories?.length || 0 }}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" class="h-8 w-8">
                      <MoreHorizontal class="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" class="bg-card">
                    <DropdownMenuItem
                      @click="() => handleEditCategory(category)"
                      class="gap-2"
                    >
                      <Edit class="w-4 h-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      @click="() => handleCreateSubcategory(category)"
                      class="gap-2"
                    >
                      <Plus class="w-4 h-4" />
                      Add Subcategory
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      @click="() => handleDelete('category', category.id)"
                      class="gap-2 text-destructive focus:text-destructive"
                    >
                      <Trash2 class="w-4 h-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>

            Subcategories
            <TableRow
              v-for="sub in category.subcategories"
              :key="sub.id"
              class="hover:bg-muted/50 bg-muted/20"
            >
              <TableCell>
                <div class="flex items-center gap-3 ml-8">
                  <ChevronRight class="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p class="font-medium text-sm">{{ sub.name }}</p>
                    <p class="text-xs text-muted-foreground">
                      /{{ category.slug }}/{{ sub.slug }}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell class="text-sm text-muted-foreground">{{
                sub.count || 0
              }}</TableCell>
              <TableCell>—</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" class="h-8 w-8">
                      <MoreHorizontal class="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" class="bg-card">
                    <DropdownMenuItem
                      @click="() => handleEditSubcategory(category, sub)"
                      class="gap-2"
                    >
                      <Edit class="w-4 h-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      @click="
                        () => handleDelete('subcategory', sub.id, category.id)
                      "
                      class="gap-2 text-destructive focus:text-destructive"
                    >
                      <Trash2 class="w-4 h-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </div>

    Modals & Delete Dialog
    Category Modal
    <Dialog v-model:open="modalOpen">
      <DialogContent class="bg-card">
        <DialogHeader>
          <DialogTitle>{{
            selectedCategory ? "Edit Category" : "Create Category"
          }}</DialogTitle>
        </DialogHeader>
        <div class="space-y-4 py-4">
          <div>
            <Label for="name">Name</Label>
            <Input
              id="name"
              v-model="formData.name"
              placeholder="Category name"
              class="mt-1.5"
            />
          </div>
          <div>
            <Label for="slug">Slug</Label>
            <Input
              id="slug"
              v-model="formData.slug"
              placeholder="category-slug"
              class="mt-1.5"
            />
          </div>
          <div>
            <Label for="description">Description</Label>
            <Textarea
              id="description"
              v-model="formData.description"
              placeholder="Category description"
              class="mt-1.5"
              rows="3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="modalOpen = false">Cancel</Button>
          <Button
            class="bg-primary hover:opacity-90"
            @click="handleSaveCategory"
          >
            {{ selectedCategory ? "Save Changes" : "Create Category" }}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    Subcategory Modal
    <Dialog v-model:open="subcategoryModalOpen">
      <DialogContent class="bg-card">
        <DialogHeader>
          <DialogTitle>
            {{ selectedSubcategory ? "Edit Subcategory" : "Add Subcategory" }}
            <span
              v-if="selectedCategory"
              class="text-muted-foreground font-normal"
            >
              in {{ selectedCategory.name }}</span
            >
          </DialogTitle>
        </DialogHeader>
        <div class="space-y-4 py-4">
          <div>
            <Label for="subName">Name</Label>
            <Input
              id="subName"
              v-model="subFormData.name"
              placeholder="Subcategory name"
              class="mt-1.5"
            />
          </div>
          <div>
            <Label for="subSlug">Slug</Label>
            <Input
              id="subSlug"
              v-model="subFormData.slug"
              placeholder="subcategory-slug"
              class="mt-1.5"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="subcategoryModalOpen = false"
            >Cancel</Button
          >
          <Button
            class="bg-primary hover:opacity-90"
            @click="handleSaveSubcategory"
          >
            {{ selectedSubcategory ? "Save Changes" : "Add Subcategory" }}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    Delete Confirmation
    <AlertDialog v-model:open="deleteDialogOpen">
      <AlertDialogContent class="bg-card">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {{ itemToDelete?.type }}</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this {{ itemToDelete?.type }}? This
            action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            class="bg-destructive hover:bg-destructive/90"
            @click="confirmDelete"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template> -->
<script setup lang="ts">
const header = {
  title: "Topics",
  subtitle: "Manage your content topics.",
};
</script>
<template>
  <div class="space-y-6">
    <PageHeader v-bind="header" />
  </div>
</template>
