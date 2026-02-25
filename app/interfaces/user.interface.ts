import type { BaseItem } from "./api-response.interface";

export interface User extends BaseItem {
  email: string;
  name: string;
}
