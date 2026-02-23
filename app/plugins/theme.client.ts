// plugins/theme.client.ts
import { initializeTheme } from "~/composables/useTheme";
export default defineNuxtPlugin(() => {
  initializeTheme();
});