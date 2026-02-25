<!-- <script setup lang="ts">
import {
  Search,
  TrendingUp,
  Flame,
  X,
  Plus,
  Eye,
  Clock,
} from "lucide-vue-next";
import {
  Button,
  Input,
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Badge,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@shadcn/ui-vue";
import { ref, computed } from "vue";
import { useToast } from "@/composables/useToast";
import { posts as initialPosts } from "@/lib/mockData";

const posts = ref([...initialPosts]);
const searchQuery = ref("");
const addModalOpen = ref(false);
const addType = ref<"trending" | "hotTopic">("trending");
const { toast } = useToast();

const trendingPosts = computed(() => posts.value.filter((p) => p.trending));
const hotTopicPosts = computed(() => posts.value.filter((p) => p.hotTopic));
const availablePosts = computed(() =>
  posts.value.filter(
    (p) => p.status === "published" && !p.trending && !p.hotTopic,
  ),
);
const filteredAvailable = computed(() =>
  availablePosts.value.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.value.toLowerCase()),
  ),
);

function handleRemove(post, type: "trending" | "hotTopic") {
  posts.value = posts.value.map((p) =>
    p.id === post.id ? { ...p, [type]: false } : p,
  );
  toast({
    title: `Removed from ${type === "trending" ? "Trending" : "Hot Topics"}`,
    description: `"${post.title}" has been removed.`,
  });
}

function handleAdd(post) {
  posts.value = posts.value.map((p) =>
    p.id === post.id ? { ...p, [addType.value]: true } : p,
  );
  toast({
    title: `Added to ${
      addType.value === "trending" ? "Trending" : "Hot Topics"
    }`,
    description: `"${post.title}" has been added.`,
  });
  addModalOpen.value = false;
}

function openAddModal(type: "trending" | "hotTopic") {
  addType.value = type;
  searchQuery.value = "";
  addModalOpen.value = true;
}
</script>

<template>
  <div class="space-y-6">
    Page Header
    <div>
      <h1 class="font-display text-3xl font-bold">Trending & Hot Topics</h1>
      <p class="text-muted-foreground mt-1">
        Manage featured and trending content on your site.
      </p>
    </div>

    Tabs
    <Tabs default-value="trending" class="space-y-6">
      <TabsList class="bg-muted/50">
        <TabsTrigger value="trending" class="gap-2">
          <TrendingUp class="w-4 h-4" /> Trending ({{ trendingPosts.length }})
        </TabsTrigger>
        <TabsTrigger value="hotTopics" class="gap-2">
          <Flame class="w-4 h-4" /> Hot Topics ({{ hotTopicPosts.length }})
        </TabsTrigger>
      </TabsList>

      Trending Tab
      <TabsContent value="trending" class="space-y-4">
        <div class="flex justify-between items-center">
          <p class="text-sm text-muted-foreground">
            Posts marked as trending appear in the carousel and are highlighted
            across the site.
          </p>
          <Button
            @click="openAddModal('trending')"
            class="bg-primary hover:opacity-90 gap-2"
          >
            <Plus class="w-4 h-4" /> Add Post
          </Button>
        </div>
        <PostList
          :postList="trendingPosts"
          type="trending"
          @remove="handleRemove"
        />
      </TabsContent>

      Hot Topics Tab
      <TabsContent value="hotTopics" class="space-y-4">
        <div class="flex justify-between items-center">
          <p class="text-sm text-muted-foreground">
            Hot topic posts are featured prominently on the Hot Topics page and
            navigation.
          </p>
          <Button
            @click="openAddModal('hotTopic')"
            class="bg-primary hover:opacity-90 gap-2"
          >
            <Plus class="w-4 h-4" /> Add Post
          </Button>
        </div>
        <PostList
          :postList="hotTopicPosts"
          type="hotTopic"
          @remove="handleRemove"
        />
      </TabsContent>
    </Tabs>

    Add Post Modal
    <Dialog v-model:open="addModalOpen">
      <DialogContent class="bg-card max-w-2xl">
        <DialogHeader>
          <DialogTitle class="flex items-center gap-2">
            <template v-if="addType === 'trending'">
              <TrendingUp class="w-5 h-5 text-primary" /> Add to Trending
            </template>
            <template v-else>
              <Flame class="w-5 h-5 text-accent" /> Add to Hot Topics
            </template>
          </DialogTitle>
        </DialogHeader>

        <div class="py-4">
          <div class="relative mb-4">
            <Search
              class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
            />
            <Input
              v-model="searchQuery"
              placeholder="Search published posts..."
              class="pl-10"
            />
          </div>

          <div class="max-h-[400px] overflow-y-auto space-y-2">
            <template v-if="filteredAvailable.length > 0">
              <div
                v-for="post in filteredAvailable"
                :key="post.id"
                class="flex items-center gap-4 p-3 rounded-xl border border-border hover:bg-muted/50 cursor-pointer transition-colors"
                @click="handleAdd(post)"
              >
                <img
                  :src="post.image"
                  :alt="post.title"
                  class="w-16 h-16 rounded-lg object-cover"
                />
                <div class="flex-1 min-w-0">
                  <p class="font-medium line-clamp-1">{{ post.title }}</p>
                  <div
                    class="flex items-center gap-3 text-xs text-muted-foreground mt-1"
                  >
                    <Badge variant="outline" class="text-xs">{{
                      post.category
                    }}</Badge>
                    <span>{{ post.author }}</span>
                    <span>{{ post.views.toLocaleString() }} views</span>
                  </div>
                </div>
                <Button size="sm" variant="outline" class="shrink-0">
                  <Plus class="w-4 h-4" />
                </Button>
              </div>
            </template>
            <template v-else>
              <div class="text-center py-8 text-muted-foreground">
                No available posts found.
              </div>
            </template>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>

PostList component
<script lang="ts">
export default {
  name: "PostList",
  props: {
    postList: Array,
    type: String,
  },
  emits: ["remove"],
  setup(props, { emit }) {
    return () => (
      <div class="bg-card rounded-2xl card-interactive overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead class="w-[50%]">Post</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Date</TableHead>
              <TableHead class="w-[100px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {props.postList.length > 0 ? (
              props.postList.map((post) => (
                <TableRow key={post.id} class="hover:bg-muted/50">
                  <TableCell>
                    <div class="flex items-center gap-3">
                      <img
                        src={post.image}
                        alt={post.title}
                        class="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <p class="font-medium line-clamp-1">{post.title}</p>
                        <p class="text-xs text-muted-foreground">
                          {post.author}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{post.category}</Badge>
                  </TableCell>
                  <TableCell class="text-muted-foreground">
                    <span class="flex items-center gap-1">
                      <Eye class="w-3 h-3" /> {post.views.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell class="text-muted-foreground">
                    <span class="flex items-center gap-1">
                      <Clock class="w-3 h-3" />
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      class="text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => emit("remove", post, props.type)}
                    >
                      <X class="w-4 h-4 mr-1" /> Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colspan="5"
                  class="text-center py-8 text-muted-foreground"
                >
                  No posts in this list yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    );
  },
};
</script> -->
<script setup lang="ts">
const header = {
  title: "Featured Posts",
  subtitle: "Manage Featured Posts on the website",
};
</script>
<template>
  <div class="space-y-6">
    <PageHeader v-bind="header" />
  </div>
</template>
