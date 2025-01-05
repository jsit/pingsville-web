import type { ObjectId } from '@customTypes/index.ts';

export interface Tag {
  _id: ObjectId;
  name: string;
  displayName: string;
}
