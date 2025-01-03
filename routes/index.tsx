import { getPosts } from '../lib/posts.ts';
import PostsList from '../components/PostsList.tsx';
import Pagination from '../components/Pagination.tsx';

export default async function Home(req: Request) {
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get('page') || '1');
  const thePosts = await getPosts();

  return (
    <>
      <h1>
        Recent Posts
      </h1>

      <PostsList posts={thePosts} page={page} />

      <Pagination
        totalItems={thePosts.length}
        currentPage={page || 0}
      />
    </>
  );
}
