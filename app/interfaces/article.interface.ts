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
