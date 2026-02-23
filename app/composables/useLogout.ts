import { APP_ROUTES } from "~/constants";

export function useLogout() {
  const { loggedIn, clear } = useUserSession();

  function logout() {
    if (!loggedIn) return;
    clear();
    navigateTo(APP_ROUTES.login.path);
  }

  return {
    logout,
  };
}
