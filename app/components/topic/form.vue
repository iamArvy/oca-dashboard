<script setup lang="ts">
import type { Topic } from "~/interfaces";

type Mode = "edit" | "create";
type Type = "topic" | "subtopic";
const props = defineProps<{
  topic?: Topic | null;
  mode: Mode;
  type: Type;
}>();
defineEmits<{
  (e: "save", data: Partial<Topic>): void;
  (e: "cancel"): void;
}>();

const { onSubmit } = useTopicEditor(props.topic, props.mode);
</script>

<template>
  <form class="space-y-6" @submit.prevent="onSubmit">
    <!-- Name -->
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input v-bind="componentField" placeholder="Enter name of Topic" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <!-- <FormField
      v-if="topic && type === 'subtopic'"
      v-slot="{ componentField }"
      name="parentId"
    >
      <FormItem>
        <FormLabel>Parent</FormLabel>
        <FormControl>
          <Select v-bind="componentField">
            <SelectTrigger
              ><SelectValue placeholder="Select Topic"
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
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField> -->

    <DialogFooter>
      <Button variant="outline" type="button" @click="$emit('cancel')"
        >Cancel</Button
      >
      <Button type="submit" class="bg-primary hover:opacity-90">Save</Button>
    </DialogFooter>
  </form>
</template>
