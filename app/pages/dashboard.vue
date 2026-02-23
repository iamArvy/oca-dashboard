<!-- <script setup lang="ts">
import {
  LayoutDashboard,
  FileText,
  Users,
  Eye,
  TrendingUp,
  BarChart3,
  Globe,
  FolderOpen,
} from 'lucide-vue-next';
import { analyticsData } from '@/lib/mockData';

// import Unovis charts
import {
  LineChart as UniLineChart,
  LineSeries,
  BarChart as UniBarChart,
  BarSeries,
  PieChart as UniPieChart,
  PieSeries,
  Tooltip as UniTooltip,
  AreaChart as UniAreaChart,
  AreaSeries,
} from '@unovis/vue';

const StatCard = defineComponent({
  props: {
    title: String,
    value: [String, Number],
    icon: Object,
    trend: String,
    color: String,
  },
  setup(props) {
    return () => (
      <div class="bg-card rounded-2xl p-6 card-interactive">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm text-muted-foreground mb-1">{props.title}</p>
            <p class="text-3xl font-bold font-display">
              {typeof props.value === 'number'
                ? props.value.toLocaleString()
                : props.value}
            </p>
            {props.trend && (
              <p class="text-sm text-green-600 mt-2 flex items-center gap-1">
                <TrendingUp class="w-3 h-3" />
                {props.trend}
              </p>
            )}
          </div>
          <div
            class={[
              'w-12 h-12 rounded-xl flex items-center justify-center',
              props.color,
            ]}
          >
            <props.icon class="w-6 h-6 text-primary-foreground" />
          </div>
        </div>
      </div>
    );
  },
});
</script>

<template>
  <div class="space-y-6">
    Page Header
    <div>
      <h1 class="font-display text-3xl font-bold">Dashboard</h1>
      <p class="text-muted-foreground mt-1">
        Welcome back! Here's what's happening.
      </p>
    </div>

    Stats Grid
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Visits"
        :value="analyticsData.totalVisits"
        :icon="Eye"
        trend="+12.5% from last month"
        color="bg-primary"
      />
      <StatCard
        title="Registered Users"
        :value="analyticsData.registeredUsers"
        :icon="Users"
        trend="+8.2% from last month"
        color="bg-accent"
      />
      <StatCard
        title="Posts Published"
        :value="analyticsData.postsPublished"
        :icon="FileText"
        trend="+23 this week"
        color="bg-forest"
      />
      <StatCard
        title="Submitted Posts"
        :value="analyticsData.submittedPosts"
        :icon="LayoutDashboard"
        color="bg-secondary"
      />
    </div>

    Charts Grid
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      Visits vs Visitors
      <div class="bg-card rounded-2xl p-6 card-interactive">
        <div class="flex items-center justify-between mb-6">
          <h3 class="font-display text-lg font-bold flex items-center gap-2">
            <BarChart3 class="w-5 h-5 text-primary" />
            Visits vs Visitors
          </h3>
        </div>

        <UniAreaChart
          :data="analyticsData.visitsVsVisitors"
          x-key="name"
          class="w-full h-72"
        >
          <AreaSeries
            key="visits"
            y-key="visits"
            color="var(--primary)"
            curve-type="monotoneX"
            opacity="0.7"
          />
          <AreaSeries
            key="visitors"
            y-key="visitors"
            color="var(--accent)"
            curve-type="monotoneX"
            opacity="0.7"
          />
          <UniTooltip />
        </UniAreaChart>
      </div>

      Browser Usage
      <div class="bg-card rounded-2xl p-6 card-interactive">
        <div class="flex items-center justify-between mb-6">
          <h3 class="font-display text-lg font-bold flex items-center gap-2">
            <Globe class="w-5 h-5 text-primary" />
            Browser Usage
          </h3>
        </div>

        <div class="flex items-center gap-8">
          <UniPieChart
            :data="analyticsData.browserUsage"
            value-key="value"
            label-key="name"
            class="w-1/2 h-64"
          >
            <PieSeries
              :color="(d, i) => analyticsData.browserUsage[i].fill"
              inner-radius="60"
              outer-radius="90"
              pad-angle="0.02"
            />
            <UniTooltip />
          </UniPieChart>

          <div class="space-y-2 w-1/2">
            <div
              v-for="item in analyticsData.browserUsage"
              :key="item.name"
              class="flex items-center gap-2 text-sm"
            >
              <div
                class="w-3 h-3 rounded-full"
                :style="{ backgroundColor: item.fill }"
              />
              <span>{{ item.name }}</span>
              <span class="text-muted-foreground ml-auto"
                >{{ item.value }}%</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    Popular Categories
    <div class="bg-card rounded-2xl p-6 card-interactive">
      <div class="flex items-center justify-between mb-6">
        <h3 class="font-display text-lg font-bold flex items-center gap-2">
          <FolderOpen class="w-5 h-5 text-primary" />
          Popular Categories
        </h3>
      </div>

      <UniBarChart
        :data="analyticsData.popularCategories"
        orientation="horizontal"
        class="h-72 w-full"
      >
        <BarSeries y-key="name" x-key="posts" color="var(--primary)" />
        <UniTooltip />
      </UniBarChart>
    </div>
  </div>
</template> -->

<script setup lang="ts">
const header = {
  title: "Dashboard",
  subtitle: "Welcome back! Here's what's happening.",
};
</script>
<template>
  <div class="space-y-6">
    <PageHeader v-bind="header" />
  </div>
</template>
