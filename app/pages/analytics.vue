<!-- <script setup lang="ts">
import {
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  Clock,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
} from "lucide-vue-next";
import { analyticsData } from "@/lib/mockData";

import {
  LineChart as UniLineChart,
  LineSeries,
  BarChart as UniBarChart,
  BarSeries,
  PieChart as UniPieChart,
  PieSeries,
  Tooltip as UniTooltip,
} from "@unovis/vue";

const deviceIcon = (device: string) => {
  return () => {
    switch (device) {
      case "Mobile":
        return Smartphone;
      case "Desktop":
        return Monitor;
      case "Tablet":
        return Tablet;
      default:
        return Globe;
    }
  };
};
const stats = [
  {
    title: "Total Page Views",
    value: analyticsData.totalVisits,
    change: "+12.5% from last month",
    trend: "up",
    icon: Eye,
  },
  {
    title: "Unique Visitors",
    value: analyticsData.registeredUsers,
    change: "+8.2% from last month",
    trend: "up",
    icon: Users,
  },
  {
    title: "Avg. Session Duration",
    value: "4m 32s",
    change: "+15% from last month",
    trend: "up",
    icon: Clock,
  },
  {
    title: "Bounce Rate",
    value: "35.2%",
    change: "-3.1% from last month",
    trend: "down",
    icon: TrendingUp,
  },
];
</script>

<template>
  <div class="space-y-6">
    Page Header
    <div>
      <h1 class="font-display text-3xl font-bold">Analytics</h1>
      <p class="text-muted-foreground mt-1">
        Detailed insights into your site performance and audience.
      </p>
    </div>

    Stats Grid
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard v-for="stat in stats" :key="stat.title" v-bind="stat" />
    </div>

    Charts Row
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      Monthly Trend (Line Chart)
      <div class="bg-card rounded-2xl p-6 card-interactive">
        <h3 class="font-display text-lg font-bold mb-6 flex items-center gap-2">
          <BarChart3 class="w-5 h-5 text-primary" /> Monthly Performance
        </h3>

        <UniLineChart
          :data="analyticsData.monthlyData"
          x-key="month"
          class="w-full h-72"
        >
          <LineSeries
            key="pageViews"
            y-key="pageViews"
            color="var(--primary)"
          />
          <LineSeries
            key="uniqueVisitors"
            y-key="uniqueVisitors"
            color="var(--accent)"
          />
          <UniTooltip />
        </UniLineChart>

        <div class="flex items-center justify-center gap-6 mt-4 text-sm">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-primary" />
            <span class="text-muted-foreground">Page Views</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-accent" />
            <span class="text-muted-foreground">Unique Visitors</span>
          </div>
        </div>
      </div>

      Traffic Sources (Pie Chart)
      <div class="bg-card rounded-2xl p-6 card-interactive">
        <h3 class="font-display text-lg font-bold mb-6 flex items-center gap-2">
          <Globe class="w-5 h-5 text-primary" /> Traffic Sources
        </h3>

        <UniPieChart
          :data="analyticsData.trafficSources"
          value-key="percentage"
          label-key="source"
          class="w-full h-64"
        >
          <PieSeries
            :color="
              (d, i) =>
                [
                  'var(--primary)',
                  'var(--accent)',
                  'var(--secondary)',
                  'var(--muted)',
                ][i]
            "
          />
          <UniTooltip />
        </UniPieChart>

        <div class="space-y-2 mt-4">
          <div
            v-for="(item, i) in analyticsData.trafficSources"
            :key="item.source"
            class="flex items-center justify-between text-sm"
          >
            <div class="flex items-center gap-2">
              <div
                class="w-3 h-3 rounded-full"
                :style="{
                  backgroundColor: [
                    'var(--primary)',
                    'var(--accent)',
                    'var(--secondary)',
                    'var(--muted)',
                  ][i],
                }"
              />
              <span>{{ item.source }}</span>
            </div>
            <span class="text-muted-foreground">{{ item.percentage }}%</span>
          </div>
        </div>
      </div>
    </div>

    Device Stats & Top Posts
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      Device Stats
      <div class="bg-card rounded-2xl p-6 card-interactive">
        <h3 class="font-display text-lg font-bold mb-6">Device Breakdown</h3>
        <div class="space-y-4">
          <div
            v-for="device in analyticsData.deviceStats"
            :key="device.device"
            class="space-y-2"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2 text-sm">
                <component :is="deviceIcon(device.device)" class="w-5 h-5" />
                <span>{{ device.device }}</span>
              </div>
              <span class="text-sm font-medium">{{ device.percentage }}%</span>
            </div>
            <div class="h-2 bg-muted rounded-full overflow-hidden">
              <div
                class="h-full bg-primary rounded-full transition-all"
                :style="{ width: device.percentage + '%' }"
              />
            </div>
            <p class="text-xs text-muted-foreground">
              {{ device.sessions.toLocaleString() }} sessions
            </p>
          </div>
        </div>
      </div>

      Top Posts
      <div class="lg:col-span-2 bg-card rounded-2xl p-6 card-interactive">
        <h3 class="font-display text-lg font-bold mb-6">
          Top Performing Posts
        </h3>
        <div class="space-y-4">
          <div
            v-for="(post, index) in analyticsData.topPosts"
            :key="post.title"
            class="flex items-center gap-4 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
          >
            <div
              class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold"
            >
              {{ index + 1 }}
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-medium line-clamp-1">{{ post.title }}</p>
              <p class="text-xs text-muted-foreground">{{ post.category }}</p>
            </div>
            <div class="text-right">
              <p class="font-medium">{{ post.views.toLocaleString() }}</p>
              <p class="text-xs text-muted-foreground">views</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    Browser Usage (Bar Chart)
    <div class="bg-card rounded-2xl p-6 card-interactive">
      <h3 class="font-display text-lg font-bold mb-6">Browser Usage</h3>

      <UniBarChart
        :data="analyticsData.browserUsage"
        orientation="horizontal"
        class="h-52 w-full"
      >
        <BarSeries y-key="name" x-key="value" color="var(--primary)" />
        <UniTooltip />
      </UniBarChart>
    </div>
  </div>
</template> -->

<script setup lang="ts">
// definePageMeta({ middleware: ["auth"] });

const header = {
  title: "Analytics",
  subtitle: "Detailed insights into your site performance and audience.",
};
</script>
<template>
  <div class="space-y-6">
    <PageHeader v-bind="header" />
  </div>
</template>
