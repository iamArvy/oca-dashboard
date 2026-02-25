<script setup lang="ts">
import { categories } from "@/lib/mockData";
import type { Post } from "~/interfaces";

type Mode = "edit" | "create" | "view";
const props = defineProps<{ post?: Post | null; mode: Mode }>();
// defineEmits<{ (e: "save", data: Partial<Post>): void }>();

const { onSubmit } = usePostEditor(props.post, props.mode);

// Optional: keep vee-validate and local value in sync
// watch(
//   () => value,
//   (newVal) => {
//     if (Array.isArray(newVal)) {
//       localTags.value = newVal;
//     }
//   },
//   { immediate: true },
// );
</script>

<template>
  <form class="space-y-6" @submit.prevent="onSubmit">
    <!-- Image -->
    <FormField v-slot="{ componentField }" name="image">
      <FormItem>
        <FormLabel>Featured Image</FormLabel>
        <FormControl>
          <ImageUpload v-bind="componentField" />
          <Input
            v-bind="componentField"
            class="mt-2"
            placeholder="Or paste image URL..."
          />
        </FormControl>
        <!-- <FormDescription> This is your public display name. </FormDescription> -->
        <FormMessage />
      </FormItem>
    </FormField>

    <!-- Title -->
    <FormField v-slot="{ componentField }" name="title">
      <FormItem>
        <FormLabel>Excerpt</FormLabel>
        <FormControl>
          <Input v-bind="componentField" placeholder="Enter post title" />
        </FormControl>
        <!-- <FormDescription> This is your public display name. </FormDescription> -->
        <FormMessage />
      </FormItem>
    </FormField>

    <!-- Category -->
    <FormField v-slot="{ componentField }" name="category">
      <FormItem>
        <FormLabel>Category</FormLabel>
        <FormControl>
          <Select v-bind="componentField">
            <SelectTrigger
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
        </FormControl>
        <!-- <FormDescription> This is your public display name. </FormDescription> -->
        <FormMessage />
      </FormItem>
    </FormField>

    <!-- Tags -->
    <FormField v-slot="{ handleChange, value }" name="tags">
      <FormItem>
        <FormLabel>Tags</FormLabel>
        <FormControl>
          <TagsInput :model-value="value" @update:model-value="handleChange">
            <TagsInputItem v-for="item in value" :key="item" :value="item">
              <TagsInputItemText />
              <TagsInputItemDelete />
            </TagsInputItem>

            <TagsInputInput placeholder="Fruits..." />
          </TagsInput>
        </FormControl>
        <!-- <FormDescription> This is your public display name. </FormDescription> -->
        <FormMessage />
      </FormItem>
    </FormField>

    <!-- Content -->
    <FormField v-slot="{ componentField }" name="excerpt">
      <FormItem>
        <FormLabel>Excerpt</FormLabel>
        <FormControl>
          <Textarea
            v-bind="componentField"
            placeholder="Brief summary"
            rows="3"
          />
        </FormControl>
        <!-- <FormDescription> This is your public display name. </FormDescription> -->
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="content">
      <FormItem>
        <FormLabel>Content</FormLabel>
        <FormControl>
          <TextEditor v-bind="componentField" />
        </FormControl>
        <!-- <FormDescription> This is your public display name. </FormDescription> -->
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
