<script setup lang="ts">
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import Placeholder from "@tiptap/extension-placeholder";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Bold,
  Italic,
  List as ListIcon,
  ListOrdered,
  Link as LinkIcon,
  Image as ImageIcon,
  Youtube as YoutubeIcon,
  Heading1,
  Heading2,
  Quote,
  Undo,
  Redo,
} from "lucide-vue-next";

interface Props {
  modelValue?: string;
  placeholder?: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{ (e: "update:modelValue", value: string): void }>();

// Editor instance
const editor = useEditor({
  extensions: [
    StarterKit.configure({
      heading: { levels: [1, 2, 3] },
    }),
    Link.configure({
      openOnClick: false,
      HTMLAttributes: { class: "text-primary underline" },
    }),
    Image.configure({
      HTMLAttributes: { class: "rounded-lg max-w-full h-auto" },
    }),
    Youtube.configure({
      HTMLAttributes: {
        class: "rounded-lg overflow-hidden aspect-video w-full",
      },
    }),
    Placeholder.configure({
      placeholder: props.placeholder || "Write something...",
    }),
  ],
  content: props.modelValue,
  onUpdate: ({ editor }) => {
    emit("update:modelValue", editor.getHTML());
  },
  editorProps: {
    attributes: {
      class:
        "prose prose-sm dark:prose-invert max-w-none focus:outline-none min-h-[300px] p-4",
    },
  },
});

watch(
  () => props.modelValue,
  (value) => {
    if (editor.value && value !== editor.value.getHTML()) {
      editor.value.commands.setContent(value || "", { emitUpdate: false });
    }
  },
);

onBeforeUnmount(() => {
  editor.value?.destroy();
});
// Toolbar actions
const setLink = () => {
  if (!editor.value) return;

  const previousUrl = editor.value.getAttributes("link").href;
  const url = window.prompt("Enter URL", previousUrl);

  if (url === null) return;
  if (url === "") {
    editor.value.chain().focus().extendMarkRange("link").unsetLink().run();
    return;
  }
  editor.value
    .chain()
    .focus()
    .extendMarkRange("link")
    .setLink({ href: url })
    .run();
};

const addImage = () => {
  if (!editor.value) return;
  const url = window.prompt("Enter image URL");
  if (url) editor.value.chain().focus().setImage({ src: url }).run();
};

const addYoutube = () => {
  if (!editor.value) return;
  const url = window.prompt("Enter YouTube URL");
  if (url) editor.value.commands.setYoutubeVideo({ src: url });
};

// Toolbar button helper
const isActive = (name: string, options?: object) =>
  editor.value?.isActive(name, options) || false;
</script>

<template>
  <div class="border border-border rounded-lg overflow-hidden bg-background">
    <!-- Toolbar -->
    <div
      class="flex flex-wrap items-center gap-1 p-2 border-b border-border bg-muted/50"
    >
      <Button
        type="button"
        variant="ghost"
        size="sm"
        :class="
          cn(
            'h-8 w-8 p-0',
            isActive('heading', { level: 1 }) && 'bg-muted text-primary',
          )
        "
        @click="editor?.chain().focus().toggleHeading({ level: 1 }).run()"
        title="Heading 1"
      >
        <Heading1 class="w-4 h-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        :class="
          cn(
            'h-8 w-8 p-0',
            isActive('heading', { level: 2 }) && 'bg-muted text-primary',
          )
        "
        @click="editor?.chain().focus().toggleHeading({ level: 2 }).run()"
        title="Heading 2"
      >
        <Heading2 class="w-4 h-4" />
      </Button>

      <div class="w-px h-6 bg-border mx-1" />

      <Button
        type="button"
        variant="ghost"
        size="sm"
        :class="cn('h-8 w-8 p-0', isActive('bold') && 'bg-muted text-primary')"
        @click="editor?.chain().focus().toggleBold().run()"
        title="Bold"
      >
        <Bold class="w-4 h-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        :class="
          cn('h-8 w-8 p-0', isActive('italic') && 'bg-muted text-primary')
        "
        @click="editor?.chain().focus().toggleItalic().run()"
        title="Italic"
      >
        <Italic class="w-4 h-4" />
      </Button>

      <div class="w-px h-6 bg-border mx-1" />

      <Button
        type="button"
        variant="ghost"
        size="sm"
        :class="
          cn('h-8 w-8 p-0', isActive('bulletList') && 'bg-muted text-primary')
        "
        @click="editor?.chain().focus().toggleBulletList().run()"
        title="Bullet List"
      >
        <ListIcon class="w-4 h-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        :class="
          cn('h-8 w-8 p-0', isActive('orderedList') && 'bg-muted text-primary')
        "
        @click="editor?.chain().focus().toggleOrderedList().run()"
        title="Numbered List"
      >
        <ListOrdered class="w-4 h-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        :class="
          cn('h-8 w-8 p-0', isActive('blockquote') && 'bg-muted text-primary')
        "
        @click="editor?.chain().focus().toggleBlockquote().run()"
        title="Quote"
      >
        <Quote class="w-4 h-4" />
      </Button>

      <div class="w-px h-6 bg-border mx-1" />

      <Button
        type="button"
        variant="ghost"
        size="sm"
        :class="cn('h-8 w-8 p-0', isActive('link') && 'bg-muted text-primary')"
        @click="setLink"
        title="Add Link"
      >
        <LinkIcon class="w-4 h-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        class="h-8 w-8 p-0"
        @click="addImage"
        title="Add Image"
      >
        <ImageIcon class="w-4 h-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        class="h-8 w-8 p-0"
        @click="addYoutube"
        title="Add YouTube Video"
      >
        <YoutubeIcon class="w-4 h-4" />
      </Button>

      <div class="flex-1" />

      <Button
        type="button"
        variant="ghost"
        size="sm"
        class="h-8 w-8 p-0"
        @click="editor?.chain().focus().undo().run()"
        title="Undo"
      >
        <Undo class="w-4 h-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        class="h-8 w-8 p-0"
        @click="editor?.chain().focus().redo().run()"
        title="Redo"
      >
        <Redo class="w-4 h-4" />
      </Button>
    </div>

    <!-- Editor -->
    <EditorContent :editor="editor" />
  </div>
</template>
