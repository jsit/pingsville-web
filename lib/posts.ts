import { blogPosts } from './client.ts';
import { getTagObject } from './tags.ts';
import { BlogPost } from '../types/index.ts';

export const getPostsByTag = async (tag: string): Promise<BlogPost[]> => {
  const theTag = await getTagObject(tag);

  const thePosts = theTag && await blogPosts.find({ 'tags.id': theTag._id });

  const sortedPosts = thePosts.sort((a, b) => {
    return (a.pubDate && b.pubDate && a.pubDate > b.pubDate) ? -1 : 1;
  });

  return sortedPosts;
};
