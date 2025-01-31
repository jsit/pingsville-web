import { RouteContext } from '$fresh/server.ts';
import { getPosts, postsToPostsListProps } from '@lib/posts.ts';
import { getTagObject } from '@lib/tags.ts';
import PostsList, { PostsListProps } from '@components/PostsList.tsx';
import Pagination from '@components/Pagination.tsx';

export default async function TagPage(req: Request, ctx: RouteContext) {
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get('page') || '1');
  const perPage = parseInt(Deno.env.get('POSTS_PER_PAGE') || '8');
  const { tag: tagName } = ctx.params;

  const { posts, total } = tagName
    ? await getPosts({ tagName, offset: (page - 1) * perPage, count: perPage })
    : {};

  const tag = tagName ? await getTagObject({ tagName: tagName }) : null;

  const postsListPosts: PostsListProps[] = posts
    ? await postsToPostsListProps(posts)
    : [];

  return (
    <>
      {posts && total
        ? (
          <>
            <h1 class='page-title'>
              {total.toLocaleString()}{' '}
              posts tagged &lsquo;{tag?.displayName || tag?.name}&rsquo;
            </h1>

            <PostsList posts={postsListPosts} />

            <Pagination
              totalItems={total}
              currentPage={page || 0}
              perPage={perPage}
            />
          </>
        )
        : (
          <h1 class='page-title'>
            There are no posts tagged &lsquo;{tag}&rsquo;
          </h1>
        )}
    </>
  );
}
