import type { Post } from "~/interfaces";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import z from "zod";
import { PostStatus } from "~/enums";

type Mode = "edit" | "create" | "view";

export function usePostEditor(post?: Post | null, mode: Mode = "create") {
  const { success } = useToast();

  const formSchema = toTypedSchema(
    z.object({
      title: z.string().min(2, "Title must be at least 2 characters").max(50),
      excerpt: z.string().optional(),
      content: z.string().min(2, "Content is required"),
      topicId: z.string().min(2, "Topic is required"),
      image: z.string().optional(),
      status: z.string().default("draft"),
      tags: z.array(z.string().min(2)).optional().default([]),
    }),
  );

  const { handleSubmit, setValues, values } = useForm({
    validationSchema: formSchema,
    // 🧩 Use post values as defaults when editing
    initialValues:
      mode === "edit" && post
        ? {
            title: post.title || "",
            excerpt: post.excerpt || "",
            content: post.content || "",
            topicId: post.topic.id || "",
            image: post.image || "",
            status: post.status || PostStatus.PUBLISHED,
            tags: post.tags || [],
          }
        : {
            title: "",
            excerpt: "",
            content: "",
            topicId: "",
            image: "",
            status: PostStatus.PUBLISHED,
            tags: [],
          },
  });

  function create(values: object) {
    console.log("Creating post:", values);
    // 🔧 Add API or store logic here
    success("Post Created Successfully");
  }

  function update(values: object) {
    console.log("Updating post:", values);
    // 🔧 Add API or store logic here
    success("Post Updated Successfully");
  }

  const onSubmit = handleSubmit((values) => {
    if (mode === "edit") return update(values);
    return create(values);
  });

  return {
    mode,
    onSubmit,
    values,
    setValues,
  };
}
