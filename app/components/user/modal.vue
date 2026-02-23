<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { type User, roles } from "@/lib/mockData";
import { Calendar, Mail, Shield, Edit } from "lucide-vue-next";

interface Props {
  open: boolean;
  user?: User | null;
  mode: "view" | "edit" | "create";
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "update:open", open: boolean): void;
  (e: "save", user: Partial<User>): void;
}>();

const mode = ref<Props["mode"]>(props.mode);
const formData = ref<Partial<User>>({
  name: "",
  email: "",
  role: "user",
  status: "active",
  avatar: "",
});

// Sync props to local state
watch(
  () => [props.user, props.mode],
  () => {
    mode.value = props.mode;
    if (props.user) {
      formData.value = {
        name: props.user.name,
        email: props.user.email,
        role: props.user.role,
        status: props.user.status,
        avatar: props.user.avatar,
      };
    } else {
      formData.value = {
        name: "",
        email: "",
        role: "user",
        status: "active",
        avatar: "",
      };
    }
  },
  { immediate: true },
);

const isViewMode = computed(() => mode.value === "view");

const handleSave = () => {
  emit("save", { ...props.user, ...formData.value });
  emit("update:open", false);
};
</script>

<template>
  <Dialog :open="props.open" @update:open="(val) => emit('update:open', val)">
    <DialogContent class="max-w-lg bg-card">
      <DialogHeader>
        <div class="flex items-center justify-between">
          <DialogTitle class="font-display text-xl">
            {{
              mode === "create"
                ? "Create New User"
                : mode === "edit"
                  ? "Edit User"
                  : "View User"
            }}
          </DialogTitle>
          <Button
            v-if="isViewMode && props.user"
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

      <!-- VIEW MODE -->
      <template v-if="isViewMode && props.user">
        <div class="space-y-6">
          <div class="flex items-center gap-4">
            <Avatar class="h-20 w-20">
              <AvatarImage :src="props.user.avatar" :alt="props.user.name" />
              <AvatarFallback class="text-xl">
                {{
                  props.user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                }}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 class="font-display text-xl font-bold">
                {{ props.user.name }}
              </h3>
              <div class="flex items-center gap-2 mt-1 text-muted-foreground">
                <Mail class="w-4 h-4" />
                {{ props.user.email }}
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="p-4 rounded-xl bg-muted/50">
              <div
                class="flex items-center gap-2 text-sm text-muted-foreground mb-1"
              >
                <Shield class="w-4 h-4" /> Role
              </div>
              <Badge
                :class="{
                  'bg-primary': props.user.role === 'admin',
                  'bg-accent text-accent-foreground':
                    props.user.role === 'editor',
                  'bg-muted text-muted-foreground': props.user.role === 'user',
                }"
              >
                {{
                  props.user.role.charAt(0).toUpperCase() +
                  props.user.role.slice(1)
                }}
              </Badge>
            </div>

            <div class="p-4 rounded-xl bg-muted/50">
              <div
                class="flex items-center gap-2 text-sm text-muted-foreground mb-1"
              >
                <Calendar class="w-4 h-4" /> Joined
              </div>
              <p class="font-medium">
                {{ new Date(props.user.createdAt).toLocaleDateString() }}
              </p>
            </div>
          </div>

          <div class="p-4 rounded-xl bg-muted/50">
            <div class="text-sm text-muted-foreground mb-2">Status</div>
            <Badge
              :variant="
                props.user.status === 'active' ? 'default' : 'secondary'
              "
              :class="
                props.user.status === 'active' ? 'bg-green-600' : 'bg-muted'
              "
            >
              {{
                props.user.status.charAt(0).toUpperCase() +
                props.user.status.slice(1)
              }}
            </Badge>
          </div>
        </div>
      </template>

      <!-- EDIT / CREATE MODE -->
      <template v-else>
        <div class="space-y-4">
          <div>
            <Label for="name">Full Name</Label>
            <Input
              id="name"
              v-model="formData.name"
              placeholder="Enter full name"
              class="mt-1.5"
            />
          </div>

          <div>
            <Label for="email">Email</Label>
            <Input
              id="email"
              type="email"
              v-model="formData.email"
              placeholder="email@example.com"
              class="mt-1.5"
            />
          </div>

          <div>
            <Label for="role">Role</Label>
            <Select v-model="formData.role">
              <SelectTrigger class="mt-1.5">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent class="bg-card">
                <SelectItem
                  v-for="role in roles"
                  :key="role.id"
                  :value="role.name.toLowerCase()"
                >
                  {{ role.name }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label for="status">Status</Label>
            <Select v-model="formData.status">
              <SelectTrigger class="mt-1.5">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent class="bg-card">
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label for="avatar">Avatar URL (optional)</Label>
            <Input
              id="avatar"
              v-model="formData.avatar"
              placeholder="https://..."
              class="mt-1.5"
            />
          </div>
        </div>
      </template>

      <!-- FOOTER -->
      <DialogFooter v-if="!isViewMode">
        <Button variant="outline" @click="emit('update:open', false)"
          >Cancel</Button
        >
        <Button class="bg-primary hover:opacity-90" @click="handleSave">
          {{ mode === "create" ? "Create User" : "Save Changes" }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
