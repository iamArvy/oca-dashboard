<script setup lang="ts">
import { Edit, Trash2, MoreHorizontal } from "lucide-vue-next";

import type { Feed, Feeds } from "~/interfaces";

interface Props {
  feeds: Feeds;
}

interface Emits {
  (e: "edit" | "delete", item: Feed): void;
}

defineProps<Props>();
defineEmits<Emits>();
</script>

<template>
  <div class="bg-card rounded-2xl card-interactive overflow-hidden">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[40%]">Feed</TableHead>
          <TableHead>Source</TableHead>
          <TableHead>Topic</TableHead>
          <TableHead class="w-12.5" />
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow
          v-for="item in feeds"
          :key="item.id"
          class="hover:bg-muted/50"
        >
          <TableCell>
            {{ item.name }}
          </TableCell>
          <TableCell>{{ item.source }}</TableCell>
          <TableCell>{{ item.topic.name }}</TableCell>
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
</template>
