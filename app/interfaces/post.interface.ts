import type { PostStatus, PostType, SourceType } from "~/enums";
import type { BaseItem } from "./api-response.interface";
import type { User } from "./user.interface";
import type { Topic } from "./topic.interface";

// export interface Post extends BaseItem {
//   title: string;
//   excerpt: string;
//   content: string;
//   category: string;
//   author: string;
//   date: string;
//   image: string;
//   videoThumbnail?: string;
//   views: number;
//   trending?: boolean;
//   hotTopic?: boolean;
//   status?: "published" | "draft" | "pending";
//   tags?: string[];
// }

export interface ExternalSource {
  source: string;
  url: string;
  publishedAt?: string;
}

export interface Post extends BaseItem {
  title: string;
  excerpt?: string | null;
  content: string;
  topic: Topic;
  slug: string;
  source: SourceType;
  type: PostType;
  tags: string[];
  image?: string;
  author?: User | null;
  external?: ExternalSource | null;
  status: PostStatus;
  views: number;
  isTrending?: boolean;
}

export type Posts = Post[];
