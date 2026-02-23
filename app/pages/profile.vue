<!-- <script setup lang="ts">
import {
  User,
  Mail,
  Lock,
  Bell,
  Shield,
  Camera,
  Save,
  Eye,
  EyeOff,
} from "lucide-vue-next";
import {
  Button,
  Input,
  Label,
  Switch,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@shadcn/ui-vue";
import { ref, reactive } from "vue";
import { useToast } from "@/composables/useToast";
import { users } from "@/lib/mockData";

const currentUser = users[0];

const profile = reactive({
  name: currentUser.name,
  email: currentUser.email,
  avatar: currentUser.avatar,
});

const passwords = reactive({
  current: "",
  new: "",
  confirm: "",
});

const showPasswords = reactive({
  current: false,
  new: false,
  confirm: false,
});

const notifications = reactive({
  emailNewPosts: true,
  emailComments: true,
  emailMentions: true,
  browserNotifications: true,
  weeklyDigest: false,
});

const { toast } = useToast();

function handleSaveProfile() {
  toast({
    title: "Profile updated",
    description: "Your profile has been updated successfully.",
  });
}

function handleChangePassword() {
  if (passwords.new !== passwords.confirm) {
    toast({
      title: "Passwords do not match",
      description: "Please ensure both passwords match.",
      variant: "destructive",
    });
    return;
  }
  if (passwords.new.length < 8) {
    toast({
      title: "Password too short",
      description: "Password must be at least 8 characters.",
      variant: "destructive",
    });
    return;
  }
  toast({
    title: "Password changed",
    description: "Your password has been updated successfully.",
  });
  passwords.current = "";
  passwords.new = "";
  passwords.confirm = "";
}

function handleSaveNotifications() {
  toast({
    title: "Preferences saved",
    description: "Your notification preferences have been updated.",
  });
}
</script>

<template>
  <div class="space-y-6">
    Page Header
    <div>
      <h1 class="font-display text-3xl font-bold">Profile</h1>
      <p class="text-muted-foreground mt-1">
        Manage your account settings and preferences.
      </p>
    </div>

    Profile Card
    <div class="bg-card rounded-2xl p-6 card-interactive">
      <div class="flex flex-col md:flex-row items-start md:items-center gap-6">
        <div class="relative">
          <Avatar class="w-24 h-24">
            <AvatarImage :src="profile.avatar" :alt="profile.name" />
            <AvatarFallback class="text-2xl bg-primary text-primary-foreground">
              {{ profile.name.charAt(0) }}
            </AvatarFallback>
          </Avatar>
          <button
            class="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity"
          >
            <Camera class="w-4 h-4" />
          </button>
        </div>
        <div class="flex-1">
          <h2 class="font-display text-2xl font-bold">
            {{ currentUser.name }}
          </h2>
          <p class="text-muted-foreground">{{ currentUser.email }}</p>
          <div class="flex items-center gap-2 mt-2">
            <span
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary capitalize"
            >
              {{ currentUser.role }}
            </span>
            <span class="text-xs text-muted-foreground">
              Member since
              {{ new Date(currentUser.createdAt).toLocaleDateString() }}
            </span>
          </div>
        </div>
      </div>
    </div>

    Settings Tabs
    <Tabs default-value="profile" class="space-y-6">
      <TabsList class="bg-muted/50">
        <TabsTrigger value="profile" class="gap-2">
          <User class="w-4 h-4" /> Profile
        </TabsTrigger>
        <TabsTrigger value="security" class="gap-2">
          <Shield class="w-4 h-4" /> Security
        </TabsTrigger>
        <TabsTrigger value="notifications" class="gap-2">
          <Bell class="w-4 h-4" /> Notifications
        </TabsTrigger>
      </TabsList>

      Profile Settings
      <TabsContent value="profile">
        <div class="bg-card rounded-2xl p-6 card-interactive space-y-6">
          <h3 class="font-display text-lg font-bold flex items-center gap-2">
            <User class="w-5 h-5 text-primary" /> Personal Information
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label for="name">Full Name</Label>
              <Input id="name" v-model="profile.name" class="mt-1.5" />
            </div>
            <div>
              <Label for="email">Email Address</Label>
              <div class="relative mt-1.5">
                <Mail
                  class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
                />
                <Input
                  id="email"
                  type="email"
                  v-model="profile.email"
                  class="pl-10"
                />
              </div>
            </div>
          </div>

          <div class="flex justify-end">
            <Button
              @click="handleSaveProfile"
              class="bg-primary hover:opacity-90 gap-2"
            >
              <Save class="w-4 h-4" /> Save Changes
            </Button>
          </div>
        </div>
      </TabsContent>

      Security Settings
      <TabsContent value="security">
        <div class="bg-card rounded-2xl p-6 card-interactive space-y-6">
          <h3 class="font-display text-lg font-bold flex items-center gap-2">
            <Lock class="w-5 h-5 text-primary" /> Change Password
          </h3>

          <div class="space-y-4 max-w-md">
            <div
              v-for="(label, key) in {
                current: 'Current Password',
                new: 'New Password',
                confirm: 'Confirm New Password',
              }"
              :key="key"
            >
              <Label :for="key">{{ label }}</Label>
              <div class="relative mt-1.5">
                <Input
                  :id="key"
                  :type="showPasswords[key] ? 'text' : 'password'"
                  v-model="passwords[key]"
                  class="pr-10"
                />
                <button
                  type="button"
                  @click="showPasswords[key] = !showPasswords[key]"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <component
                    :is="showPasswords[key] ? EyeOff : Eye"
                    class="w-4 h-4"
                  />
                </button>
              </div>
            </div>
          </div>

          <div class="flex justify-end">
            <Button
              @click="handleChangePassword"
              class="bg-primary hover:opacity-90 gap-2"
            >
              <Lock class="w-4 h-4" /> Update Password
            </Button>
          </div>
        </div>
      </TabsContent>

      Notification Settings
      <TabsContent value="notifications">
        <div class="bg-card rounded-2xl p-6 card-interactive space-y-6">
          <h3 class="font-display text-lg font-bold flex items-center gap-2">
            <Bell class="w-5 h-5 text-primary" /> Notification Preferences
          </h3>

          <div class="space-y-6">
            Email Notifications
            <div>
              <h4 class="font-medium mb-4">Email Notifications</h4>
              <div class="space-y-4">
                <div
                  v-for="(item, key) in {
                    emailNewPosts: [
                      'New Posts',
                      'Get notified when new posts are submitted',
                    ],
                    emailComments: [
                      'Comments',
                      'Get notified about new comments on your posts',
                    ],
                    emailMentions: [
                      'Mentions',
                      'Get notified when you\'re mentioned',
                    ],
                    weeklyDigest: [
                      'Weekly Digest',
                      'Receive a weekly summary of activity',
                    ],
                  }"
                  :key="key"
                  class="flex items-center justify-between"
                >
                  <div>
                    <p class="font-medium">{{ item[0] }}</p>
                    <p class="text-sm text-muted-foreground">{{ item[1] }}</p>
                  </div>
                  <Switch v-model:checked="notifications[key]" />
                </div>
              </div>
            </div>

            Browser Notifications
            <div class="border-t border-border pt-6">
              <h4 class="font-medium mb-4">Browser Notifications</h4>
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium">Push Notifications</p>
                  <p class="text-sm text-muted-foreground">
                    Receive notifications in your browser
                  </p>
                </div>
                <Switch v-model:checked="notifications.browserNotifications" />
              </div>
            </div>
          </div>

          <div class="flex justify-end">
            <Button
              @click="handleSaveNotifications"
              class="bg-primary hover:opacity-90 gap-2"
            >
              <Save class="w-4 h-4" /> Save Preferences
            </Button>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  </div>
</template> -->
<script setup lang="ts">
const header = {
  title: "Profile",
  subtitle: "Manage your account settings and preferences.",
};
</script>
<template>
  <div class="space-y-6">
    <PageHeader v-bind="header" />
  </div>
</template>
