import { blogPosts } from './client.ts';
import { getTagObject } from './tags.ts';
import { BlogPost } from '../types/index.ts';

export const getPostsByTag = async (
  tag: string,
): Promise<BlogPost[]> => {
  const theTag = await getTagObject(tag);

  const thePosts = theTag && blogPosts.aggregate<BlogPost>(
    [
      {
        $sort: {
          pubDate: -1,
        },
      },
      {
        $match: {
          'tags.id': theTag._id,
        },
      },
    ],
  );

  return thePosts;
};

export const getPosts = (): Promise<BlogPost[]> => {
  const thePosts = blogPosts.aggregate<BlogPost>(
    [
      {
        $sort: {
          pubDate: -1,
        },
      },
    ],
  );

  return thePosts;
};
