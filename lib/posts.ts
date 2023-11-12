import { blogPosts } from './client.ts';
import { getTagObject } from './tags.ts';

export const getPostsByTag = async (tag: string) => {
  const theTag = await getTagObject(tag);

  const thePosts = theTag && await blogPosts.find({ 'tags.id': theTag._id });

  const sortedPosts = thePosts.sort((a, b) => {
    return (a.pubDate && b.pubDate && a.pubDate > b.pubDate) ? -1 : 1;
  });

  return sortedPosts;
};
