<script setup lang="ts">
import {
  Eye,
  Edit,
  Trash2,
  // TrendingUp,
  // TrendingDown,
  ExternalLink,
  MoreHorizontal,
} from "lucide-vue-next";
import { PostStatus, SourceType } from "~/enums";

import type { Post, Posts } from "~/interfaces";

interface Props {
  posts: Posts;
}

interface Emits {
  (e: "view" | "edit" | "delete" | "toggle-trending", post: Post): void;
}

const props = defineProps<Props>();
defineEmits<Emits>();

const getStatusColor = (status?: PostStatus) => {
  switch (status) {
    case PostStatus.PUBLISHED:
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
    case PostStatus.DRAFT:
      return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
    // case "pending":
    //   return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
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
            <TableHead class="w-12.5" />
            <TableHead class="w-[40%]">Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Topic</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Views</TableHead>
            <TableHead class="w-12.5" />
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow
            v-for="item in props.posts"
            :key="item.id"
            class="hover:bg-muted/50"
          >
            <TableCell>
              <NuxtImg
                :src="item.image"
                class="aspect-square"
                placeholder="grey"
              />
            </TableCell>
            <TableCell class="font-medium">
              <button
                class="hover:text-primary transition-colors line-clamp-1 text-left flex items-center gap-2"
                @click="$emit('view', item)"
              >
                <!-- <TrendingUp
                  v-if="item.isTrending"
                  class="w-4 h-4 text-accent shrink-0"
                /> -->
                {{ item.title }}
              </button>
            </TableCell>

            <TableCell class="text-muted-foreground">
              {{
                item.source === SourceType.INTERNAL
                  ? item.author?.name
                  : item.external?.source
              }}
            </TableCell>

            <TableCell>
              <span class="category-pill">{{ item.topic.name }}</span>
            </TableCell>

            <TableCell>
              <span
                class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                :class="getStatusColor(item.status)"
              >
                {{ item.status }}
              </span>
            </TableCell>

            <TableCell class="text-muted-foreground">
              {{ new Date(item.createdAt).toLocaleDateString() }}
            </TableCell>

            <TableCell>
              {{ item.views.toLocaleString() }}
            </TableCell>

            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger as-child>
                  <Button variant="ghost" size="icon" class="h-8 w-8">
                    <MoreHorizontal class="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" class="bg-card">
                  <DropdownMenuItem class="gap-2" @click="$emit('view', item)">
                    <Eye class="w-4 h-4" />
                    View
                  </DropdownMenuItem>

                  <DropdownMenuItem class="gap-2" @click="$emit('edit', item)">
                    <Edit class="w-4 h-4" />
                    Edit
                  </DropdownMenuItem>

                  <DropdownMenuItem class="gap-2">
                    <ExternalLink class="w-4 h-4" />
                    View on site
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <!-- <DropdownMenuItem
                    class="gap-2"
                    @click="$emit('toggle-trending', item)"
                  >
                    <template v-if="item.isTrending">
                      <TrendingDown class="w-4 h-4" />
                      Remove from trending
                    </template>
                    <template v-else>
                      <TrendingUp class="w-4 h-4" />
                      Add to trending
                    </template>
                  </DropdownMenuItem> -->

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    class="gap-2 text-destructive focus:text-destructive"
                    @click="$emit('delete', item)"
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
