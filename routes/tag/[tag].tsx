import { RouteContext } from '$fresh/server.ts';
import { getPostsByTag } from '../../lib/posts.ts';
import { getTagObject } from '../../lib/tags.ts';
import PostsList from '../../components/PostsList.tsx';
import Pagination from '../../components/Pagination.tsx';

export default async function TagPage(req: Request, ctx: RouteContext) {
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get('page') || '1');
  const { tag } = ctx.params;
  const thePosts = tag ? await getPostsByTag(tag) : null;
  const theTag = tag ? await getTagObject(tag) : null;

  return (
    <>
      {thePosts
        ? (
          <>
            <h1>
              Posts tagged &lsquo;{theTag?.displayName || theTag?.name}&rsquo;
            </h1>

            <PostsList posts={thePosts} page={page} />

            <Pagination
              totalItems={thePosts.length}
              currentPage={page || 0}
            />
          </>
        )
        : <h1>There are no posts tagged {tag}</h1>}
    </>
  );
}
