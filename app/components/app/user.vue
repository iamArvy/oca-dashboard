<script setup lang="ts">
import { APP_ROUTES } from "~/constants";

// function logout() {}

interface MenuItem {
  label: string;
  path: string;
}
const menuItems: MenuItem[] = [
  {
    label: APP_ROUTES.profile.name,
    path: APP_ROUTES.profile.path,
  },
  {
    label: APP_ROUTES.settings.name,
    path: APP_ROUTES.settings.path,
  },
];
const { user } = useUserSession();
const { logout } = useLogout();
</script>

<template>
  <div v-if="user">
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="ghost" class="relative h-9 w-9 rounded-full">
          <Avatar class="h-9 w-9">
            <AvatarImage v-if="user.avatar" :src="user?.avatar" alt="Admin" />
            <AvatarFallback v-else>
              {{ getInitials(user?.name) }}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent class="w-56 bg-card" align="end">
        <DropdownMenuLabel class="font-normal">
          <div class="flex flex-col space-y-1">
            <p class="text-sm font-medium leading-none">{{ user?.name }}</p>
            <p class="text-xs leading-none text-muted-foreground">
              {{ user?.email }}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          v-for="(item, index) in menuItems"
          :key="index"
          as-child
        >
          <NuxtLink :to="item.path">
            {{ item.label }}
          </NuxtLink>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          class="text-destructive cursor-pointer"
          @click="logout()"
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
