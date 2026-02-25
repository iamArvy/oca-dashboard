import type { BaseItem } from "./api-response.interface";
import type { Topic } from "./topic.interface";

export interface Feed extends BaseItem {
  name: string;
  source: string;
  topic: Topic;
}
