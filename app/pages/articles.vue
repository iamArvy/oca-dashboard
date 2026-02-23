<!-- <script setup lang="ts">
import {
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  ExternalLink,
  TrendingUp,
  TrendingDown,
  Eye,
} from "lucide-vue-next";
import { useToast } from "@/composables/useToast";
import { posts as initialPosts, categories, type Post } from "@/lib/mockData";
import { ref, computed } from "vue";

const posts = ref<Post[]>(initialPosts);
const searchQuery = ref("");
const categoryFilter = ref("all");
const statusFilter = ref("all");

const modalOpen = ref(false);
const selectedPost = ref<Post | null>(null);
const modalMode = ref<"view" | "edit" | "create">("view");

const deleteDialogOpen = ref(false);
const postToDelete = ref<Post | null>(null);

const { toast } = useToast();

const filteredPosts = computed(() =>
  posts.value.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCategory =
      categoryFilter.value === "all" ||
      post.category.toLowerCase() === categoryFilter.value;
    const matchesStatus =
      statusFilter.value === "all" || post.status === statusFilter.value;
    return matchesSearch && matchesCategory && matchesStatus;
  }),
);

function handleViewPost(post: Post) {
  selectedPost.value = post;
  modalMode.value = "view";
  modalOpen.value = true;
}

function handleEditPost(post: Post) {
  selectedPost.value = post;
  modalMode.value = "edit";
  modalOpen.value = true;
}

function handleCreatePost() {
  selectedPost.value = null;
  modalMode.value = "create";
  modalOpen.value = true;
}

function handleSavePost(postData: Partial<Post>) {
  if (modalMode.value === "create") {
    const newPost: Post = {
      id: String(posts.value.length + 1),
      title: postData.title || "",
      excerpt: postData.excerpt || "",
      content: postData.content || "",
      category: postData.category || "",
      author: postData.author || "",
      date: new Date().toISOString().split("T")[0],
      readTime: "5 min read",
      image: postData.image || "",
      views: 0,
      status: postData.status || "draft",
    };
    posts.value.unshift(newPost);
    toast({
      title: "Post created",
      description: "The post has been created successfully.",
    });
  } else {
    posts.value = posts.value.map((p) =>
      p.id === postData.id ? { ...p, ...postData } : p,
    );
    toast({
      title: "Post updated",
      description: "The post has been updated successfully.",
    });
  }
}

function handleDeletePost(post: Post) {
  postToDelete.value = post;
  deleteDialogOpen.value = true;
}

function confirmDelete() {
  if (postToDelete.value) {
    posts.value = posts.value.filter((p) => p.id !== postToDelete.value?.id);
    toast({
      title: "Post deleted",
      description: "The post has been deleted successfully.",
      variant: "destructive",
    });
  }
  deleteDialogOpen.value = false;
  postToDelete.value = null;
}

function toggleTrending(post: Post) {
  posts.value = posts.value.map((p) =>
    p.id === post.id ? { ...p, trending: !p.trending } : p,
  );
  toast({
    title: post.trending ? "Removed from trending" : "Added to trending",
    description: `"${post.title}" has been ${
      post.trending ? "removed from" : "added to"
    } trending.`,
  });
}

function getStatusColor(status?: string) {
  switch (status) {
    case "published":
      return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
    case "draft":
      return "bg-muted text-muted-foreground";
    case "pending":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
    default:
      return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
  }
}
</script>

<template>
  <div class="space-y-6">
    Page Header
    <div
      class="flex flex-col md:flex-row md:items-center justify-between gap-4"
    >
      <div>
        <h1 class="font-display text-3xl font-bold">Posts</h1>
        <p class="text-muted-foreground mt-1">
          Manage all your published and draft posts.
        </p>
      </div>
      <Button
        class="bg-primary hover:opacity-90 gap-2"
        @click="handleCreatePost"
      >
        <Plus class="w-4 h-4" />
        New Post
      </Button>
    </div>

    Filters
    <div class="bg-card rounded-2xl p-4 card-interactive">
      <div class="flex flex-col sm:flex-row gap-3">
        <div class="relative flex-1">
          <Search
            class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
          />
          <Input
            v-model="searchQuery"
            placeholder="Search posts..."
            class="pl-10"
          />
        </div>

        Category Filter
        <Select v-model="categoryFilter">
          <SelectTrigger class="w-full sm:w-40">
            <Filter class="w-4 h-4 mr-2" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent class="bg-card">
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem
              v-for="cat in categories"
              :key="cat.id"
              :value="cat.slug"
            >
              {{ cat.name }}
            </SelectItem>
          </SelectContent>
        </Select>

        Status Filter
        <Select v-model="statusFilter">
          <SelectTrigger class="w-full sm:w-36">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent class="bg-card">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>

    Posts Table
    <div class="bg-card rounded-2xl card-interactive overflow-hidden">
      <div class="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead class="w-[40%]">Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead class="text-right">Views</TableHead>
              <TableHead class="w-[50px]" />
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow
              v-for="post in filteredPosts"
              :key="post.id"
              class="hover:bg-muted/50"
            >
              <TableCell class="font-medium">
                <button
                  @click="handleViewPost(post)"
                  class="hover:text-primary transition-colors line-clamp-1 text-left flex items-center gap-2"
                >
                  <TrendingUp
                    v-if="post.trending"
                    class="w-4 h-4 text-accent shrink-0"
                  />
                  {{ post.title }}
                </button>
              </TableCell>
              <TableCell class="text-muted-foreground">{{
                post.author
              }}</TableCell>
              <TableCell>
                <span class="category-pill">{{ post.category }}</span>
              </TableCell>
              <TableCell>
                <span
                  class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                  :class="getStatusColor(post.status)"
                >
                  {{
                    (post.status || "published").charAt(0).toUpperCase() +
                    (post.status || "published").slice(1)
                  }}
                </span>
              </TableCell>
              <TableCell class="text-muted-foreground">
                {{ new Date(post.date).toLocaleDateString() }}
              </TableCell>
              <TableCell class="text-right">{{
                post.views.toLocaleString()
              }}</TableCell>

              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" class="h-8 w-8">
                      <MoreHorizontal class="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" class="bg-card">
                    <DropdownMenuItem
                      @click="handleViewPost(post)"
                      class="gap-2"
                    >
                      <Eye class="w-4 h-4" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      @click="handleEditPost(post)"
                      class="gap-2"
                    >
                      <Edit class="w-4 h-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem class="gap-2">
                      <ExternalLink class="w-4 h-4" />
                      View on site
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      @click="toggleTrending(post)"
                      class="gap-2"
                    >
                      <template v-if="post.trending">
                        <TrendingDown class="w-4 h-4" />
                        Remove from trending
                      </template>
                      <template v-else>
                        <TrendingUp class="w-4 h-4" />
                        Add to trending
                      </template>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      @click="handleDeletePost(post)"
                      class="gap-2 text-destructive focus:text-destructive"
                    >
                      <Trash2 class="w-4 h-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>

    Post Modal
    <PostModal
      v-model:open="modalOpen"
      :post="selectedPost"
      :mode="modalMode"
      @save="handleSavePost"
    />

    Delete Confirmation
    <AlertDialog v-model:open="deleteDialogOpen">
      <AlertDialogContent class="bg-card">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Post</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete "{{ postToDelete?.title }}"? This
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
// definePageMeta({ middleware: ["auth"] });

const header = {
  title: "Articles",
  subtitle: "Manage all your published and draft articles.",
};
</script>
<template>
  <div class="space-y-6">
    <PageHeader v-bind="header" />
  </div>
</template>
