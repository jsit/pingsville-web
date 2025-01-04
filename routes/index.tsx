import { getPosts } from '../lib/posts.ts';
import PostsList from '../components/PostsList.tsx';
import Pagination from '../components/Pagination.tsx';

export default async function Home(req: Request) {
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get('page') || '1');
  const perPage = parseInt(Deno.env.get('POSTS_PER_PAGE') || '8');
  const { posts, total } = await getPosts({ offset: (page - 1) * perPage });

  return (
    <>
      <h1>
        All Posts
      </h1>

      <PostsList posts={posts} />

      <Pagination
        totalItems={total}
        currentPage={page || 0}
        perPage={perPage}
      />
    </>
  );
}
