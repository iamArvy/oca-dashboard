<!-- <script setup lang="ts">
import {
  Save,
  Globe,
  Palette,
  FileText,
  Search as SearchIcon,
  Share2,
} from "lucide-vue-next";
import {
  Button,
  Input,
  Label,
  Textarea,
  Switch,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@shadcn/ui-vue";
import { reactive } from "vue";
import { useToast } from "@/composables/useToast";
import { siteSettings } from "@/lib/mockData";

const settings = reactive(structuredClone(siteSettings));
const { toast } = useToast();

function handleSave() {
  toast({
    title: "Settings saved",
    description: "Your settings have been updated successfully.",
  });
}
</script>

<template>
  <div class="space-y-6">
    Page Header
    <div
      class="flex flex-col md:flex-row md:items-center justify-between gap-4"
    >
      <div>
        <h1 class="font-display text-3xl font-bold">Settings</h1>
        <p class="text-muted-foreground mt-1">
          Manage your site configuration and preferences.
        </p>
      </div>
      <Button @click="handleSave" class="bg-primary hover:opacity-90 gap-2">
        <Save class="w-4 h-4" /> Save Changes
      </Button>
    </div>

    Settings Tabs
    <Tabs default-value="general" class="space-y-6">
      <TabsList class="bg-muted/50 flex-wrap h-auto gap-1 p-1">
        <TabsTrigger value="general" class="gap-2">
          <Globe class="w-4 h-4" /> General
        </TabsTrigger>
        <TabsTrigger value="appearance" class="gap-2">
          <Palette class="w-4 h-4" /> Appearance
        </TabsTrigger>
        <TabsTrigger value="content" class="gap-2">
          <FileText class="w-4 h-4" /> Content
        </TabsTrigger>
        <TabsTrigger value="seo" class="gap-2">
          <SearchIcon class="w-4 h-4" /> SEO
        </TabsTrigger>
        <TabsTrigger value="social" class="gap-2">
          <Share2 class="w-4 h-4" /> Social
        </TabsTrigger>
      </TabsList>

      GENERAL
      <TabsContent value="general">
        <div class="bg-card rounded-2xl p-6 card-interactive space-y-6">
          <h2 class="font-display text-lg font-bold flex items-center gap-2">
            <Globe class="w-5 h-5 text-primary" /> General Settings
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label for="siteName">Site Name</Label>
              <Input
                v-model="settings.general.siteName"
                id="siteName"
                class="mt-1.5"
              />
            </div>
            <div>
              <Label for="tagline">Tagline</Label>
              <Input
                v-model="settings.general.tagline"
                id="tagline"
                class="mt-1.5"
              />
            </div>
            <div>
              <Label for="siteUrl">Site URL</Label>
              <Input
                v-model="settings.general.siteUrl"
                id="siteUrl"
                class="mt-1.5"
              />
            </div>
            <div>
              <Label for="adminEmail">Admin Email</Label>
              <Input
                v-model="settings.general.adminEmail"
                id="adminEmail"
                type="email"
                class="mt-1.5"
              />
            </div>

            Timezone
            <div>
              <Label>Timezone</Label>
              <Select v-model="settings.general.timezone">
                <SelectTrigger class="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent class="bg-card">
                  <SelectItem value="Africa/Lagos"
                    >Africa/Lagos (WAT)</SelectItem
                  >
                  <SelectItem value="Africa/Nairobi"
                    >Africa/Nairobi (EAT)</SelectItem
                  >
                  <SelectItem value="Africa/Johannesburg"
                    >Africa/Johannesburg (SAST)</SelectItem
                  >
                  <SelectItem value="Africa/Cairo"
                    >Africa/Cairo (EET)</SelectItem
                  >
                  <SelectItem value="UTC">UTC</SelectItem>
                </SelectContent>
              </Select>
            </div>

            Language
            <div>
              <Label>Language</Label>
              <Select v-model="settings.general.language">
                <SelectTrigger class="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent class="bg-card">
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="pt">Portuguese</SelectItem>
                  <SelectItem value="sw">Swahili</SelectItem>
                  <SelectItem value="ar">Arabic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </TabsContent>

      APPEARANCE
      <TabsContent value="appearance">
        <div class="bg-card rounded-2xl p-6 card-interactive space-y-6">
          <h2 class="font-display text-lg font-bold flex items-center gap-2">
            <Palette class="w-5 h-5 text-primary" /> Appearance Settings
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            Primary Color
            <div>
              <Label>Primary Color</Label>
              <div class="flex gap-2 mt-1.5">
                <Input
                  v-model="settings.appearance.primaryColor"
                  type="color"
                  class="w-16 h-10 p-1"
                />
                <Input
                  v-model="settings.appearance.primaryColor"
                  class="flex-1"
                />
              </div>
            </div>

            Accent Color
            <div>
              <Label>Accent Color</Label>
              <div class="flex gap-2 mt-1.5">
                <Input
                  v-model="settings.appearance.accentColor"
                  type="color"
                  class="w-16 h-10 p-1"
                />
                <Input
                  v-model="settings.appearance.accentColor"
                  class="flex-1"
                />
              </div>
            </div>

            Dark Mode Default
            <div class="md:col-span-2 flex items-center justify-between">
              <div>
                <Label>Dark Mode Default</Label>
                <p class="text-sm text-muted-foreground">
                  Enable dark mode as the default theme
                </p>
              </div>
              <Switch v-model:checked="settings.appearance.darkModeDefault" />
            </div>
          </div>
        </div>
      </TabsContent>

      CONTENT
      <TabsContent value="content">
        <div class="bg-card rounded-2xl p-6 card-interactive space-y-6">
          <h2 class="font-display text-lg font-bold flex items-center gap-2">
            <FileText class="w-5 h-5 text-primary" /> Content Settings
          </h2>

          <div class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Posts Per Page</Label>
                <Input
                  type="number"
                  v-model="settings.content.postsPerPage"
                  class="mt-1.5"
                />
              </div>
              <div>
                <Label>Excerpt Length (characters)</Label>
                <Input
                  type="number"
                  v-model="settings.content.excerptLength"
                  class="mt-1.5"
                />
              </div>
            </div>

            Toggles
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <Label>Allow Comments</Label>
                  <p class="text-sm text-muted-foreground">
                    Enable comments on posts
                  </p>
                </div>
                <Switch v-model:checked="settings.content.allowComments" />
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <Label>Moderate Comments</Label>
                  <p class="text-sm text-muted-foreground">
                    Require approval before comments are published
                  </p>
                </div>
                <Switch v-model:checked="settings.content.moderateComments" />
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <Label>Allow Guest Comments</Label>
                  <p class="text-sm text-muted-foreground">
                    Allow non-registered users to comment
                  </p>
                </div>
                <Switch v-model:checked="settings.content.allowGuestComments" />
              </div>
            </div>
          </div>
        </div>
      </TabsContent>

      SEO
      <TabsContent value="seo">
        <div class="bg-card rounded-2xl p-6 card-interactive space-y-6">
          <h2 class="font-display text-lg font-bold flex items-center gap-2">
            <SearchIcon class="w-5 h-5 text-primary" /> SEO Settings
          </h2>

          <div class="space-y-4">
            <div>
              <Label>Meta Title</Label>
              <Input v-model="settings.seo.metaTitle" class="mt-1.5" />
              <p class="text-xs text-muted-foreground mt-1">
                {{ settings.seo.metaTitle.length }}/60 characters
              </p>
            </div>

            <div>
              <Label>Meta Description</Label>
              <Textarea
                v-model="settings.seo.metaDescription"
                rows="3"
                class="mt-1.5"
              />
              <p class="text-xs text-muted-foreground mt-1">
                {{ settings.seo.metaDescription.length }}/160 characters
              </p>
            </div>

            <div>
              <Label>Twitter Handle</Label>
              <Input
                v-model="settings.seo.twitterHandle"
                placeholder="@yourusername"
                class="mt-1.5"
              />
            </div>
          </div>
        </div>
      </TabsContent>

      SOCIAL
      <TabsContent value="social">
        <div class="bg-card rounded-2xl p-6 card-interactive space-y-6">
          <h2 class="font-display text-lg font-bold flex items-center gap-2">
            <Share2 class="w-5 h-5 text-primary" /> Social Media Links
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              v-for="(label, key) in {
                facebook: 'Facebook',
                twitter: 'Twitter',
                instagram: 'Instagram',
                linkedin: 'LinkedIn',
                youtube: 'YouTube',
              }"
              :key="key"
            >
              <Label :for="key">{{ label }}</Label>
              <Input
                :id="key"
                v-model="settings.social[key]"
                class="mt-1.5"
                :placeholder="`https://${key}.com/...`"
              />
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  </div>
</template> -->
<script setup lang="ts">
const header = {
  title: "Settings",
  subtitle: "Manage your site configuration and preferences.",
};
</script>
<template>
  <div class="space-y-6">
    <PageHeader v-bind="header" />
  </div>
</template>
