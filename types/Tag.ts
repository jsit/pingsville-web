import type { ObjectId } from "../types/index";

export interface Tag {
  _id: ObjectId;
  name: string;
  displayName: string;
}
