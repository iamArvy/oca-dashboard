import type { Feed } from "~/interfaces";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import z from "zod";

type Mode = "edit" | "create";

export function useFeedEditor(item?: Feed | null, mode: Mode = "create") {
  const { success, error } = useToast();

  const formSchema = toTypedSchema(
    z.object({
      name: z.string().min(2, "Name must be at least 2 characters").max(50),
      source: z.string().url(),
      topicId: z.string().min(2),
    }),
  );

  const initialValues = (() => {
    if (mode === "edit" && item) {
      return {
        name: item.name || "",
        source: item.source || "",
        topicId: item.topic.id || "",
      };
    }

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
      await useNuxtApp().$api("/feeds", {
        method: "POST",
        body,
      });
      success("Feed Created Successfully");
    } catch (e: unknown) {
      console.log(e);
      error("Error Creating Feed");
    }
  }

  async function update(id: string, body: object) {
    try {
      await useNuxtApp().$api("/feeds/" + id, {
        method: "PATCH",
        body,
      });
      success("Update Successful");
    } catch (e: unknown) {
      console.log(e);
      error("Error updating Feed");
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
