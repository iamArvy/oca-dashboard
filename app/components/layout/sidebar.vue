<script setup lang="ts">
import { computed } from "vue";
import { useRoute, RouterLink } from "vue-router";
import {
  LayoutDashboard,
  FileText,
  Users,
  Shield,
  Settings,
  BarChart3,
  Globe,
  FolderOpen,
  TrendingUp,
  User,
  RefreshCcw,
} from "lucide-vue-next";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { APP_ROUTES } from "~/constants";
// import icon from "@/assets/images/icon.webp";
// Sidebar menu definition
const menuItems = [
  {
    group: "Overview",
    items: [
      {
        title: APP_ROUTES.dashboard.name,
        url: APP_ROUTES.dashboard.path,
        icon: LayoutDashboard,
      },
      {
        title: APP_ROUTES.analytics.name,
        url: APP_ROUTES.analytics.path,
        icon: BarChart3,
      },
    ],
  },
  {
    group: "Content",
    items: [
      {
        title: APP_ROUTES.feeds.name,
        url: APP_ROUTES.feeds.path,
        icon: RefreshCcw,
      },
      {
        title: APP_ROUTES.posts.name,
        url: APP_ROUTES.posts.path,
        icon: FileText,
      },
      {
        title: APP_ROUTES.topics.name,
        url: APP_ROUTES.topics.path,
        icon: FolderOpen,
      },
      {
        title: APP_ROUTES.featured.name,
        url: APP_ROUTES.featured.path,
        icon: TrendingUp,
      },
    ],
  },
  {
    group: "Management",
    items: [
      { title: APP_ROUTES.users.name, url: APP_ROUTES.users.path, icon: Users },
      {
        title: APP_ROUTES.roles.name,
        url: APP_ROUTES.roles.path,
        icon: Shield,
      },
    ],
  },
  {
    group: "System",
    items: [
      {
        title: APP_ROUTES.settings.name,
        url: APP_ROUTES.settings.path,
        icon: Settings,
      },
      {
        title: APP_ROUTES.profile.name,
        url: APP_ROUTES.profile.path,
        icon: User,
      },
    ],
  },
];

// Get route info
const route = useRoute();
const { state } = useSidebar();
const collapsed = computed(() => state.value === "collapsed");

// Determine active route
const isActive = (url: string) => {
  if (url === "/admin") return route.path === "/admin";
  return route.path.startsWith(url);
};
</script>

<template>
  <Sidebar collapsible="icon" class="border-r border-border">
    <SidebarHeader class="py-4">
      <RouterLink to="/" class="flex items-center gap-3">
        <NuxtImg src="/icon.webp" class="w-10 h-10 shrink-0" />
        <template v-if="!collapsed">
          <div class="flex flex-col">
            <span class="font-display font-bold text-foreground"
              >OneClick Africa</span
            >
            <span class="text-xs text-muted-foreground">Admin Panel</span>
          </div>
        </template>
      </RouterLink>
    </SidebarHeader>

    <SidebarContent class="">
      <SidebarGroup v-for="group in menuItems" :key="group.group">
        <template v-if="!collapsed">
          <SidebarGroupLabel
            class="text-xs uppercase tracking-wider text-muted-foreground px-4 mb-2"
          >
            {{ group.group }}
          </SidebarGroupLabel>
        </template>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in group.items" :key="item.title">
              <SidebarMenuButton
                :is-active="isActive(item.url)"
                :tooltip="collapsed ? item.title : undefined"
                as-child
              >
                <RouterLink
                  :to="item.url"
                  class="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all"
                  :class="
                    cn(
                      isActive(item.url)
                        ? 'bg-primary text-primary-foreground font-medium'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted',
                    )
                  "
                >
                  <component :is="item.icon" class="w-5 h-5 shrink-0" />
                  <template v-if="!collapsed">{{ item.title }}</template>
                </RouterLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>

    <SidebarFooter class="py-4 border-t border-border">
      <RouterLink to="/">
        <Button
          variant="ghost"
          class="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
          :class="collapsed && 'justify-center px-2'"
        >
          <Globe class="w-5 h-5 shrink-0" />
          <template v-if="!collapsed">View Site</template>
        </Button>
      </RouterLink>
    </SidebarFooter>
  </Sidebar>
</template>
