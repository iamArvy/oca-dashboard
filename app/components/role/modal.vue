<script setup lang="ts">
import { ref, computed, watch } from "vue";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Users, Edit, Shield } from "lucide-vue-next";
import { Role, permissions } from "@/lib/mockData";

interface Props {
  open: boolean;
  role?: Role | null;
  mode: "view" | "edit" | "create";
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "update:open", open: boolean): void;
  (e: "save", role: Partial<Role>): void;
}>();

// local state
const mode = ref<Props["mode"]>(props.mode);
const formData = ref<Partial<Role>>({
  name: "",
  description: "",
  permissions: [],
});

// Watch for prop changes
watch(
  () => [props.role, props.mode],
  () => {
    mode.value = props.mode;
    if (props.role) {
      formData.value = {
        name: props.role.name,
        description: props.role.description,
        permissions: props.role.permissions,
      };
    } else {
      formData.value = {
        name: "",
        description: "",
        permissions: [],
      };
    }
  },
  { immediate: true },
);

// Save handler
const handleSave = () => {
  emit("save", { ...props.role, ...formData.value });
  emit("update:open", false);
};

// Toggle permission
const togglePermission = (permissionId: string) => {
  const currentPermissions = formData.value.permissions || [];
  formData.value.permissions = currentPermissions.includes(permissionId)
    ? currentPermissions.filter((p) => p !== permissionId)
    : [...currentPermissions, permissionId];
};

// computed
const isViewMode = computed(() => mode.value === "view");

// Group permissions by category
const groupedPermissions = computed(() => {
  return permissions.reduce((acc: Record<string, typeof permissions>, perm) => {
    if (!acc[perm.group]) acc[perm.group] = [];
    acc[perm.group].push(perm);
    return acc;
  }, {});
});
</script>

<template>
  <Dialog :open="props.open" @update:open="(val) => emit('update:open', val)">
    <DialogContent class="max-w-2xl max-h-[90vh] overflow-y-auto bg-card">
      <DialogHeader>
        <div class="flex items-center justify-between">
          <DialogTitle class="font-display text-xl">
            {{
              mode === "create"
                ? "Create New Role"
                : mode === "edit"
                  ? "Edit Role"
                  : "View Role"
            }}
          </DialogTitle>
          <Button
            v-if="isViewMode && props.role"
            variant="outline"
            size="sm"
            class="gap-2"
            @click="mode = 'edit'"
          >
            <Edit class="w-4 h-4" />
            Edit
          </Button>
        </div>
      </DialogHeader>

      <template v-if="isViewMode && props.role">
        <div class="space-y-6">
          <div class="flex items-start gap-4">
            <div
              class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center"
            >
              <Shield class="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 class="font-display text-xl font-bold">
                {{ props.role.name }}
              </h3>
              <p class="text-muted-foreground mt-1">
                {{ props.role.description }}
              </p>
            </div>
          </div>

          <div class="p-4 rounded-xl bg-muted/50 flex items-center gap-3">
            <Users class="w-5 h-5 text-muted-foreground" />
            <span class="text-muted-foreground">Users with this role:</span>
            <span class="font-bold">{{
              props.role.userCount.toLocaleString()
            }}</span>
          </div>

          <div>
            <h4 class="font-medium mb-4">Permissions</h4>
            <div class="space-y-4">
              <div
                v-for="(perms, group) in groupedPermissions"
                :key="group"
                class="p-4 rounded-xl bg-muted/50"
              >
                <h5 class="font-medium text-sm text-muted-foreground mb-3">
                  {{ group }}
                </h5>
                <div class="flex flex-wrap gap-2">
                  <Badge
                    v-for="perm in perms"
                    :key="perm.id"
                    :variant="
                      props.role.permissions.includes(perm.id)
                        ? 'default'
                        : 'outline'
                    "
                    :class="
                      props.role.permissions.includes(perm.id)
                        ? 'bg-primary'
                        : 'opacity-50'
                    "
                  >
                    {{ perm.name }}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template v-else>
        <div class="space-y-6">
          <div>
            <Label for="name">Role Name</Label>
            <Input
              id="name"
              v-model="formData.name"
              placeholder="e.g., Content Manager"
              class="mt-1.5"
            />
          </div>

          <div>
            <Label for="description">Description</Label>
            <Textarea
              id="description"
              v-model="formData.description"
              placeholder="Describe what this role can do"
              class="mt-1.5"
              rows="2"
            />
          </div>

          <div>
            <Label class="mb-4 block">Permissions</Label>
            <div class="space-y-4">
              <div
                v-for="(perms, group) in groupedPermissions"
                :key="group"
                class="p-4 rounded-xl border border-border"
              >
                <h5 class="font-medium text-sm mb-3">{{ group }}</h5>
                <div class="grid grid-cols-2 gap-3">
                  <div
                    v-for="perm in perms"
                    :key="perm.id"
                    class="flex items-center space-x-2"
                  >
                    <Checkbox
                      :id="perm.id"
                      :checked="formData.permissions.includes(perm.id)"
                      @checked-change="() => togglePermission(perm.id)"
                    />
                    <label :for="perm.id" class="text-sm cursor-pointer">{{
                      perm.name
                    }}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <DialogFooter v-if="!isViewMode">
        <Button variant="outline" @click="emit('update:open', false)"
          >Cancel</Button
        >
        <Button class="bg-primary hover:opacity-90" @click="handleSave">
          {{ mode === "create" ? "Create Role" : "Save Changes" }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
