import { Blog, ObjectId } from '@customTypes/index.ts';
import { blogs } from '@lib/client.ts';

export const getBlogById = async (id: ObjectId): Promise<Blog> => {
  const thing = await blogs.find({
    _id: id,
  });

  return thing[0];
};
