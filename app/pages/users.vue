<!-- <script setup lang="ts">
import {
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  UserX,
  UserCheck,
  Shield,
} from "lucide-vue-next";
import {
  Button,
  Input,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Badge,
  Avatar,
  AvatarImage,
  AvatarFallback,
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@shadcn/ui-vue";

import { ref, computed } from "vue";
import { useToast } from "@/composables/useToast";
import { users as initialUsers, roles } from "@/lib/mockData";
import UserModal from "@/components/admin/UserModal.vue";

const users = ref([...initialUsers]);
const searchQuery = ref("");
const roleFilter = ref("all");
const statusFilter = ref("all");
const modalOpen = ref(false);
const selectedUser = ref(null);
const modalMode = ref<"view" | "edit" | "create">("view");
const deactivateDialogOpen = ref(false);
const userToToggle = ref(null);

const { toast } = useToast();

const filteredUsers = computed(() =>
  users.value.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesRole =
      roleFilter.value === "all" || user.role === roleFilter.value;
    const matchesStatus =
      statusFilter.value === "all" || user.status === statusFilter.value;
    return matchesSearch && matchesRole && matchesStatus;
  }),
);

function handleViewUser(user) {
  selectedUser.value = user;
  modalMode.value = "view";
  modalOpen.value = true;
}

function handleEditUser(user) {
  selectedUser.value = user;
  modalMode.value = "edit";
  modalOpen.value = true;
}

function handleCreateUser() {
  selectedUser.value = null;
  modalMode.value = "create";
  modalOpen.value = true;
}

function handleSaveUser(userData) {
  if (modalMode.value === "create") {
    const newUser = {
      id: String(users.value.length + 1),
      name: userData.name || "",
      email: userData.email || "",
      role: userData.role || "user",
      status: userData.status || "active",
      createdAt: new Date().toISOString().split("T")[0],
      avatar: userData.avatar,
    };
    users.value = [newUser, ...users.value];
    toast({
      title: "User created",
      description: "The user has been created successfully.",
    });
  } else {
    users.value = users.value.map((u) =>
      u.id === userData.id ? { ...u, ...userData } : u,
    );
    toast({
      title: "User updated",
      description: "The user has been updated successfully.",
    });
  }
}

function handleToggleStatus(user) {
  userToToggle.value = user;
  deactivateDialogOpen.value = true;
}

function confirmToggleStatus() {
  if (userToToggle.value) {
    const newStatus =
      userToToggle.value.status === "active" ? "inactive" : "active";
    users.value = users.value.map((u) =>
      u.id === userToToggle.value.id ? { ...u, status: newStatus } : u,
    );
    toast({
      title: newStatus === "active" ? "User activated" : "User deactivated",
      description: `${userToToggle.value.name} has been ${
        newStatus === "active" ? "activated" : "deactivated"
      }.`,
    });
  }
  deactivateDialogOpen.value = false;
  userToToggle.value = null;
}

function getRoleBadgeColor(role: string) {
  switch (role) {
    case "admin":
      return "bg-primary text-primary-foreground";
    case "editor":
      return "bg-accent text-accent-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
}
</script>

<template>
  <div class="space-y-6">
    Page Header
    <div
      class="flex flex-col md:flex-row md:items-center justify-between gap-4"
    >
      <div>
        <h1 class="font-display text-3xl font-bold">Users</h1>
        <p class="text-muted-foreground mt-1">
          Manage all users and their roles.
        </p>
      </div>
      <Button
        @click="handleCreateUser"
        class="bg-primary hover:opacity-90 gap-2"
      >
        <Plus class="w-4 h-4" /> New User
      </Button>
    </div>

    Filters
    <div class="bg-card rounded-2xl p-4 card-interactive">
      <div class="flex flex-col sm:flex-row gap-3">
        Search
        <div class="relative flex-1">
          <Search
            class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
          />
          <Input
            v-model="searchQuery"
            placeholder="Search users..."
            class="pl-10"
          />
        </div>

        Role Filter
        <Select v-model="roleFilter">
          <SelectTrigger class="w-full sm:w-36">
            <Shield class="w-4 h-4 mr-2" />
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent class="bg-card">
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="editor">Editor</SelectItem>
            <SelectItem value="user">User</SelectItem>
          </SelectContent>
        </Select>

        Status Filter
        <Select v-model="statusFilter">
          <SelectTrigger class="w-full sm:w-36">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent class="bg-card">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>

    Users Table
    <div class="bg-card rounded-2xl card-interactive overflow-hidden">
      <div class="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead class="w-[50px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow
              v-for="user in filteredUsers"
              :key="user.id"
              class="hover:bg-muted/50"
            >
              <TableCell>
                <button
                  @click="handleViewUser(user)"
                  class="flex items-center gap-3 hover:opacity-80 transition-opacity"
                >
                  <Avatar class="h-9 w-9">
                    <AvatarImage :src="user.avatar" :alt="user.name" />
                    <AvatarFallback>
                      {{
                        user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                      }}
                    </AvatarFallback>
                  </Avatar>
                  <span class="font-medium">{{ user.name }}</span>
                </button>
              </TableCell>

              <TableCell class="text-muted-foreground">
                {{ user.email }}
              </TableCell>

              <TableCell>
                <Badge :class="getRoleBadgeColor(user.role)">
                  {{ user.role.charAt(0).toUpperCase() + user.role.slice(1) }}
                </Badge>
              </TableCell>

              <TableCell>
                <Badge
                  :variant="user.status === 'active' ? 'default' : 'secondary'"
                  :class="user.status === 'active' ? 'bg-green-600' : ''"
                >
                  {{
                    user.status.charAt(0).toUpperCase() + user.status.slice(1)
                  }}
                </Badge>
              </TableCell>

              <TableCell class="text-muted-foreground">
                {{ new Date(user.createdAt).toLocaleDateString() }}
              </TableCell>

              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" class="h-8 w-8">
                      <MoreHorizontal class="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" class="bg-card">
                    <DropdownMenuItem
                      @click="handleViewUser(user)"
                      class="gap-2"
                    >
                      <Shield class="w-4 h-4" /> View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      @click="handleEditUser(user)"
                      class="gap-2"
                    >
                      <Edit class="w-4 h-4" /> Edit User
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      @click="handleToggleStatus(user)"
                      :class="[
                        'gap-2',
                        user.status === 'active'
                          ? 'text-destructive focus:text-destructive'
                          : 'text-green-600',
                      ]"
                    >
                      <template v-if="user.status === 'active'">
                        <UserX class="w-4 h-4" /> Deactivate
                      </template>
                      <template v-else>
                        <UserCheck class="w-4 h-4" /> Activate
                      </template>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>

    User Modal
    <UserModal
      v-model:open="modalOpen"
      :user="selectedUser"
      :mode="modalMode"
      @save="handleSaveUser"
    />

    Status Toggle Dialog
    <AlertDialog v-model:open="deactivateDialogOpen">
      <AlertDialogContent class="bg-card">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {{
              userToToggle?.status === "active"
                ? "Deactivate User"
                : "Activate User"
            }}
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to
            {{ userToToggle?.status === "active" ? "deactivate" : "activate" }}
            {{ userToToggle?.name }}?
            <span v-if="userToToggle?.status === 'active'">
              They will no longer be able to access the platform.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            @click="confirmToggleStatus"
            :class="[
              userToToggle?.status === 'active'
                ? 'bg-destructive hover:bg-destructive/90'
                : 'bg-green-600 hover:bg-green-700',
            ]"
          >
            {{ userToToggle?.status === "active" ? "Deactivate" : "Activate" }}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template> -->
<script setup lang="ts">
const header = {
  title: "Users",
  subtitle: "Manage all users and their roles",
};
</script>
<template>
  <div class="space-y-6">
    <PageHeader v-bind="header" />
  </div>
</template>
