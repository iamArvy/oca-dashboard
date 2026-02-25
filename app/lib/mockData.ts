export interface Comment {
  id: string;
  postId: string;
  author: string;
  avatar?: string;
  content: string;
  date: string;
  likes: number;
  replies?: Comment[];
}

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  subcategory?: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  videoThumbnail?: string;
  views: number;
  trending?: boolean;
  hotTopic?: boolean;
  status?: "published" | "draft" | "pending";
  tags?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
  description?: string;
  subcategories?: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  count?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "user";
  status: "active" | "inactive";
  createdAt: string;
  avatar?: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
}

export interface Notification {
  id: string;
  type: "post" | "user" | "comment" | "system";
  title: string;
  message: string;
  read: boolean;
  date: string;
  link?: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  postCount: number;
}

export const tags: Tag[] = [
  { id: "1", name: "Breaking News", slug: "breaking-news", postCount: 45 },
  { id: "2", name: "Economy", slug: "economy", postCount: 89 },
  { id: "3", name: "Innovation", slug: "innovation", postCount: 67 },
  { id: "4", name: "Climate", slug: "climate", postCount: 34 },
  { id: "5", name: "Elections", slug: "elections", postCount: 56 },
  { id: "6", name: "Startups", slug: "startups", postCount: 78 },
  { id: "7", name: "Music", slug: "music", postCount: 92 },
  { id: "8", name: "Football", slug: "football", postCount: 145 },
  { id: "9", name: "Healthcare", slug: "healthcare", postCount: 43 },
  { id: "10", name: "Education", slug: "education", postCount: 38 },
  { id: "11", name: "Infrastructure", slug: "infrastructure", postCount: 29 },
  { id: "12", name: "Tourism", slug: "tourism", postCount: 51 },
];

export const notifications: Notification[] = [
  {
    id: "1",
    type: "post",
    title: "New post submitted",
    message: "Kofi Mensah submitted a new article for review",
    read: false,
    date: "2024-01-15T10:30:00",
    link: "/posts",
  },
  {
    id: "2",
    type: "comment",
    title: "New comment",
    message: 'Grace Nkrumah commented on "Africa\'s Tech Revolution"',
    read: false,
    date: "2024-01-15T09:15:00",
    link: "/post/1",
  },
  {
    id: "3",
    type: "user",
    title: "New user registered",
    message: "Emmanuel Obi just registered an account",
    read: true,
    date: "2024-01-14T16:45:00",
    link: "/admin/users",
  },
  {
    id: "4",
    type: "system",
    title: "System update",
    message: "Platform maintenance scheduled for tonight",
    read: true,
    date: "2024-01-14T12:00:00",
  },
  {
    id: "5",
    type: "post",
    title: "Post trending",
    message: '"The Rise of Afrobeats" is now trending',
    read: false,
    date: "2024-01-15T08:00:00",
    link: "/post/2",
  },
];

export const comments: Comment[] = [
  {
    id: "1",
    postId: "1",
    author: "Grace Nkrumah",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    content:
      "This is such an inspiring article! The tech ecosystem in Africa is truly remarkable. I've seen firsthand how startups in Lagos are changing lives.",
    date: "2024-01-15T09:30:00",
    likes: 24,
    replies: [
      {
        id: "1-1",
        postId: "1",
        author: "David Kimani",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
        content:
          "Absolutely agree! Kenya's tech scene is equally vibrant. Would love to see more collaboration across borders.",
        date: "2024-01-15T10:15:00",
        likes: 12,
      },
    ],
  },
  {
    id: "2",
    postId: "1",
    author: "Emmanuel Obi",
    content:
      "Great read! The fintech innovations mentioned here are just the tip of the iceberg. There's so much potential in healthtech and agritech as well.",
    date: "2024-01-15T11:00:00",
    likes: 18,
  },
  {
    id: "3",
    postId: "1",
    author: "Fatima Al-Hassan",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    content:
      "I work in the startup ecosystem and can confirm everything in this article. The energy and innovation coming out of Africa is unmatched.",
    date: "2024-01-15T14:20:00",
    likes: 31,
  },
  {
    id: "4",
    postId: "2",
    author: "Kofi Mensah",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    content:
      "Afrobeats has truly taken over the world! So proud of our artists representing African culture on the global stage.",
    date: "2024-01-14T18:00:00",
    likes: 45,
    replies: [
      {
        id: "4-1",
        postId: "2",
        author: "Grace Nkrumah",
        content:
          "Yes! And it's not just about the music - it's about the whole cultural movement that comes with it.",
        date: "2024-01-14T19:30:00",
        likes: 22,
      },
    ],
  },
  {
    id: "5",
    postId: "4",
    author: "David Kimani",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    content:
      "Can't wait for the tournament! Nigeria and Morocco are looking strong this year.",
    date: "2024-01-13T20:00:00",
    likes: 67,
  },
];

export const permissions = [
  { id: "posts.create", name: "Create Posts", group: "Posts" },
  { id: "posts.edit", name: "Edit Posts", group: "Posts" },
  { id: "posts.delete", name: "Delete Posts", group: "Posts" },
  { id: "posts.publish", name: "Publish Posts", group: "Posts" },
  { id: "posts.trending", name: "Manage Trending", group: "Posts" },
  { id: "categories.view", name: "View Categories", group: "Categories" },
  { id: "categories.manage", name: "Manage Categories", group: "Categories" },
  { id: "users.view", name: "View Users", group: "Users" },
  { id: "users.create", name: "Create Users", group: "Users" },
  { id: "users.edit", name: "Edit Users", group: "Users" },
  { id: "users.delete", name: "Delete Users", group: "Users" },
  { id: "roles.view", name: "View Roles", group: "Roles" },
  { id: "roles.manage", name: "Manage Roles", group: "Roles" },
  { id: "analytics.view", name: "View Analytics", group: "Analytics" },
  { id: "settings.manage", name: "Manage Settings", group: "Settings" },
];

export const roles: Role[] = [
  {
    id: "1",
    name: "Admin",
    description: "Full access to all features and settings",
    permissions: permissions.map((p) => p.id),
    userCount: 3,
  },
  {
    id: "2",
    name: "Editor",
    description: "Can create, edit, and publish posts",
    permissions: [
      "posts.create",
      "posts.edit",
      "posts.publish",
      "posts.trending",
      "categories.view",
      "analytics.view",
    ],
    userCount: 12,
  },
  {
    id: "3",
    name: "User",
    description: "Can view content and leave comments",
    permissions: [],
    userCount: 45215,
  },
];

export const users: User[] = [
  {
    id: "1",
    name: "Amara Okonkwo",
    email: "amara@africanews.com",
    role: "admin",
    status: "active",
    createdAt: "2023-06-15",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
  },
  {
    id: "2",
    name: "Kofi Mensah",
    email: "kofi@africanews.com",
    role: "editor",
    status: "active",
    createdAt: "2023-08-22",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
  },
  {
    id: "3",
    name: "Fatima Al-Hassan",
    email: "fatima@africanews.com",
    role: "editor",
    status: "active",
    createdAt: "2023-09-10",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
  },
  {
    id: "4",
    name: "David Kimani",
    email: "david@africanews.com",
    role: "editor",
    status: "inactive",
    createdAt: "2023-10-05",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
  },
  {
    id: "5",
    name: "Grace Nkrumah",
    email: "grace@example.com",
    role: "user",
    status: "active",
    createdAt: "2024-01-02",
  },
  {
    id: "6",
    name: "Emmanuel Obi",
    email: "emmanuel@example.com",
    role: "user",
    status: "active",
    createdAt: "2024-01-05",
  },
];

export const categories: Category[] = [
  {
    id: "1",
    name: "Politics",
    slug: "politics",
    count: 124,
    description: "African political news, elections, and governance updates",
    subcategories: [
      { id: "1-1", name: "Elections", slug: "elections", count: 34 },
      { id: "1-2", name: "Governance", slug: "governance", count: 28 },
      { id: "1-3", name: "Diplomacy", slug: "diplomacy", count: 32 },
      { id: "1-4", name: "Policy", slug: "policy", count: 30 },
    ],
  },
  {
    id: "2",
    name: "Business",
    slug: "business",
    count: 89,
    description: "Business news, markets, and economic developments",
    subcategories: [
      { id: "2-1", name: "Markets", slug: "markets", count: 22 },
      { id: "2-2", name: "Startups", slug: "startups", count: 25 },
      { id: "2-3", name: "Economy", slug: "economy", count: 20 },
      { id: "2-4", name: "Trade", slug: "trade", count: 22 },
    ],
  },
  {
    id: "3",
    name: "Technology",
    slug: "technology",
    count: 156,
    description: "Tech innovation, digital transformation, and startups",
    subcategories: [
      { id: "3-1", name: "Fintech", slug: "fintech", count: 45 },
      { id: "3-2", name: "AI & Innovation", slug: "ai-innovation", count: 38 },
      { id: "3-3", name: "Mobile", slug: "mobile", count: 35 },
      { id: "3-4", name: "Cybersecurity", slug: "cybersecurity", count: 38 },
    ],
  },
  {
    id: "4",
    name: "Sports",
    slug: "sports",
    count: 203,
    description: "Sports news, football, athletics, and more",
    subcategories: [
      { id: "4-1", name: "Football", slug: "football", count: 89 },
      { id: "4-2", name: "Athletics", slug: "athletics", count: 42 },
      { id: "4-3", name: "Basketball", slug: "basketball", count: 36 },
      { id: "4-4", name: "Cricket", slug: "cricket", count: 36 },
    ],
  },
  {
    id: "5",
    name: "Entertainment",
    slug: "entertainment",
    count: 178,
    description: "Music, film, celebrities, and cultural events",
    subcategories: [
      { id: "5-1", name: "Music", slug: "music", count: 52 },
      { id: "5-2", name: "Film", slug: "film", count: 44 },
      { id: "5-3", name: "Celebrities", slug: "celebrities", count: 40 },
      { id: "5-4", name: "Events", slug: "events", count: 42 },
    ],
  },
  {
    id: "6",
    name: "Health",
    slug: "health",
    count: 67,
    description: "Healthcare, wellness, and medical breakthroughs",
    subcategories: [
      { id: "6-1", name: "Wellness", slug: "wellness", count: 22 },
      { id: "6-2", name: "Medicine", slug: "medicine", count: 25 },
      { id: "6-3", name: "Nutrition", slug: "nutrition", count: 20 },
    ],
  },
  {
    id: "7",
    name: "Culture",
    slug: "culture",
    count: 95,
    description: "African culture, heritage, fashion, and lifestyle",
    subcategories: [
      { id: "7-1", name: "Fashion", slug: "fashion", count: 28 },
      { id: "7-2", name: "Art", slug: "art", count: 22 },
      { id: "7-3", name: "Heritage", slug: "heritage", count: 25 },
      { id: "7-4", name: "Lifestyle", slug: "lifestyle", count: 20 },
    ],
  },
];

export const posts: Post[] = [
  {
    id: "1",
    title: "Africa's Tech Revolution: How Startups Are Reshaping the Continent",
    excerpt:
      "From Lagos to Nairobi, a new generation of entrepreneurs is building the future of African technology.",
    content:
      "The African tech ecosystem has witnessed unprecedented growth over the past decade. Young entrepreneurs across the continent are leveraging technology to solve uniquely African challenges, from mobile banking to healthcare delivery...",
    category: "Technology",
    subcategory: "Startups",
    author: "Amara Okonkwo",
    date: "2024-01-15",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800",
    videoThumbnail:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    views: 15420,
    trending: true,
    hotTopic: true,
    status: "published",
    tags: ["Innovation", "Startups", "Economy"],
  },
  {
    id: "2",
    title: "The Rise of Afrobeats: How African Music Conquered the World",
    excerpt:
      "Nigerian and Ghanaian artists are dominating global charts, bringing African sounds to every corner of the planet.",
    content:
      "What started in the clubs of Lagos has become a global phenomenon. Afrobeats has transcended borders, with artists like Burna Boy, Wizkid, and Tems becoming household names worldwide...",
    category: "Entertainment",
    subcategory: "Music",
    author: "Kofi Mensah",
    date: "2024-01-14",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
    videoThumbnail:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    views: 28340,
    trending: true,
    hotTopic: true,
    status: "published",
    tags: ["Music", "Breaking News"],
  },
  {
    id: "3",
    title: "Economic Summit: African Leaders Unite for Continental Free Trade",
    excerpt:
      "The African Continental Free Trade Area promises to transform intra-African commerce and boost GDP growth.",
    content:
      "Leaders from across the continent gathered this week to discuss the implementation of the African Continental Free Trade Area (AfCFTA). This landmark agreement aims to create the world's largest free trade area...",
    category: "Politics",
    subcategory: "Diplomacy",
    author: "Fatima Al-Hassan",
    date: "2024-01-13",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800",
    views: 9870,
    trending: true,
    status: "published",
    tags: ["Economy", "Elections"],
  },
  {
    id: "4",
    title: "African Cup of Nations: Teams to Watch This Year",
    excerpt:
      "As the tournament approaches, we analyze the strongest contenders for continental glory.",
    content:
      "The African Cup of Nations returns with all the drama and excitement fans have come to expect. With stars from Europe's top leagues returning to represent their nations...",
    category: "Sports",
    subcategory: "Football",
    author: "Samuel Eto'o Jr",
    date: "2024-01-12",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
    videoThumbnail:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    views: 45230,
    trending: true,
    hotTopic: true,
    status: "published",
    tags: ["Football", "Breaking News"],
  },
  {
    id: "5",
    title:
      "Sustainable Fashion: African Designers Leading the Green Revolution",
    excerpt:
      "From traditional textiles to modern sustainability, African fashion is setting global trends.",
    content:
      "African designers are at the forefront of the sustainable fashion movement, combining traditional techniques with modern eco-friendly practices...",
    category: "Culture",
    subcategory: "Fashion",
    author: "Zainab Diallo",
    date: "2024-01-11",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800",
    views: 12450,
    status: "published",
    tags: ["Climate", "Innovation"],
  },
  {
    id: "6",
    title: "Fintech Boom: Mobile Money Transforms Rural Banking",
    excerpt:
      "How digital financial services are reaching millions of unbanked Africans.",
    content:
      "Mobile money has revolutionized financial inclusion across Africa. What started in Kenya with M-Pesa has spread across the continent...",
    category: "Business",
    subcategory: "Startups",
    author: "David Kimani",
    date: "2024-01-10",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
    videoThumbnail:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    views: 8920,
    status: "draft",
    tags: ["Startups", "Economy", "Innovation"],
  },
  {
    id: "7",
    title: "Health Innovation: New Malaria Vaccine Shows Promising Results",
    excerpt:
      "Clinical trials across multiple African countries report unprecedented efficacy rates.",
    content:
      "A new malaria vaccine developed through African-led research has shown remarkable results in clinical trials conducted across the continent...",
    category: "Health",
    subcategory: "Medicine",
    author: "Dr. Grace Nkrumah",
    date: "2024-01-09",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800",
    views: 18760,
    status: "pending",
    tags: ["Healthcare", "Innovation", "Breaking News"],
  },
  {
    id: "8",
    title: "Renewable Energy: Solar Farms Power Economic Growth",
    excerpt:
      "African nations invest heavily in solar infrastructure to meet growing energy demands.",
    content:
      "With abundant sunshine and growing energy needs, African countries are turning to solar power as a sustainable solution...",
    category: "Technology",
    subcategory: "AI & Innovation",
    author: "Emmanuel Obi",
    date: "2024-01-08",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800",
    views: 7650,
    status: "published",
    tags: ["Climate", "Infrastructure", "Economy"],
  },
];

export const analyticsData = {
  totalVisits: 1250000,
  registeredUsers: 45230,
  postsPublished: 892,
  submittedPosts: 156,
  visitsVsVisitors: [
    { name: "Mon", visits: 4000, visitors: 2400 },
    { name: "Tue", visits: 3000, visitors: 1398 },
    { name: "Wed", visits: 2000, visitors: 9800 },
    { name: "Thu", visits: 2780, visitors: 3908 },
    { name: "Fri", visits: 1890, visitors: 4800 },
    { name: "Sat", visits: 2390, visitors: 3800 },
    { name: "Sun", visits: 3490, visitors: 4300 },
  ],
  browserUsage: [
    { name: "Chrome", value: 45, fill: "hsl(var(--primary))" },
    { name: "Safari", value: 25, fill: "hsl(var(--accent))" },
    { name: "Firefox", value: 15, fill: "hsl(var(--secondary))" },
    { name: "Edge", value: 10, fill: "hsl(var(--muted))" },
    { name: "Other", value: 5, fill: "hsl(var(--border))" },
  ],
  popularCategories: [
    { name: "Sports", posts: 203, color: "bg-primary" },
    { name: "Entertainment", posts: 178, color: "bg-accent" },
    { name: "Technology", posts: 156, color: "bg-secondary" },
    { name: "Politics", posts: 124, color: "bg-gold" },
    { name: "Culture", posts: 95, color: "bg-terracotta" },
  ],
  monthlyData: [
    { month: "Jan", pageViews: 45000, uniqueVisitors: 12000, bounceRate: 42 },
    { month: "Feb", pageViews: 52000, uniqueVisitors: 14500, bounceRate: 38 },
    { month: "Mar", pageViews: 48000, uniqueVisitors: 13200, bounceRate: 40 },
    { month: "Apr", pageViews: 61000, uniqueVisitors: 16800, bounceRate: 35 },
    { month: "May", pageViews: 55000, uniqueVisitors: 15000, bounceRate: 37 },
    { month: "Jun", pageViews: 67000, uniqueVisitors: 18500, bounceRate: 33 },
  ],
  topPosts: [
    {
      title: "African Cup of Nations: Teams to Watch",
      views: 45230,
      category: "Sports",
    },
    { title: "The Rise of Afrobeats", views: 28340, category: "Entertainment" },
    {
      title: "Health Innovation: Malaria Vaccine",
      views: 18760,
      category: "Health",
    },
    { title: "Africa's Tech Revolution", views: 15420, category: "Technology" },
    { title: "Sustainable Fashion", views: 12450, category: "Culture" },
  ],
  deviceStats: [
    { device: "Mobile", percentage: 62, sessions: 775000 },
    { device: "Desktop", percentage: 28, sessions: 350000 },
    { device: "Tablet", percentage: 10, sessions: 125000 },
  ],
  trafficSources: [
    { source: "Organic Search", percentage: 42, visitors: 525000 },
    { source: "Social Media", percentage: 28, visitors: 350000 },
    { source: "Direct", percentage: 18, visitors: 225000 },
    { source: "Referral", percentage: 12, visitors: 150000 },
  ],
};

export const siteSettings = {
  general: {
    siteName: "AfricaNews",
    tagline: "Your source for African news & stories",
    siteUrl: "https://africanews.com",
    adminEmail: "admin@africanews.com",
    timezone: "Africa/Lagos",
    language: "en",
  },
  appearance: {
    primaryColor: "#d97706",
    accentColor: "#dc2626",
    logo: "/logo.png",
    favicon: "/favicon.ico",
    darkModeDefault: false,
  },
  content: {
    postsPerPage: 12,
    excerptLength: 150,
    allowComments: true,
    moderateComments: true,
    allowGuestComments: false,
  },
  seo: {
    metaTitle: "AfricaNews - African News & Stories",
    metaDescription:
      "Your trusted source for African news, politics, business, technology, sports, and culture.",
    ogImage: "/og-image.jpg",
    twitterHandle: "@africanews",
  },
  social: {
    facebook: "https://facebook.com/africanews",
    twitter: "https://twitter.com/africanews",
    instagram: "https://instagram.com/africanews",
    linkedin: "https://linkedin.com/company/africanews",
    youtube: "https://youtube.com/africanews",
  },
};
