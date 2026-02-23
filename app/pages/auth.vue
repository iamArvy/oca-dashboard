<!-- <script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft } from "lucide-vue-next";
import {
  Button,
  Input,
  Label,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Separator,
} from "@shadcn/ui-vue";
import { useToast } from "@/composables/useToast";
import { useAuth } from "@/composables/useAuth"; // your composable equivalent of useAuth()

const isLogin = ref(true);
const showPassword = ref(false);
const email = ref("");
const password = ref("");
const name = ref("");
const isSubmitting = ref(false);

const router = useRouter();
const { toast } = useToast();
const { login, signup, isAuthenticated } = useAuth();

// Redirect if already authenticated
watchEffect(() => {
  if (isAuthenticated.value) router.push("/profile");
});

async function handleSubmit(e: Event) {
  e.preventDefault();
  isSubmitting.value = true;

  try {
    const result = isLogin.value
      ? await login(email.value, password.value)
      : await signup(email.value, password.value, name.value);

    if (result.success) {
      toast({
        title: isLogin.value ? "Welcome back!" : "Account created!",
        description: isLogin.value
          ? "You have successfully logged in."
          : "Your account has been created successfully.",
      });
      router.push("/profile");
    } else {
      toast({
        title: "Error",
        description: result.error || "Something went wrong",
        variant: "destructive",
      });
    }
  } catch (error) {
    toast({
      title: "Error",
      description: "An unexpected error occurred",
      variant: "destructive",
    });
  } finally {
    isSubmitting.value = false;
  }
}

function handleSocialAuth(provider: string) {
  toast({
    title: "Coming Soon",
    description: `${provider} authentication will be available when backend is connected.`,
  });
}
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex items-center justify-center p-4"
  >
    <div class="w-full max-w-md">
      Back to Home
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft class="w-4 h-4" /> Back to Home
      </NuxtLink>

      <Card class="border-border/50 shadow-xl">
        <CardHeader class="text-center pb-2">
          <div
            class="w-12 h-12 rounded-lg bg-primary flex items-center justify-center mx-auto mb-4"
          >
            <span class="text-primary-foreground font-display text-xl font-bold"
              >A</span
            >
          </div>
          <CardTitle class="text-2xl font-display">
            {{ isLogin ? "Welcome Back" : "Create Account" }}
          </CardTitle>
          <CardDescription>
            {{
              isLogin
                ? "Sign in to your AfricaNews account"
                : "Join the AfricaNews community today"
            }}
          </CardDescription>
        </CardHeader>

        <CardContent class="space-y-6">
          Social Auth
          <div class="grid grid-cols-2 gap-3">
            <Button variant="outline" @click="handleSocialAuth('Google')">
              <svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </Button>

            <Button variant="outline" @click="handleSocialAuth('X')">
              <svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                />
              </svg>
              X
            </Button>

            <Button variant="outline" @click="handleSocialAuth('Facebook')">
              <svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                />
              </svg>
              Facebook
            </Button>

            <Button variant="outline" @click="handleSocialAuth('Instagram')">
              <svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"
                />
              </svg>
              Instagram
            </Button>
          </div>

          Separator
          <div class="relative">
            <Separator />
            <span
              class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground"
            >
              or continue with email
            </span>
          </div>

          Email/Password Form
          <form @submit="handleSubmit" class="space-y-4">
            Name (only for signup)
            <div v-if="!isLogin" class="space-y-2">
              <Label for="name">Full Name</Label>
              <div class="relative">
                <User
                  class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
                />
                <Input
                  id="name"
                  v-model="name"
                  type="text"
                  placeholder="John Doe"
                  class="pl-10"
                  required
                />
              </div>
            </div>

            Email
            <div class="space-y-2">
              <Label for="email">Email</Label>
              <div class="relative">
                <Mail
                  class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
                />
                <Input
                  id="email"
                  v-model="email"
                  type="email"
                  placeholder="you@example.com"
                  class="pl-10"
                  required
                />
              </div>
            </div>

            Password
            <div class="space-y-2">
              <Label for="password">Password</Label>
              <div class="relative">
                <Lock
                  class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
                />
                <Input
                  id="password"
                  :type="showPassword ? 'text' : 'password'"
                  v-model="password"
                  placeholder="••••••••"
                  class="pl-10 pr-10"
                  required
                  minlength="6"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <component
                    :is="showPassword ? EyeOff : Eye"
                    class="w-4 h-4"
                  />
                </button>
              </div>
            </div>

            Forgot Password
            <div v-if="isLogin" class="text-right">
              <button
                type="button"
                class="text-sm text-primary hover:underline"
                @click="
                  toast({
                    title: 'Coming Soon',
                    description: 'Password reset will be available soon.',
                  })
                "
              >
                Forgot password?
              </button>
            </div>

            Submit
            <Button
              type="submit"
              class="w-full bg-primary hover:opacity-90"
              :disabled="isSubmitting"
            >
              {{
                isSubmitting
                  ? "Please wait..."
                  : isLogin
                    ? "Sign In"
                    : "Create Account"
              }}
            </Button>
          </form>

          Toggle
          <p class="text-center text-sm text-muted-foreground">
            {{
              isLogin ? "Don't have an account? " : "Already have an account? "
            }}
            <button
              type="button"
              @click="isLogin = !isLogin"
              class="text-primary hover:underline font-medium"
            >
              {{ isLogin ? "Sign up" : "Sign in" }}
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  </div>
</template> -->
<template>
  <div>Auth Page</div>
</template>
