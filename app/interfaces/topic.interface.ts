import type { BaseItem } from "./api-response.interface";

export interface Topic extends BaseItem {
  name: string;
  slug: string;
  parent?: Topic | null;
  children?: Topic[] | [];
}
