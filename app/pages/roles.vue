<!-- <script setup lang="ts">
import {
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Shield,
  Users,
} from "lucide-vue-next";
import {
  Button,
  Input,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  Badge,
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@shadcn/ui-vue";
import { ref, computed } from "vue";
import { useToast } from "@/composables/useToast";
import { roles as initialRoles, permissions } from "@/lib/mockData";
import RoleModal from "@/components/admin/RoleModal.vue";

const roles = ref([...initialRoles]);
const searchQuery = ref("");
const modalOpen = ref(false);
const selectedRole = ref(null);
const modalMode = ref<"view" | "edit" | "create">("view");
const deleteDialogOpen = ref(false);
const roleToDelete = ref(null);

const { toast } = useToast();

const filteredRoles = computed(() =>
  roles.value.filter(
    (r) =>
      r.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.value.toLowerCase()),
  ),
);

function handleViewRole(role) {
  selectedRole.value = role;
  modalMode.value = "view";
  modalOpen.value = true;
}

function handleEditRole(role) {
  selectedRole.value = role;
  modalMode.value = "edit";
  modalOpen.value = true;
}

function handleCreateRole() {
  selectedRole.value = null;
  modalMode.value = "create";
  modalOpen.value = true;
}

function handleSaveRole(roleData) {
  if (modalMode.value === "create") {
    const newRole = {
      id: String(roles.value.length + 1),
      name: roleData.name || "",
      description: roleData.description || "",
      permissions: roleData.permissions || [],
      userCount: 0,
    };
    roles.value.push(newRole);
    toast({
      title: "Role created",
      description: "The role has been created successfully.",
    });
  } else {
    roles.value = roles.value.map((r) =>
      r.id === roleData.id ? { ...r, ...roleData } : r,
    );
    toast({
      title: "Role updated",
      description: "The role has been updated successfully.",
    });
  }
}

function handleDeleteRole(role) {
  if (role.userCount > 0) {
    toast({
      title: "Cannot delete role",
      description:
        "This role has users assigned to it. Please reassign users first.",
      variant: "destructive",
    });
    return;
  }
  roleToDelete.value = role;
  deleteDialogOpen.value = true;
}

function confirmDelete() {
  if (roleToDelete.value) {
    roles.value = roles.value.filter((r) => r.id !== roleToDelete.value.id);
    toast({
      title: "Role deleted",
      description: "The role has been deleted successfully.",
    });
  }
  deleteDialogOpen.value = false;
  roleToDelete.value = null;
}
</script>

<template>
  <div class="space-y-6">
    Header
    <div
      class="flex flex-col md:flex-row md:items-center justify-between gap-4"
    >
      <div>
        <h1 class="font-display text-3xl font-bold">Roles & Permissions</h1>
        <p class="text-muted-foreground mt-1">
          Manage user roles and their permissions.
        </p>
      </div>
      <Button
        @click="handleCreateRole"
        class="bg-primary hover:opacity-90 gap-2"
      >
        <Plus class="w-4 h-4" /> New Role
      </Button>
    </div>

    Search
    <div class="bg-card rounded-2xl p-4 card-interactive">
      <div class="relative max-w-md">
        <Search
          class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
        />
        <Input
          v-model="searchQuery"
          placeholder="Search roles..."
          class="pl-10"
        />
      </div>
    </div>

    Roles Grid
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="role in filteredRoles"
        :key="role.id"
        class="bg-card rounded-2xl p-6 card-interactive relative group"
      >
        Actions
        <div class="absolute top-4 right-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                class="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal class="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" class="bg-card">
              <DropdownMenuItem @click="handleViewRole(role)" class="gap-2">
                <Shield class="w-4 h-4" /> View Details
              </DropdownMenuItem>
              <DropdownMenuItem @click="handleEditRole(role)" class="gap-2">
                <Edit class="w-4 h-4" /> Edit Role
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                @click="handleDeleteRole(role)"
                class="gap-2 text-destructive focus:text-destructive"
                :disabled="role.userCount > 0"
              >
                <Trash2 class="w-4 h-4" /> Delete Role
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        Role Header
        <div class="flex items-start gap-4 mb-4">
          <div
            class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0"
          >
            <Shield class="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3
              class="font-display font-bold text-lg cursor-pointer hover:text-primary transition-colors"
              @click="handleViewRole(role)"
            >
              {{ role.name }}
            </h3>
            <p class="text-sm text-muted-foreground line-clamp-2">
              {{ role.description }}
            </p>
          </div>
        </div>

        User Count
        <div
          class="flex items-center gap-2 text-sm text-muted-foreground mb-4 p-3 rounded-lg bg-muted/50"
        >
          <Users class="w-4 h-4" />
          <span>{{ role.userCount.toLocaleString() }} users</span>
        </div>

        Permissions
        <div>
          <p
            class="text-xs text-muted-foreground mb-2 uppercase tracking-wider"
          >
            Permissions
          </p>
          <div class="flex flex-wrap gap-1.5">
            <template v-if="role.permissions.length === 0">
              <span class="text-sm text-muted-foreground">
                No special permissions
              </span>
            </template>

            <template
              v-else-if="role.permissions.length === permissions.length"
            >
              <Badge class="bg-primary">Full Access</Badge>
            </template>

            <template v-else>
              <Badge
                v-for="permId in role.permissions.slice(0, 3)"
                :key="permId"
                variant="secondary"
                class="text-xs"
              >
                {{
                  permissions.find((p) => p.id === permId)?.name || "Unknown"
                }}
              </Badge>
              <Badge
                v-if="role.permissions.length > 3"
                variant="outline"
                class="text-xs"
              >
                +{{ role.permissions.length - 3 }} more
              </Badge>
            </template>
          </div>
        </div>
      </div>
    </div>

    Role Modal
    <RoleModal
      v-model:open="modalOpen"
      :role="selectedRole"
      :mode="modalMode"
      @save="handleSaveRole"
    />

    Delete Dialog
    <AlertDialog v-model:open="deleteDialogOpen">
      <AlertDialogContent class="bg-card">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Role</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the "{{ roleToDelete?.name }}" role?
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            @click="confirmDelete"
            class="bg-destructive hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template> -->
<script setup lang="ts">
const header = {
  title: "Roles & Permissions",
  subtitle: "Manage user roles and their permissions.",
};
</script>
<template>
  <div class="space-y-6">
    <PageHeader v-bind="header" />
  </div>
</template>
