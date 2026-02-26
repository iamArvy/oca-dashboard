import type { Topic } from "~/interfaces";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import z from "zod";

type Mode = "edit" | "create";
// type Type = "topic" | "subtopic";

export function useTopicEditor(item?: Topic | null, mode: Mode = "create") {
  const { success, error } = useToast();

  const formSchema = toTypedSchema(
    z.object({
      name: z.string().min(2, "Title must be at least 2 characters").max(50),
      parentId: z.string().optional(),
    }),
  );

  const initialValues = (() => {
    if (mode === "edit" && item) {
      return {
        name: item.name || "",
      };
    }

    if (mode === "create" && item) {
      alert("subtopic");
      return {
        name: "",
        parentId: item.id,
      };
    }

    // Default (creating a top-level topic)
    return {
      name: "",
    };
  })();

  const { handleSubmit, setValues, values } = useForm({
    validationSchema: formSchema,
    initialValues,
  });

  async function create(body: object) {
    try {
      await useNuxtApp().$api("/topics", {
        method: "POST",
        body,
      });
      success("Topic Created Successfully");
    } catch (e: unknown) {
      console.log(e);
      error("Error Creating Topic");
    }
  }

  async function update(id: string, body: object) {
    try {
      await useNuxtApp().$api("/topics/" + id, {
        method: "PATCH",
        body,
      });
      success("Update Successful");
    } catch (e: unknown) {
      console.log(e);
      error("Error updating Topic");
    }
  }

  const onSubmit = handleSubmit((values) => {
    if (mode === "edit" && item) return update(item.id, values);
    return create(values);
  });

  return {
    mode,
    onSubmit,
    values,
    setValues,
  };
}
