import { blogPosts } from './client.ts';
import { getTagObject } from './tags.ts';
import { BlogPost } from '../types/index.ts';

const perPage = parseInt(Deno.env.get('POSTS_PER_PAGE') || '8');

interface GetPostsParams {
  count?: number;
  offset?: number;
  tagName?: string;
}

export const getPosts = async (
  params?: GetPostsParams,
): Promise<{ total: number; posts: BlogPost[] }> => {
  const { count, offset, tagName } = params || {};

  const tag = tagName && await getTagObject(tagName);

  await blogPosts.countDocuments();

  const tagPipeline = tag
    ? [
      {
        $match: {
          'tags.id': tag._id,
        },
      },
    ]
    : [];

  const offsetPipeline = [
    {
      $skip: offset || 0,
    },
    {
      $limit: count || perPage,
    },
  ];

  const pipeline = [
    {
      $facet: {
        posts: [
          ...tagPipeline,
          {
            $sort: {
              pubDate: -1,
            },
          },
          ...offsetPipeline,
        ],
        total: [
          ...tagPipeline,
          {
            $count: 'count',
          },
        ],
      },
    },
  ];

  const results = await blogPosts.aggregate(pipeline);

  const { total, posts } = results[0];

  return { total: total[0].count, posts: posts };
};
