<script setup lang="ts">
import {
  Eye,
  Edit,
  Trash2,
  TrendingUp,
  TrendingDown,
  ExternalLink,
  MoreHorizontal,
} from "lucide-vue-next";

import type { Post } from "~/interfaces";

interface Props {
  posts: Post[];
}

interface Emits {
  (e: "view" | "edit" | "delete" | "toggle-trending", post: Post): void;
}

const props = defineProps<Props>();
defineEmits<Emits>();

const getStatusColor = (status?: string) => {
  switch (status) {
    case "published":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
    case "draft":
      return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
    case "pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
    default:
      return "bg-muted text-muted-foreground";
  }
};
</script>

<template>
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
            v-for="post in props.posts"
            :key="post.id"
            class="hover:bg-muted/50"
          >
            <TableCell class="font-medium">
              <button
                @click="$emit('view', post)"
                class="hover:text-primary transition-colors line-clamp-1 text-left flex items-center gap-2"
              >
                <TrendingUp
                  v-if="post.trending"
                  class="w-4 h-4 text-accent shrink-0"
                />
                {{ post.title }}
              </button>
            </TableCell>

            <TableCell class="text-muted-foreground">
              {{ post.author }}
            </TableCell>

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

            <TableCell class="text-right">
              {{ post.views.toLocaleString() }}
            </TableCell>

            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" class="h-8 w-8">
                    <MoreHorizontal class="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" class="bg-card">
                  <DropdownMenuItem @click="$emit('view', post)" class="gap-2">
                    <Eye class="w-4 h-4" />
                    View
                  </DropdownMenuItem>

                  <DropdownMenuItem @click="$emit('edit', post)" class="gap-2">
                    <Edit class="w-4 h-4" />
                    Edit
                  </DropdownMenuItem>

                  <DropdownMenuItem class="gap-2">
                    <ExternalLink class="w-4 h-4" />
                    View on site
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    @click="$emit('toggle-trending', post)"
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
                    @click="$emit('delete', post)"
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
</template>
