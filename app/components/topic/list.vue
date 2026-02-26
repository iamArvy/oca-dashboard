<script setup lang="ts">
import {
  Edit,
  Trash2,
  MoreHorizontal,
  FolderOpen,
  Plus,
  ChevronRight,
} from "lucide-vue-next";

import type { Topic, Topics } from "~/interfaces";

interface Props {
  topics: Topics;
}

interface Emits {
  (e: "edit" | "delete" | "create-subtopic", item: Topic): void;
}

defineProps<Props>();
defineEmits<Emits>();
</script>

<template>
  <div class="bg-card rounded-2xl card-interactive overflow-hidden">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[40%]">Topic</TableHead>
          <!-- <TableHead>Posts</TableHead> -->
          <TableHead>Subtopics</TableHead>
          <TableHead class="w-12.5" />
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-for="item in topics" :key="item.id">
          <TableRow class="hover:bg-muted/50">
            <TableCell>
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"
                >
                  <FolderOpen class="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p class="font-medium">{{ item.name }}</p>
                  <p class="text-xs text-muted-foreground">/{{ item.slug }}</p>
                </div>
              </div>
            </TableCell>
            <!-- <TableCell>{{ item.count }}</TableCell> -->
            <TableCell>{{ item.children?.length || 0 }}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger as-child>
                  <Button variant="ghost" size="icon" class="h-8 w-8">
                    <MoreHorizontal class="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" class="bg-card">
                  <DropdownMenuItem class="gap-2" @click="$emit('edit', item)">
                    <Edit class="w-4 h-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    class="gap-2"
                    @click="$emit('create-subtopic', item)"
                  >
                    <Plus class="w-4 h-4" />
                    Add Subcategory
                  </DropdownMenuItem>
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

          <TableRow
            v-for="sub in item.children"
            :key="sub.id"
            class="hover:bg-muted/50 bg-muted/20"
          >
            <TableCell>
              <div class="flex items-center gap-3 ml-8">
                <ChevronRight class="w-4 h-4 text-muted-foreground" />
                <div>
                  <p class="font-medium text-sm">{{ sub.name }}</p>
                  <p class="text-xs text-muted-foreground">
                    /{{ item.slug }}/{{ sub.slug }}
                  </p>
                </div>
              </div>
            </TableCell>
            <!-- <TableCell class="text-sm text-muted-foreground">{{
              sub.count || 0
            }}</TableCell> -->
            <TableCell>—</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger as-child>
                  <Button variant="ghost" size="icon" class="h-8 w-8">
                    <MoreHorizontal class="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" class="bg-card">
                  <DropdownMenuItem class="gap-2" @click="$emit('edit', sub)">
                    <Edit class="w-4 h-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    class="gap-2 text-destructive focus:text-destructive"
                    @click="$emit('edit', sub)"
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
</template>
