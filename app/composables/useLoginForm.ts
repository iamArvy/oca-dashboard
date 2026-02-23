import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";
export const useLoginForm = () => {
  const { success, error } = useToast();
  const { fetch: refreshSession } = useUserSession();
  const { query } = useRoute();
  const redirectPath = (query.redirect as string) || "/";
  const formSchema = toTypedSchema(
    z.object({
      email: z.string().email(),
      password: z.string().min(8).max(50).optional(),
    }),
  );
  const { handleSubmit } = useForm({ validationSchema: formSchema });
  const submit = handleSubmit(async (values) => {
    try {
      const { error } = await useFetch("/api/login", {
        method: "POST",
        body: values,
      });
      if (error.value) throw error.value;
      success("Logged in successfully!");
      await refreshSession();
      navigateTo(redirectPath);
    } catch (err) {
      console.log(err);
      error("Login failed. Please try again.");
    }
  });

  return {
    submit,
  };
};
