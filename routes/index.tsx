import { PostsListProps } from '@components/PostsList.tsx';
import { getPosts, postsToPostsListProps } from '@lib/posts.ts';

import PostsList from '@components/PostsList.tsx';
import Pagination from '@components/Pagination.tsx';

export default async function Home(req: Request) {
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get('page') || '1');
  const perPage = parseInt(Deno.env.get('POSTS_PER_PAGE') || '8');
  const { posts, total } = await getPosts({
    offset: (page - 1) * perPage,
    count: perPage,
  });

  const postsListPosts: PostsListProps[] = posts
    ? await postsToPostsListProps(posts)
    : [];

  return (
    <>
      <h1 class='page-title'>
        All Posts ({total.toLocaleString()})
      </h1>

      <PostsList posts={postsListPosts} />

      <Pagination
        totalItems={total}
        currentPage={page || 0}
        perPage={perPage}
      />
    </>
  );
}
