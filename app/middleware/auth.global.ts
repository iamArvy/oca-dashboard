export default defineNuxtRouteMiddleware((to) => {
  if (["/login", "/register", "/forgot-password"].includes(to.path)) {
    return;
  }
  const { loggedIn } = useUserSession();

  // redirect the user to the login screen if they're not authenticated
  if (!loggedIn.value) {
    return navigateTo(`/login?redirect=${to.path}`);
  }
});
