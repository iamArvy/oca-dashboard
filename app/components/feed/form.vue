<script setup lang="ts">
import type { ApiListResponse, Feed, Topics } from "~/interfaces";

type Mode = "edit" | "create";
const props = defineProps<{
  feed?: Feed | null;
  mode: Mode;
}>();
defineEmits<{
  (e: "save", data: Partial<Feed>): void;
  (e: "cancel"): void;
}>();

const { onSubmit } = useFeedEditor(props.feed, props.mode);
const { data: topics } = useAPI<ApiListResponse<Topics>>("/topics");
</script>

<template>
  <form class="space-y-6" @submit.prevent="onSubmit">
    <!-- Name -->
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input v-bind="componentField" placeholder="Enter name of Feed" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <!-- Source -->
    <FormField v-slot="{ componentField }" name="source">
      <FormItem>
        <FormLabel>Source</FormLabel>
        <FormControl>
          <Input v-bind="componentField" placeholder="Enter source of Feed" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="topicId">
      <FormItem>
        <FormLabel>Topic</FormLabel>
        <FormControl>
          <Select v-bind="componentField">
            <SelectTrigger
              ><SelectValue placeholder="Select Topic"
            /></SelectTrigger>
            <SelectContent class="bg-card">
              <SelectItem
                v-for="cat in topics?.data"
                :key="cat.id"
                :value="cat.id"
                >{{ cat.name }}</SelectItem
              >
            </SelectContent>
          </Select>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <DialogFooter>
      <Button variant="outline" type="button" @click="$emit('cancel')"
        >Cancel</Button
      >
      <Button type="submit" class="bg-primary hover:opacity-90">Save</Button>
    </DialogFooter>
  </form>
</template>
