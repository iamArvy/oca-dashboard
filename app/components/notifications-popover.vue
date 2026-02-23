<script setup lang="ts">
import { ref, computed } from "vue";
import {
  Bell,
  FileText,
  User,
  MessageCircle,
  Settings,
  Check,
  Trash2,
  X,
} from "lucide-vue-next";
import {
  notifications as initialNotifications,
  type Notification,
} from "@/lib/mockData";
import { cn } from "@/lib/utils";

// reactive state
const notifications = ref<Notification[]>([...initialNotifications]);
const open = ref(false);

// computed unread count
const unreadCount = computed(
  () => notifications.value.filter((n) => !n.read).length,
);

// helpers
const getIcon = (type: Notification["type"]) => {
  switch (type) {
    case "post":
      return FileText;
    case "user":
      return User;
    case "comment":
      return MessageCircle;
    case "system":
      return Settings;
    default:
      return Bell;
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);

  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
};

// actions
const markAsRead = (id: string) => {
  notifications.value = notifications.value.map((n) =>
    n.id === id ? { ...n, read: true } : n,
  );
};

const markAllAsRead = () => {
  notifications.value = notifications.value.map((n) => ({ ...n, read: true }));
};

const deleteNotification = (id: string) => {
  notifications.value = notifications.value.filter((n) => n.id !== id);
};

const clearAll = () => {
  notifications.value = [];
};
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger asChild>
      <Button
        variant="ghost"
        size="icon"
        class="relative text-muted-foreground hover:text-foreground"
      >
        <Bell class="w-5 h-5" />
        <span
          v-if="unreadCount > 0"
          class="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center font-medium"
        >
          {{ unreadCount > 9 ? "9+" : unreadCount }}
        </span>
      </Button>
    </PopoverTrigger>

    <PopoverContent class="w-80 p-0 bg-card" align="end">
      <!-- Header -->
      <div class="flex items-center justify-between p-4 border-b border-border">
        <h3 class="font-display font-bold">Notifications</h3>
        <Button
          v-if="unreadCount > 0"
          variant="ghost"
          size="sm"
          class="text-xs h-7"
          @click="markAllAsRead"
        >
          Mark all read
        </Button>
      </div>

      <!-- Notifications List -->
      <ScrollArea class="h-[350px]">
        <div v-if="notifications.length > 0" class="divide-y divide-border">
          <div
            v-for="notification in notifications"
            :key="notification.id"
            class="flex gap-3 p-4 hover:bg-muted/50 transition-colors relative group"
            :class="{ 'bg-primary/5': !notification.read }"
          >
            <div
              :class="
                cn(
                  'w-10 h-10 rounded-full flex items-center justify-center shrink-0',
                  notification.type === 'post' && 'bg-primary/10 text-primary',
                  notification.type === 'user' &&
                    'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
                  notification.type === 'comment' &&
                    'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
                  notification.type === 'system' &&
                    'bg-muted text-muted-foreground',
                )
              "
            >
              <component :is="getIcon(notification.type)" class="w-5 h-5" />
            </div>

            <div class="flex-1 min-w-0">
              <RouterLink
                v-if="notification.link"
                :to="notification.link"
                @click.native="
                  markAsRead(notification.id);
                  open.value = false;
                "
                class="block"
              >
                <p class="font-medium text-sm line-clamp-1">
                  {{ notification.title }}
                </p>
                <p class="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                  {{ notification.message }}
                </p>
              </RouterLink>
              <template v-else>
                <p class="font-medium text-sm line-clamp-1">
                  {{ notification.title }}
                </p>
                <p class="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                  {{ notification.message }}
                </p>
              </template>
              <p class="text-xs text-muted-foreground mt-1">
                {{ formatDate(notification.date) }}
              </p>
            </div>

            <!-- Actions -->
            <div
              class="opacity-0 group-hover:opacity-100 transition-opacity flex items-start gap-1"
            >
              <Button
                v-if="!notification.read"
                variant="ghost"
                size="icon"
                class="h-6 w-6"
                @click="markAsRead(notification.id)"
              >
                <Check class="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                class="h-6 w-6 text-destructive hover:text-destructive"
                @click="deleteNotification(notification.id)"
              >
                <X class="w-3 h-3" />
              </Button>
            </div>

            <!-- Unread indicator -->
            <div
              v-if="!notification.read"
              class="absolute left-1.5 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full"
            />
          </div>
        </div>

        <div
          v-else
          class="flex flex-col items-center justify-center py-12 text-muted-foreground"
        >
          <Bell class="w-12 h-12 mb-3 opacity-50" />
          <p class="text-sm">No notifications</p>
        </div>
      </ScrollArea>

      <!-- Footer -->
      <div v-if="notifications.length > 0" class="p-3 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          class="w-full text-destructive hover:text-destructive"
          @click="clearAll"
        >
          <Trash2 class="w-4 h-4 mr-2" />
          Clear all
        </Button>
      </div>
    </PopoverContent>
  </Popover>
</template>
