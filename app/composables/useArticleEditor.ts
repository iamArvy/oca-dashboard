import type { Post } from "~/interfaces";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import z from "zod";

type Mode = "edit" | "create" | "view";

export function useArticleEditor(post?: Post | null, mode: Mode = "create") {
  const { success } = useToast();

  const formSchema = toTypedSchema(
    z.object({
      title: z.string().min(2, "Title must be at least 2 characters").max(50),
      excerpt: z.string().optional(),
      content: z.string().min(2, "Content is required"),
      category: z.string().min(2, "Category is required"),
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
            category: post.category || "",
            image: post.image || "",
            status: post.status || "draft",
            tags: post.tags || [],
          }
        : {
            title: "",
            excerpt: "",
            content: "",
            category: "",
            image: "",
            status: "draft",
            tags: [],
          },
  });

  function create(values: object) {
    console.log("Creating article:", values);
    // 🔧 Add API or store logic here
    success("Article Created Successfully");
  }

  function update(values: object) {
    console.log("Updating article:", values);
    // 🔧 Add API or store logic here
    success("Article Updated Successfully");
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
