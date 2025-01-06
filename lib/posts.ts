import { PostsListProps } from '@components/PostsList.tsx';
import { BlogPost } from '@customTypes/index.ts';
import { blogPosts } from '@lib/client.ts';
import { getTagObject } from '@lib/tags.ts';
import { getBlogById } from '@lib/blogs.ts';

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

  const tag = tagName && await getTagObject({ tagName: tagName });

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

export const postsToPostsListProps = async (
  posts: BlogPost[],
): Promise<PostsListProps[]> => {
  return await Promise.all(
    posts.map(async (post) => {
      const blogUrl = await getBlogById(post.blog.id).then((blog) => blog.url);

      const tagLinks = post.tags
        ? await Promise.all(
          post.tags?.map(async (blogPostTag) => {
            const tagObject = await getTagObject({ tagId: blogPostTag.id });

            return tagObject && {
              name: tagObject.name,
              displayName: tagObject.displayName,
            };
          }),
        )
        : [];

      return {
        ...post,
        blogUrl: blogUrl,
        tagLinks: tagLinks,
      };
    }),
  );
};
