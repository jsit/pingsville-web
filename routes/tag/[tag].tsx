import { RouteContext } from '$fresh/server.ts';
import { getPosts } from '@lib/posts.ts';
import { getTagObject } from '@lib/tags.ts';
import PostsList from '@components/PostsList.tsx';
import Pagination from '@components/Pagination.tsx';

export default async function TagPage(req: Request, ctx: RouteContext) {
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get('page') || '1');
  const perPage = parseInt(Deno.env.get('POSTS_PER_PAGE') || '8');
  const { tag: tagName } = ctx.params;

  const { posts, total } = tagName
    ? await getPosts({ tagName, offset: (page - 1) * perPage, count: perPage })
    : {};

  const tag = tagName ? await getTagObject(tagName) : null;

  return (
    <>
      {posts && total
        ? (
          <>
            <h1>
              {total.toLocaleString()}{' '}
              posts tagged &lsquo;{tag?.displayName || tag?.name}&rsquo;
            </h1>

            <PostsList posts={posts} />

            <Pagination
              totalItems={total}
              currentPage={page || 0}
              perPage={perPage}
            />
          </>
        )
        : <h1>There are no posts tagged &lsquo;{tag}&rsquo;</h1>}
    </>
  );
}
